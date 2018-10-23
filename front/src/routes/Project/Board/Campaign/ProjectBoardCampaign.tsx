import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { observable, computed, reaction } from 'mobx';
import AnimateHeight from 'react-animate-height';
import { CampaignDetails } from 'types/projectDetails';
import { ProjectBoardCampaignHeader } from '.';
import { ProjectBoardCampaignPeople } from './People/ProjectBoardCampaignPeople';
import { ProjectBoardCampaignWritingAndMusicTeams } from './WritingAndMusicTeams';
import { ProjectBoardCampaignsSpots } from './Spots';
import { ProjectBoardCampaignDescription } from './Description';
import { ProjectBoardCampaignMisc } from './Misc';
import { ProjectBoardCampaignExecutive } from './Executive';
import { AppOnlyStoreState } from 'store/AllStores';
import { UserPermission, UserPermissionKey } from 'types/projectPermissions';
import { ProjectsVersionsStore } from '../../../../store/AllStores';
const zenscroll = require('zenscroll');

// Styles
const s = require('./ProjectBoardCampaign.css');

// Props
interface ProjectBoardCampaignProps {
    innerRef?: (ref: HTMLDivElement) => void;
    innerHeaderRef?: (ref: HTMLDivElement) => void;
    onClientChange?: ((option: { id: number; name: string } | null) => void) | null;
    clientId: number;
    projectId: number;
    campaign: CampaignDetails;
    isHeaderFixed: boolean;
}

// Types
type ProjectBoardCampaignPropsTypes = ProjectBoardCampaignProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProjectBoardCampaign extends React.Component<ProjectBoardCampaignPropsTypes, {}> {
    @observable private campaignIsExpanded: boolean = false;
    @observable private spotsAreExpanded: boolean = false;
    @observable private containerWidth: number = 0;

    @computed
    private get userPermissions(): { [key: string]: UserPermission } {
        if (this.props.store) {
            return this.props.store.projectPermissions.loggedInUserPermissions;
        }

        return {};
    }

    @computed
    private get userCanViewCampaignDescription(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignDescription]) {
            return this.userPermissions[UserPermissionKey.CampaignDescription].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditCampaignDescription(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignDescription]) {
            return this.userPermissions[UserPermissionKey.CampaignDescription].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewCampaignBudget(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignBudget]) {
            return this.userPermissions[UserPermissionKey.CampaignBudget].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditCampaignBudget(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignBudget]) {
            return this.userPermissions[UserPermissionKey.CampaignBudget].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewDateMaterialsWillBeReceived(): boolean {
        if (this.userPermissions[UserPermissionKey.DateMaterialReceived]) {
            return this.userPermissions[UserPermissionKey.DateMaterialReceived].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditDateMaterialsWillBeReceived(): boolean {
        if (this.userPermissions[UserPermissionKey.DateMaterialReceived]) {
            return this.userPermissions[UserPermissionKey.DateMaterialReceived].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewCreativeExecutive(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignClientExecutive]) {
            return this.userPermissions[UserPermissionKey.CampaignClientExecutive].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditCreativeExecutive(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignClientExecutive]) {
            return this.userPermissions[UserPermissionKey.CampaignClientExecutive].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewPORContact(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPOR]) {
            return this.userPermissions[UserPermissionKey.CampaignPOR].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewInvoiceContact(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignInvoiceContact]) {
            return this.userPermissions[UserPermissionKey.CampaignInvoiceContact].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewCreativeTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleCreative]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleCreative].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditCreativeTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleCreative]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleCreative].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewBillingTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleBilling]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleBilling].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditBillingTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleBilling]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleBilling].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewEditorialTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleEditorial]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleEditorial].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditEditorialTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleEditorial]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleEditorial].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewGraphicsTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleDesign]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleDesign].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditGraphicsTeam(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignPeopleDesign]) {
            return this.userPermissions[UserPermissionKey.CampaignPeopleDesign].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewWriting(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignWritingTeam]) {
            return this.userPermissions[UserPermissionKey.CampaignWritingTeam].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditWriting(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignWritingTeam]) {
            return this.userPermissions[UserPermissionKey.CampaignWritingTeam].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewMusic(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignMusicTeam]) {
            return this.userPermissions[UserPermissionKey.CampaignMusicTeam].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanEditMusic(): boolean {
        if (this.userPermissions[UserPermissionKey.CampaignMusicTeam]) {
            return this.userPermissions[UserPermissionKey.CampaignMusicTeam].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get userCanViewSpots(): boolean {
        if (this.userPermissions[UserPermissionKey.Spot]) {
            return this.userPermissions[UserPermissionKey.Spot].canView ? true : false;
        }

        return false;
    }

    @computed
    private get userCanCreateSpots(): boolean {
        if (this.userPermissions[UserPermissionKey.Spot]) {
            return this.userPermissions[UserPermissionKey.Spot].canEdit ? true : false;
        }

        return false;
    }

    @computed
    private get isVersionStatusFilterApplied(): boolean {
        if (ProjectsVersionsStore &&
            ProjectsVersionsStore.filterVersionStatus &&
            ProjectsVersionsStore.filterVersionStatus.id
        ) {
            return true;
        }
        return false;
    }

    private campaignContainer: HTMLDivElement | null = null;
    private spotsContainer: HTMLDivElement | null = null;

    public constructor(props: ProjectBoardCampaignPropsTypes) {
        super(props);

        reaction(
            () => ProjectsVersionsStore.filterVersionStatus.id,
            clientFilter => {
                this.campaignIsExpanded = true;
                this.spotsAreExpanded = true;
            }
        );
    }

    public componentWillUpdate(nextProps: ProjectBoardCampaignProps) {
        if (this.props.isHeaderFixed !== nextProps.isHeaderFixed) {
            if (this.campaignContainer) {
                this.containerWidth = this.campaignContainer.offsetWidth;
            }
        }
    }

    public componentDidMount() {
        if (window && window.location && window.location.href) {
            const { href } = window.location;
            if (href.indexOf('projectCampaignId=' + this.props.campaign.projectCampaignId) !== -1) {
                this.campaignIsExpanded = true;
                setTimeout(() => {
                    if (this.campaignContainer) {
                        zenscroll.to(this.campaignContainer);
                    }
                }, 256);
            }
        }
    }

    public render() {
        return (
            <div
                ref={this.referenceCampaignContainer}
                className={classNames(s.campaign, {
                    [s.campaignWithFixedHeader]: this.campaignIsExpanded && this.props.isHeaderFixed,
                })}
            >
                <ProjectBoardCampaignHeader
                    innerRef={this.referenceCampaignHeaderContainer}
                    projectId={this.props.projectId}
                    onClientChange={this.props.onClientChange}
                    campaign={this.props.campaign}
                    isExpanded={this.campaignIsExpanded}
                    isFixed={this.props.isHeaderFixed}
                    fixedWidth={this.containerWidth}
                    userCanViewNotes={this.userCanViewCampaignDescription}
                    onExpansionToggle={this.handleCampaignExpansionToggle}
                />

                <AnimateHeight height={(this.campaignIsExpanded) ? 'auto' : 0} duration={500}>
                    {!this.isVersionStatusFilterApplied &&
                        <>
                            <ProjectBoardCampaignDescription
                                userCanView={this.userCanViewCampaignDescription}
                                userCanEdit={this.userCanEditCampaignDescription}
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                                notes={this.props.campaign.notes || ''}
                            />

                            <ProjectBoardCampaignMisc
                                userCanViewBudget={this.userCanViewCampaignBudget}
                                userCanEditBudget={this.userCanEditCampaignBudget}
                                userCanViewMaterialsDate={this.userCanViewDateMaterialsWillBeReceived}
                                userCanEditMaterialsDate={this.userCanEditDateMaterialsWillBeReceived}
                                projectId={this.props.projectId}
                                campaign={this.props.campaign}
                            />

                            <ProjectBoardCampaignExecutive
                                userCanViewExecutive={this.userCanViewCreativeExecutive}
                                userCanEditExecutive={this.userCanEditCreativeExecutive}
                                userCanViewPORContact={this.userCanViewPORContact}
                                userCanViewInvoiceContact={this.userCanViewInvoiceContact}
                                clientId={this.props.clientId}
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                                executiveId={this.props.campaign.firstPointOfContactId}
                            />

                            <ProjectBoardCampaignPeople
                                userCanView={this.userCanViewCreativeTeam}
                                userCanEdit={this.userCanEditCreativeTeam}
                                type="creative"
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                                selectedUsers={this.props.campaign.creativeTeam.map(user => ({
                                    userId: user.userId,
                                    fullName: user.fullName,
                                    image: user.image,
                                    creativeRole: {
                                        role: user.role,
                                        roleId: user.roleId,
                                    },
                                }))}
                            />

                            <ProjectBoardCampaignPeople
                                userCanView={this.userCanViewBillingTeam}
                                userCanEdit={this.userCanEditBillingTeam}
                                type="billing"
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                                selectedUsers={this.props.campaign.billingTeam}
                            />

                            <ProjectBoardCampaignPeople
                                userCanView={this.userCanViewEditorialTeam}
                                userCanEdit={this.userCanEditEditorialTeam}
                                type="editorial"
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                                selectedUsers={this.props.campaign.editorialTeam}
                            />

                            <ProjectBoardCampaignPeople
                                userCanView={this.userCanViewGraphicsTeam}
                                userCanEdit={this.userCanEditGraphicsTeam}
                                type="design"
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                                selectedUsers={this.props.campaign.designTeam}
                            />

                            <ProjectBoardCampaignWritingAndMusicTeams
                                userCanViewWriting={this.userCanViewWriting}
                                userCanEditWriting={this.userCanEditWriting}
                                userCanViewMusic={this.userCanViewMusic}
                                userCanEditMusic={this.userCanEditMusic}
                                projectId={this.props.projectId}
                                projectCampaignId={this.props.campaign.projectCampaignId}
                                campaignId={this.props.campaign.campaignId}
                            />
                        </>
                    }

                    <ProjectBoardCampaignsSpots
                        userCanViewSpots={this.userCanViewSpots}
                        userCanCreateNewSpot={this.userCanCreateSpots}
                        innerRef={this.referenceSpotsContainer}
                        onExpansionToggle={this.handleSpotsExpansionToggle}
                        spotsAreExpanded={this.spotsAreExpanded}
                        projectId={this.props.projectId}
                        projectCampaignId={this.props.campaign.projectCampaignId}
                        campaignId={this.props.campaign.campaignId}
                        spots={this.props.campaign.spots}
                    />
                </AnimateHeight>
            </div>
        );
    }

    private referenceCampaignContainer = (ref: HTMLDivElement) => {
        this.campaignContainer = ref;

        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private referenceCampaignHeaderContainer = (ref: HTMLDivElement) => {
        if (this.props.innerHeaderRef) {
            this.props.innerHeaderRef(ref);
        }
    };

    private referenceSpotsContainer = (ref: HTMLDivElement) => (this.spotsContainer = ref);

    private handleCampaignExpansionToggle = () => {
        if (this.campaignIsExpanded) {
            this.campaignIsExpanded = false;

            if (this.campaignContainer) {
                zenscroll.to(this.campaignContainer);
            }
        } else {
            this.campaignIsExpanded = true;
        }
    };

    private handleSpotsExpansionToggle = () => {
        if (this.spotsAreExpanded) {
            this.spotsAreExpanded = false;

            if (this.spotsContainer) {
                zenscroll.to(this.spotsContainer);
            }
        } else {
            this.spotsAreExpanded = true;
        }
    };
}
