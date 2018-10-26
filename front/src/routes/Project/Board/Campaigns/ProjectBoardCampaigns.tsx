import * as React from 'react';
import throttle from 'lodash-es/throttle';
import { action, computed, observable, reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Section, Row, Col } from 'components/Section';
import { LoadingIndicator } from 'components/Loaders';
import { ProjectBoardCampaign } from '..';
import { ProjectDetails } from 'types/projectDetails';
import { ProjectBoardNewCampaign } from './ProjectBoardNewCampaign';
import { Paragraph } from 'components/Content';
import { AppOnlyStoreState } from 'store/AllStores';
import { UserPermissionKey } from 'types/projectPermissions';
import { UsersActions } from 'actions';
import { CampaignDetails } from '../../../../types/projectDetails';
import { ProjectsVersionsActions } from '../../../../actions';
import { ProjectVersionStatus } from '../../../../types/projectVersions';
import { ProjectsDetailsStore } from '../../../../store/AllStores';

// Styles
const s = require('./ProjectBoardCampaigns.css');

// Props
interface ProjectBoardCampaignsProps extends AppOnlyStoreState {
    project: ProjectDetails;
    projectIsUpdating: boolean;
    projectMatchId: number | null;
}

// Types
type ProjectBoardCampaignsPropsTypes = ProjectBoardCampaignsProps & AppOnlyStoreState;

interface Cancelable {
    cancel(): void;
    flush(): void;
}

interface CampaignContainers {
    container: HTMLDivElement | null;
    headerContainer: HTMLDivElement | null;
}

// Component
@inject('store')
@observer
export class ProjectBoardCampaigns extends React.Component<ProjectBoardCampaignsPropsTypes, {}> {
    @observable private fetchedUsers: boolean = false;
    @observable private campaignsWithFixedHeader: number[] = [];
    /*@observable private clientSelected: { id: number | null; name: string; } = {id: null, name: ''};*/

    @computed
    private get projectsCampaignsFlatIds(): number[] {
        return this.props.project.campaigns.map(campaign => campaign.projectCampaignId);
    }

    @computed
    private get userCanCreateNewCampaigns(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectCampaigns]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectCampaigns].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get selectedVersionStatus(): ProjectVersionStatus | null {
        if (this.props.store
            && this.props.store.projectsVersions
            && this.props.store.projectsVersions.filterVersionStatus
            && this.props.store.projectsVersions.filterVersionStatus.id
        ) {
            return this.props.store.projectsVersions.filterVersionStatus;
        }
        return null;
    }

    @computed
    private get areCampaignsContainVisibleElements(): boolean {
        for (let i = 0; i < this.props.project.campaigns.length; i++) {
            if (!this.props.project.campaigns[i].hidden) {
                return true;
            }
        }
        return false;
    }

    private campaignsContainers: {
        [campaignId: number]: CampaignContainers;
    } = {};

    private throttledWindowScroll: (() => void) & Cancelable;
    private throttledWindowResize: (() => void) & Cancelable;

    public constructor(props: ProjectBoardCampaignsPropsTypes) {
        super(props);

        this.throttledWindowScroll = throttle(this.handleWindowScroll, 128);
        this.throttledWindowResize = throttle(this.handleWindowResize, 512);

        reaction(
            () => this.props.project.campaigns,
            campaigns => {
                if (this.fetchedUsers === false) {
                    this.fetchUsersFromCampaignTeams();
                }
            }
        );
    }

    public componentDidMount() {
        window.addEventListener('scroll', this.throttledWindowScroll, false);
        window.addEventListener('resize', this.throttledWindowResize, false);
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.throttledWindowScroll);
        window.removeEventListener('resize', this.throttledWindowResize);
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { project, projectIsUpdating } = this.props;

        return (
            <Section
                title="Campaigns"
                headerElements={[
                    ...(projectIsUpdating
                        ? [
                              {
                                  key: 'refresh-indicator',
                                  element: <LoadingIndicator label="Refreshing" />,
                              },
                          ]
                        : []),
                ]}
            >
                <Row className={s.campaigns}>
                    <Col size={12}>

                        {this.renderCampaignsList()}

                        {!this.areCampaignsContainVisibleElements && this.selectedVersionStatus && (
                            <Paragraph type="dim" align={'center'}>
                                There are no projects for selected filter: {this.selectedVersionStatus.name}
                                <br/>
                                <a href="#" onClick={this.handleDropVersionStatusFilter}>Try to drop filter</a>
                            </Paragraph>
                        )}

                        {project.campaigns.length <= 0 && (
                            <Paragraph type="dim">No campaigns added to the project</Paragraph>
                        )}

                        <ProjectBoardNewCampaign
                            userCanCreateCampaigns={this.userCanCreateNewCampaigns}
                            projectId={this.props.project.projectId}
                            projectsCampaignsFlatIds={this.projectsCampaignsFlatIds}
                        />
                    </Col>
                </Row>
            </Section>
        );
    }

    private referenceCampaignContainer = (campaignId: number) => (ref: HTMLDivElement) => {
        this.campaignsContainers = {
            ...this.campaignsContainers,
            [campaignId]:
                typeof this.campaignsContainers[campaignId] !== 'undefined'
                    ? {
                          ...this.campaignsContainers[campaignId],
                          container: ref,
                      }
                    : {
                          container: ref,
                          headerContainer: null,
                      },
        };

        this.checkWhichCampaignHeadersShouldBeFixed();
    };

    private referenceCampaignHeader = (campaignId: number) => (ref: HTMLDivElement) => {
        this.campaignsContainers = {
            ...this.campaignsContainers,
            [campaignId]:
                typeof this.campaignsContainers[campaignId] !== 'undefined'
                    ? {
                          ...this.campaignsContainers[campaignId],
                          headerContainer: ref,
                      }
                    : {
                          headerContainer: ref,
                          container: null,
                      },
        };

        this.checkWhichCampaignHeadersShouldBeFixed();
    };

    private handleWindowScroll = () => {
        this.checkWhichCampaignHeadersShouldBeFixed();
    };

    private handleWindowResize = () => {
        this.checkWhichCampaignHeadersShouldBeFixed();
    };

    private checkWhichCampaignHeadersShouldBeFixed = () => {
        /*Object.keys(this.campaignsContainers).map(campaignId => {
            const campaignIdNumber = parseInt(campaignId, 10);
            const campaignContainers: CampaignContainers = this.campaignsContainers[campaignId];
            const container = campaignContainers.container;
            const headerContainer = campaignContainers.headerContainer;

            if (container === null || headerContainer === null) {
                setTimeout(() => {
                    this.checkWhichCampaignHeadersShouldBeFixed();
                }, 1024);
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const headerRect = headerContainer.getBoundingClientRect();
            const campaignIndex = this.campaignsWithFixedHeader.indexOf(campaignIdNumber);

            if (containerRect.top < 0 && containerRect.top + containerRect.height - headerRect.height > 0) {
                if (campaignIndex === -1) {
                    this.campaignsWithFixedHeader = [...this.campaignsWithFixedHeader, campaignIdNumber];
                }
            } else {
                if (campaignIndex !== -1) {
                    this.campaignsWithFixedHeader = [
                        ...this.campaignsWithFixedHeader.slice(0, campaignIndex),
                        ...this.campaignsWithFixedHeader.slice(campaignIndex + 1),
                    ];
                }
            }
        });*/
    };

    private fetchUsersFromCampaignTeams = async () => {
        try {
            if (this.props.project && this.props.project.campaigns) {
                const usersFromCampaignsIds = this.props.project.campaigns.reduce((ids: number[], campaign) => {
                    campaign.creativeTeam.forEach(user => {
                        ids.push(user.userId);
                    });
                    campaign.billingTeam.forEach(user => {
                        ids.push(user.userId);
                    });
                    campaign.editorialTeam.forEach(user => {
                        ids.push(user.userId);
                    });
                    campaign.designTeam.forEach(user => {
                        ids.push(user.userId);
                    });

                    return ids;
                }, []);

                if (usersFromCampaignsIds && usersFromCampaignsIds.length > 0) {
                    await UsersActions.fetchUsersByIds(usersFromCampaignsIds);
                    this.fetchedUsers = true;
                }
            }
        } catch (error) {
            throw error;
        }
    };

    private renderCampaignsList = (): JSX.Element[] => {
        let campaignsList: CampaignDetails[] = this.props.project.campaigns;
        return campaignsList
            .filter((campaign: CampaignDetails) => {
                return !campaign.hidden;
            })
            .map((campaign: CampaignDetails, ind: number) => {
                return (
                    <ProjectBoardCampaign
                        key={'campaign-' + campaign.projectCampaignId}
                        innerRef={this.referenceCampaignContainer(campaign.projectCampaignId)}
                        innerHeaderRef={this.referenceCampaignHeader(campaign.projectCampaignId)}
                        clientId={campaign.clientSelected.id as number}
                        onClientChange={this.handleCustomerSelectorChange.bind(this, ind)}
                        projectId={this.props.project.projectId}
                        campaign={campaign}
                        isHeaderFixed={this.campaignsWithFixedHeader.indexOf(campaign.projectCampaignId) !== -1}
                    />
                );
            }
        );
    };

    private handleDropVersionStatusFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        ProjectsVersionsActions.changeFilterVersionStatus({id: null, name: 'No status'});
    };

    @action
    private handleCustomerSelectorChange = (ind: number, option: { id: number; name: string } | null) => {
        if (this.props.projectMatchId !== null && this.props.projectMatchId !== -1 && option !== null) {
            ProjectsDetailsStore.fetchedProjects[this.props.projectMatchId].campaigns[ind].clientSelected = option;
        }
    };
}
