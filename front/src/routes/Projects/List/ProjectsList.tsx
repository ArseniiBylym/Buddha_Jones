import { ProjectsListCard } from '.';
import { HeaderActions, ProjectPermissionsActions, ProjectsActions } from 'actions';
import { history } from 'App';
import * as classNames from 'classnames';
import { ClientsFilter } from 'components/Buddha';
import { ButtonAdd } from 'components/Button';
import { InputSearch } from 'components/Form';
import { LoadingIndicator, LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Pagination } from 'components/Pagination';
import { Col, Row, Section } from 'components/Section';
import {
    action,
    computed,
    observable,
    reaction
    } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { UserPermissionKey } from 'types/projectPermissions';

// Styles
const s = require('./ProjectsList.css');

// Props
interface ProjectsListProps {}

// Component
@inject('store')
@observer
class ProjectsList extends React.Component<ProjectsListProps & AppState, {}> {
    @observable private currentPage: number = 1;

    private isComponentMounted: boolean = false;

    @computed
    private get userCanViewCampaignDescription(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.CampaignDescription]) {
                return loggedInUserPermissions[UserPermissionKey.CampaignDescription].canView ? true : false;
            }
        }

        return false;
    }

    public componentDidMount() {
        this.isComponentMounted = true;

        HeaderActions.setMainHeaderTitlesAndElements('Projects board');
        if (this.props.store && this.props.store.user.data) {
            ProjectPermissionsActions.fetchLoggedInUserPermissions();
        }

        if (this.props.match && this.props.match.params['pageId']) {
            let currentPage: number = parseInt(this.props.match.params['pageId'], 0);
            this.setInitialPaginator(currentPage);
        } else {
            ProjectsActions.fetchProjects(1);
        }

        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            this.setMainHeaderElements(
                typeof loggedInUserPermissions[UserPermissionKey.ProjectCreate] !== 'undefined' &&
                    loggedInUserPermissions[UserPermissionKey.ProjectCreate].canView &&
                    loggedInUserPermissions[UserPermissionKey.ProjectCreate].canEdit
                    ? true
                    : false
            );
        }
    }

    public componentWillReceiveProps(nextProps: ProjectsListProps & AppState) {
        // Refresh projects listing when page changes
        if (
            !this.props.store &&
            typeof this.props.match !== 'undefined' &&
            this.props.match &&
            !nextProps.store &&
            typeof nextProps.match !== 'undefined' &&
            nextProps.match
        ) {
            if (
                typeof this.props.match.params['pageId'] !== 'undefined' &&
                typeof nextProps.match.params['pageId'] !== 'undefined'
            ) {
                if (this.props.match.params['pageId'] !== nextProps.match.params['pageId']) {
                    const nextPageId: number = parseInt(nextProps.match.params['pageId'], 10);
                    if (!isNaN(nextPageId)) {
                        ProjectsActions.fetchProjects(nextPageId);
                    }
                }
            }
        }
    }

    public componentWillUnmount() {
        this.isComponentMounted = false;
    }

    public constructor(props: ProjectsListProps & AppState) {
        super(props);

        reaction(
            () => this.props.store!.projectPermissions.loadingCount,
            loadingCount => {
                if (loadingCount <= 0 && this.isComponentMounted) {
                    const { loggedInUserPermissions } = this.props.store!!.projectPermissions;

                    this.setMainHeaderElements(
                        typeof loggedInUserPermissions[UserPermissionKey.ProjectCreate] !== 'undefined' &&
                            loggedInUserPermissions[UserPermissionKey.ProjectCreate].canView &&
                            loggedInUserPermissions[UserPermissionKey.ProjectCreate].canEdit
                            ? true
                            : false
                    );
                }
            }
        );

        reaction(
            () => this.props.store!.projectPermissions.loggedInUserPermissions,
            loggedInUserPermissions => {
                if (this.isComponentMounted) {
                    this.setMainHeaderElements(
                        typeof loggedInUserPermissions[UserPermissionKey.ProjectCreate] !== 'undefined' &&
                            loggedInUserPermissions[UserPermissionKey.ProjectCreate].canView &&
                            loggedInUserPermissions[UserPermissionKey.ProjectCreate].canEdit
                            ? true
                            : false
                    );
                }
            }
        );
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { projects, projectPermissions } = this.props.store;

        return (
            <div>
                <Section
                    title="All projects"
                    noSeparator={true}
                    headerElements={[
                        ...(projects.updatingProjects
                            ? [
                                  {
                                      key: 'updating-indicator',
                                      element: <LoadingIndicator label="Refreshing" />,
                                  },
                              ]
                            : []),
                        ...[
                            {
                                key: 'clients-filter',
                                element: (
                                    <ClientsFilter
                                        onChange={this.handleStudioFilterChange}
                                        truncuateLabelTo={64}
                                        clientId={projects.filterByStudio !== null ? projects.filterByStudio.id : null}
                                        clientName={
                                            projects.filterByStudio !== null ? projects.filterByStudio.name : null
                                        }
                                        source={'studios'}
                                    />
                                ),
                            },
                            {
                                key: 'search-input',
                                element: (
                                    <InputSearch
                                        onChange={this.handleProjectNameSearchChange}
                                        minWidth={500}
                                        label="Search project by name, producer, studio, creative exec..."
                                        value={projects.filterByQuery}
                                    />
                                ),
                            },
                        ],
                    ]}
                >
                    {projectPermissions.loadingCount <= 0 && (
                        <Pagination
                            className={s.paginationTop}
                            currentPage={this.currentPage}
                            countPerPage={projects.countPerPage}
                            countTotal={projects.countTotal}
                            onPageChange={this.handleProjectsPageChange}
                        />
                    )}

                    {projectPermissions.loadingCount <= 0 && (
                        <div className={s.board}>
                            <Row justifyContent={projects.projectsList.length === 1 ? 'center' : undefined}>
                                <Col
                                    className={classNames(s.projectsList, {
                                        [s.projectsListGrid]: projects.projectsList.length > 1,
                                    })}
                                >
                                    {(projects.projectsList.length > 0 &&
                                        projects.projectsList.map(project => (
                                            <ProjectsListCard
                                                key={project.id}
                                                project={project}
                                                onProjectClick={this.handleProjectClick}
                                                userCanViewCampaignDescription={this.userCanViewCampaignDescription}
                                            />
                                        ))) || <p>No projects</p>}
                                </Col>
                            </Row>
                        </div>
                    )}

                    {projectPermissions.loadingCount <= 0 && (
                        <Pagination
                            className={s.pagination}
                            currentPage={this.currentPage}
                            countPerPage={projects.countPerPage}
                            countTotal={projects.countTotal}
                            onPageChange={this.handleProjectsPageChange}
                        />
                    )}

                    {(projects.loadingProjects || projects.updatingProjects || projectPermissions.loadingCount > 0) && (
                        <LoadingShade
                            background="rgba(247, 247, 247, 0.9)"
                            contentCentered={true}
                            contentCenteredToTop={true}
                        >
                            <LoadingSpinner size={64} />
                        </LoadingShade>
                    )}
                </Section>
            </div>
        );
    }

    private handleCreateNewProject = () => {
        history.push('/portal/project/new');
    };

    private handleProjectNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        ProjectsActions.changeProjectsFilterBySearchQuery(e.target.value);
    };

    private handleStudioFilterChange = (studio: { id: number; name: string } | null) => {
        ProjectsActions.changeProjectsFilterByStudio(studio);
    };

    private handleProjectClick = (
        studioId: number,
        studioName: string,
        projectId: number,
        projectName: string,
        projectCampaignId?: number
    ) => {
        history.push(
            ProjectsActions.constructProjectUrl(
                studioId,
                studioName,
                projectId,
                projectName,
                typeof this.props.match !== 'undefined' ? this.props.match.params['pageId'] : '1',
                typeof projectCampaignId !== 'undefined' ? projectCampaignId : undefined
            )
        );
    };

    private setMainHeaderElements = (userCanCreateNewProjects: boolean = false) => {
        HeaderActions.setMainHeaderElements(
            userCanCreateNewProjects
                ? [
                      <ButtonAdd
                          key="create"
                          label="Define new project"
                          onClick={this.handleCreateNewProject}
                          isWhite={true}
                      />,
                  ]
                : []
        );
    };

    @action
    private handleProjectsPageChange = (newPage: number) => {
        if (!this.props.store) {
            return;
        }
        this.currentPage = newPage;
        this.props.store.projects.currentPage = newPage;
        history.push('/portal/projects/' + newPage);
    };

    @action
    private setInitialPaginator = (currentPage: number) => {
        if (!this.props.store) {
            return;
        }
        this.currentPage = currentPage;
        this.props.store.projects.currentPage = currentPage;
        ProjectsActions.fetchProjects(currentPage);
    };
}

export default ProjectsList;
