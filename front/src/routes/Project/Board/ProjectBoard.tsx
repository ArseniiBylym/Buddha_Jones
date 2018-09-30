import * as React from 'react';
import { observable, reaction, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { unformat } from 'accounting';
import { Row, Col } from 'components/Section';
import { LoadingSpinner } from 'components/Loaders';
import { AppState } from 'store/AllStores';
import { ProjectsDetailsActions, HeaderActions, ProjectsVersionsActions, ProjectPermissionsActions } from 'actions';
import { ButtonBack, ButtonSend } from 'components/Button';
import { ProjectDetails } from 'types/projectDetails';
import { Paragraph } from 'components/Content';
import { ProjectBoardContent } from '.';

// Styles
const s = require('./ProjectBoard.css');

// Props
interface ProjectBoardProps extends AppState {}

// Component
@inject('store')
@observer
class ProjectBoard extends React.Component<ProjectBoardProps, {}> {
    @observable private fromProjectListPageNumber: number = 1;
    @observable private projectId: number | null = null;

    @computed
    private get project(): ProjectDetails | null {
        if (!this.props.store || this.projectId === null) {
            return null;
        }

        const projectMatchId = this.props.store.projectsDetails.fetchedProjectsIdsFlat.indexOf(this.projectId);
        return projectMatchId !== -1 ? this.props.store.projectsDetails.fetchedProjects[projectMatchId] : null;
    }

    @computed
    private get projectIsLoading(): boolean {
        if (!this.props.store || this.projectId === null) {
            return true;
        }

        if (this.props.store.projectPermissions.loadingCount > 0) {
            return true;
        }

        const { fetchedProjectsIdsFlat, fetchedProjects } = this.props.store.projectsDetails;

        const projectMatchId = fetchedProjectsIdsFlat.indexOf(this.projectId);
        return projectMatchId !== -1
            ? fetchedProjects[projectMatchId].campaigns.length > 0
                ? false
                : fetchedProjects[projectMatchId].loading
                    ? true
                    : false
            : true;
    }

    @computed
    private get projectIsUpdating(): boolean {
        if (!this.props.store || this.projectId === null) {
            return true;
        }

        if (this.props.store.projectPermissions.loadingCount > 0) {
            return true;
        }

        const { fetchedProjectsIdsFlat, fetchedProjects } = this.props.store.projectsDetails;

        const projectMatchId = fetchedProjectsIdsFlat.indexOf(this.projectId);
        return projectMatchId !== -1 && fetchedProjects[projectMatchId].loading ? true : false;
    }

    @computed
    private get projectDoesNotExist(): boolean {
        if (!this.props.store || this.projectId === null) {
            return false;
        }

        if (this.projectIsLoading || this.projectIsUpdating) {
            return false;
        }

        const { fetchedProjectsIdsFlat, fetchedProjects } = this.props.store.projectsDetails;

        const projectMatchId = fetchedProjectsIdsFlat.indexOf(this.projectId);
        return projectMatchId !== -1 && fetchedProjects[projectMatchId].projectDoesNotExist ? true : false;
    }

    @computed
    private get projectCouldNotBeFetched(): boolean {
        if (!this.props.store || this.projectId === null) {
            return false;
        }

        if (this.projectIsLoading || this.projectIsUpdating) {
            return false;
        }

        const { fetchedProjectsIdsFlat, fetchedProjects } = this.props.store.projectsDetails;

        const projectMatchId = fetchedProjectsIdsFlat.indexOf(this.projectId);
        return projectMatchId !== -1 && fetchedProjects[projectMatchId].projectCouldNotBeFetched ? true : false;
    }

    constructor(props: ProjectBoardProps) {
        super(props);

        // React to project ID number change
        reaction(
            () => this.projectId,
            projectId => {
                if (projectId !== null) {
                    this.fetchProject(projectId);
                }
            }
        );

        // React to project loaded change
        reaction(
            () => this.project,
            project => {
                if (project !== null) {
                    // Change project ID
                    this.projectId = project.projectId;

                    // Change header's right side elements
                    this.changeHeaderElements(true, true);
                }
            }
        );
    }

    public componentDidMount() {
        if (!this.props.match || !this.props.store || !this.props.store.user.data) {
            return;
        }

        // Initialize header
        HeaderActions.setMainHeaderTitlesAndElements('Project');

        // Add back to projects listing button to the header
        this.changeHeaderElements(false, true);

        // Fetch projects permissions
        ProjectPermissionsActions.fetchLoggedInUserPermissions();

        // Fetch all versions so that they can be used in the spot section
        ProjectsVersionsActions.fetchAllStandardVersions();
        ProjectsVersionsActions.fetchAllCustomVersions();
        ProjectsVersionsActions.fetchAllVersionStatuses();

        // Fetch project if the URL contains project ID
        if (typeof this.props.match.params['projectId'] !== 'undefined') {
            this.changeProject(this.props);
        }
    }

    public componentWillReceiveProps(nextProps: ProjectBoardProps) {
        if (!this.props.match || !nextProps.match) {
            return;
        }

        // Update project when URL of the project has changed
        if (
            (typeof this.props.match.params['projectId'] === 'undefined' &&
                typeof nextProps.match.params['projectId']) ||
            (typeof this.props.match.params['projectId'] !== 'undefined' &&
                typeof nextProps.match.params['projectId'] !== 'undefined' &&
                this.props.match.params['projectId'] !== nextProps.match.params['projectId'])
        ) {
            this.changeProject(nextProps);
        }
    }

    public render() {
        return this.projectIsLoading ? (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner className={s.projectLoading} size={64} />
                </Col>
            </Row>
        ) : this.projectDoesNotExist ? (
            <Row justifyContent="center">
                <Col>
                    <Paragraph className={s.errorNote} type="alert">
                        Project #{this.projectId} does not exist
                    </Paragraph>
                    <Paragraph align="center">
                        If you believe that is a mistake please report the URL of the page to the administrator:
                    </Paragraph>
                    <Paragraph align="center">{window.location.href}</Paragraph>
                </Col>
            </Row>
        ) : this.projectCouldNotBeFetched ? (
            <Row justifyContent="center">
                <Col>
                    <Paragraph className={s.errorNote} type="alert">
                        Project #{this.projectId} could not be loaded
                    </Paragraph>
                    <ButtonSend className={s.retryButton} onClick={this.handleProjectFetchRetry} label="Try again" />
                </Col>
            </Row>
        ) : this.project !== null ? (
            <ProjectBoardContent
                onHeaderElementsChange={this.changeHeaderElements}
                project={this.project}
                projectIsUpdating={this.projectIsUpdating}
            />
        ) : null;
    }

    private fetchProject = (projectId?: number) => {
        if (typeof projectId !== 'undefined' || this.projectId !== null) {
            projectId = typeof projectId !== 'undefined' ? projectId : this.projectId !== null ? this.projectId : 0;
            ProjectsDetailsActions.fetchProjectDetails(projectId).then(() => {
                this.changeHeaderElements(true);
            });
        }
    };

    private changeProject = (props: ProjectBoardProps) => {
        if (!props.match) {
            return;
        }

        if (
            typeof props.match !== 'undefined' &&
            typeof props.match.params !== 'undefined' &&
            typeof props.match.params['clientId'] !== 'undefined' &&
            typeof props.match.params['clientName'] !== 'undefined' &&
            typeof props.match.params['projectId'] !== 'undefined' &&
            typeof props.match.params['projectName'] !== 'undefined'
        ) {
            const projectId: number = unformat(props.match.params['projectId']);
            const clientId: number = unformat(props.match.params['clientId']);
            const projectName: string = props.match.params['projectName'];
            const clientName: string = props.match.params['clientName'];

            this.projectId = projectId;

            if (!isNaN(projectId) && !isNaN(clientId)) {
                // Update header
                HeaderActions.setMainHeaderTitles(
                    projectName !== null && projectName.trim() !== ''
                        ? projectName.trim()
                        : 'Project #' + this.projectId,
                    clientName !== null && clientName ? clientName : clientId !== null ? 'Client #' + clientId : ''
                );
            }

            if (typeof props.match.params['fromPage'] !== 'undefined') {
                const fromPage: number = parseInt(props.match.params['fromPage'], 10);

                if (!isNaN(fromPage)) {
                    this.fromProjectListPageNumber = fromPage;
                }
            } else {
                this.fromProjectListPageNumber = 1;
            }
        }
    };

    private changeHeaderElements = (reloadTitles: boolean = false, reloadRightSideElements: boolean = false) => {
        if (reloadRightSideElements) {
            HeaderActions.setMainHeaderElements([
                <ButtonBack
                    key="back-button"
                    label="Back to projects board"
                    onClick={this.handleBackToProjectsListNavigation}
                />,
            ]);
        }

        if (reloadTitles && this.project !== null) {
            this.changeHeaderTitles(this.project);
        }
    };

    private changeHeaderTitles = (project: ProjectDetails) => {
        HeaderActions.setMainHeaderTitles(
            project.projectName
                ? project.projectName
                : project.projectCodeName
                    ? project.projectCodeName
                    : project.projectId
                        ? 'Project #' + project.projectId
                        : '',
            project.clientName ? project.clientName : 'Studio #' + project.clientId,
            project.projectName && project.projectCodeName ? '(' + project.projectCodeName + ') ' : null,
            null
        );
    };

    /** Handle back to projects listing button click */
    private handleBackToProjectsListNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!this.props.history) {
            return;
        }

        this.props.history.push('/portal/projects/' + this.fromProjectListPageNumber);
    };

    /** Handle attempting to load project which fetch has failed */
    private handleProjectFetchRetry = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.fetchProject();
    };

}

export default ProjectBoard;
