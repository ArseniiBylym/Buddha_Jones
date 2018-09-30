import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppOnlyStoreState } from 'store/AllStores';
import { ProjectDetails } from 'types/projectDetails';
import {
    ProjectBoardHistory,
    ProjectBoardDescription,
    ProjectBoardEditableCore,
    ProjectBoardReleaseDate,
    ProjectBoardCampaigns,
    ProjectBoardFilter,
} from '.';
import { HeaderActions, ProjectsDetailsActions } from 'actions';
import { ButtonEdit, ButtonSave } from 'components/Button';
import { observable, computed, reaction, toJS } from 'mobx';
import { UserPermissionKey } from 'types/projectPermissions';
import { Modal } from 'components/Modals';
import { DropdownContainer, OptionsList, TextArea, ToggleButtons, OptionsListValuePropType } from 'components/Form';

// Styles
const s = require('./ProjectBoardContent.css');

// Props
interface ProjectBoardContentProps extends AppOnlyStoreState {
    onHeaderElementsChange: (reloadTitles: boolean, reloadRightSideElements: boolean) => void;
    project: ProjectDetails;
    projectIsUpdating: boolean;
}

// Types
type ProjectBoardContentPropsType = ProjectBoardContentProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProjectBoardContent extends React.Component<ProjectBoardContentPropsType, {}> {
    @observable private editingProjectCore: boolean = false;
    @observable private projectHistoryIsExpanded: boolean = false;

    @computed
    private get userCanEditProjectName(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectName]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectName].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanEditProjectCodeName(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectCodeName]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectCodeName].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanEditProjectReleaseDate(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectReleaseDate]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectReleaseDate].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanViewProjectReleaseDate(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectReleaseDate]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectReleaseDate].canView ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanViewProjectHistory(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectHistory]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectHistory].canView ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanEditProjectDescription(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectDescription]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectDescription].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanViewProjectDescription(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.ProjectDescription]) {
                return loggedInUserPermissions[UserPermissionKey.ProjectDescription].canView ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanEditVersion(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.SpotRevision]) {
                return loggedInUserPermissions[UserPermissionKey.SpotRevision].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanEditVersionStatus(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.SpotRevisionStatus]) {
                return loggedInUserPermissions[UserPermissionKey.SpotRevisionStatus].canEdit ? true : false;
            }
        }

        return false;
    }

    @computed
    private get userCanEditVersionNote(): boolean {
        if (this.props.store) {
            const { loggedInUserPermissions } = this.props.store.projectPermissions;

            if (loggedInUserPermissions[UserPermissionKey.SpotRevisionNote]) {
                return loggedInUserPermissions[UserPermissionKey.SpotRevisionNote].canEdit ? true : false;
            }
        }

        return false;
    }

    private versionStatusDropdown: DropdownContainer | null = null;

    public constructor(props: ProjectBoardContentPropsType) {
        super(props);

        reaction(() => this.userCanEditProjectName, userCanEditProjectName => this.showEditProjectCoreButton());

        reaction(() => this.userCanEditProjectCodeName, userCanEditProjectCodeName => this.showEditProjectCoreButton());

        reaction(
            () => this.userCanEditProjectReleaseDate,
            userCanEditProjectReleaseDate => this.showEditProjectCoreButton()
        );
    }

    public componentDidMount() {
        this.showEditProjectCoreButton();
    }

    public componentWillReceiveProps(nextProps: ProjectBoardContentProps) {
        if (this.props.projectIsUpdating !== nextProps.projectIsUpdating || this.props.project !== nextProps.project) {
            this.showEditProjectCoreButton();
        }
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { project } = this.props;
        const { projectsDetails, projectsVersions } = this.props.store;

        return (
            <>
                <div>

                    <ProjectBoardEditableCore
                        userCanEditProjectName={this.userCanEditProjectName}
                        userCanEditProjectCodeName={this.userCanEditProjectCodeName}
                        userCanEditProjectReleaseDate={this.userCanEditProjectReleaseDate}
                        onEditingEnd={this.handleEditingEnd}
                        editing={this.editingProjectCore}
                        projectId={project.projectId}
                        projectName={project.projectName}
                        projectCodeName={project.projectCodeName}
                        projectReleaseDate={project.projectReleaseDate}
                    />

                    <ProjectBoardReleaseDate
                        userCanViewReleaseDate={this.userCanViewProjectReleaseDate}
                        userCanViewHistory={this.userCanViewProjectHistory}
                        onToggleExpansionOfProjectHistoryClick={this.handleProjectHistoryToggle}
                        editingProjectCore={this.editingProjectCore}
                        projectReleaseDate={project.projectReleaseDate}
                        isHistoryExpanded={this.projectHistoryIsExpanded}
                    />

                    <ProjectBoardHistory
                        userCanView={this.userCanViewProjectHistory}
                        onExpansionToggle={this.handleProjectHistoryToggle}
                        isExpanded={this.projectHistoryIsExpanded}
                        history={project.history}
                    />

                    <ProjectBoardDescription
                        userCanView={this.userCanViewProjectDescription}
                        userCanEdit={this.userCanEditProjectDescription}
                        projectId={project.projectId}
                        note={project.notes}
                    >
                        <ProjectBoardFilter
                            label={'Version status'}
                            options={projectsVersions.allVersionStatuses}
                            value={projectsVersions.filterVersionStatus}
                            width={350}
                            float={'right'}
                        />
                    </ProjectBoardDescription>

                    <ProjectBoardCampaigns project={project} projectIsUpdating={project.loading} />
                </div>

                <Modal
                    show={
                        projectsDetails.versionEditModal &&
                        projectsDetails.versionEditModal.show &&
                        projectsDetails.versionEditModal.projectId === project.projectId
                            ? true
                            : false
                    }
                    title={
                        projectsDetails.versionEditModal && projectsDetails.versionEditModal.versionName
                            ? 'Editing version: ' + projectsDetails.versionEditModal.versionName
                            : undefined
                    }
                    closeButton={true}
                    onClose={this.handleVersionEditModalClose}
                    size={'content-wide'}
                >
                    {projectsDetails.versionEditModal && (
                        <div>
                            {this.userCanEditVersionStatus && (
                                <DropdownContainer
                                    ref={this.referenceVersionStatusDropdown}
                                    label="Version status"
                                    value={
                                        projectsDetails.versionEditModal.versionStatus
                                            ? projectsDetails.versionEditModal.versionStatus.name
                                            : undefined
                                    }
                                    type="field"
                                >
                                    <OptionsList
                                        onChange={this.handleVersionStatusChange}
                                        value={
                                            projectsDetails.versionEditModal.versionStatus
                                                ? projectsDetails.versionEditModal.versionStatus.id
                                                : 'No status'
                                        }
                                        options={[
                                            ...[
                                                {
                                                    value: null,
                                                    label: 'No status',
                                                },
                                            ],
                                            ...projectsVersions.allVersionStatuses.map(status => ({
                                                value: status.id,
                                                label: status.name,
                                            })),
                                        ]}
                                    />
                                </DropdownContainer>
                            )}

                            {this.userCanEditVersionNote && (
                                <TextArea
                                    onChange={this.handleVersionNoteChange}
                                    className={s.versionNotes}
                                    label="Version note"
                                    value={projectsDetails.versionEditModal.versionNote || ''}
                                    width={1152}
                                    height={400}
                                />
                            )}

                            <div className={s.versionModalSummary}>
                                {this.userCanEditVersion && (
                                    <ToggleButtons
                                        onChange={this.handleVersionRemoval}
                                        toggleIsSetToRight={false}
                                        toggleOnLeft={{
                                            value: false,
                                            color: 'green',
                                            label:
                                                projectsDetails.versionEditModal.uploadStatus === 'remove-prompt'
                                                    ? 'No, keep the version'
                                                    : '',
                                        }}
                                        toggleOnRight={{
                                            value: true,
                                            color:
                                                projectsDetails.versionEditModal.uploadStatus === 'removing-succes'
                                                    ? 'green'
                                                    : 'orange',
                                            label:
                                                projectsDetails.versionEditModal.uploadStatus === 'remove-prompt'
                                                    ? 'Yes, please remove this version'
                                                    : projectsDetails.versionEditModal.uploadStatus === 'removing'
                                                        ? 'Removing the version...'
                                                        : projectsDetails.versionEditModal.uploadStatus ===
                                                          'removing-succes'
                                                            ? 'Removed the version'
                                                            : 'Remove the version',
                                        }}
                                    />
                                )}

                                {(this.userCanEditVersionStatus || this.userCanEditVersionNote) &&
                                    projectsDetails.versionEditModal.uploadStatus !== 'remove-prompt' &&
                                    projectsDetails.versionEditModal.uploadStatus !== 'removing' &&
                                    projectsDetails.versionEditModal.uploadStatus !== 'removing-error' &&
                                    projectsDetails.versionEditModal.uploadStatus !== 'removing-succes' && (
                                        <ButtonSave
                                            onClick={this.handleVersionChangesSave}
                                            labelColor={
                                                projectsDetails.versionEditModal.uploadStatus === 'saving-error'
                                                    ? 'orange'
                                                    : projectsDetails.versionEditModal.uploadStatus === 'saving-success'
                                                        ? 'green'
                                                        : 'blue'
                                            }
                                            label={
                                                projectsDetails.versionEditModal.uploadStatus === 'saving-error'
                                                    ? 'Could not save changes, try again'
                                                    : projectsDetails.versionEditModal.uploadStatus === 'saving-success'
                                                        ? 'Saved changes'
                                                        : 'Save'
                                            }
                                            savingLabel="Saving version"
                                            isSaving={projectsDetails.versionEditModal.uploadStatus === 'saving'}
                                        />
                                    )}
                            </div>
                        </div>
                    )}
                </Modal>
            </>
        );
    }

    private referenceVersionStatusDropdown = (ref: DropdownContainer) => (this.versionStatusDropdown = ref);

    private showEditProjectCoreButton = () => {
        HeaderActions.setMainHeaderElementsOnLeft(
            this.userCanEditProjectName || this.userCanEditProjectCodeName || this.userCanEditProjectReleaseDate
                ? [
                      <ButtonEdit
                          key="edit-project-core-button"
                          onClick={this.handleCoreEditButtonClick}
                          iconBackground="yellow"
                          label="Edit"
                          labelOnLeft={false}
                      />,
                  ]
                : []
        );
    };

    private handleCoreEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.editingProjectCore = true;
        HeaderActions.setMainHeaderElementsOnLeft([]);
    };

    private handleEditingEnd = () => {
        this.editingProjectCore = false;
        this.props.onHeaderElementsChange(true, false);
        this.showEditProjectCoreButton();
    };

    private handleProjectHistoryToggle = () => {
        this.projectHistoryIsExpanded = !this.projectHistoryIsExpanded;
    };

    private handleVersionEditModalClose = () => {
        if (this.props.store && this.props.store.projectsDetails.versionEditModal) {
            this.props.store.projectsDetails.versionEditModal.show = false;
        }
    };

    private handleVersionStatusChange = (option: { value: OptionsListValuePropType; label: string }) => {
        ProjectsDetailsActions.changeVersionEditModalVersionStatus(
            option.value === null
                ? null
                : {
                      id: option.value as number,
                      name: option.label,
                  }
        );

        if (this.versionStatusDropdown) {
            this.versionStatusDropdown.closeDropdown();
        }
    };

    private handleVersionNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        ProjectsDetailsActions.changeVersionEditModalVersionNote(e.target.value);
    };

    private handleVersionRemoval = (remove: boolean) => {
        // Two phases - remove prompt which gives user ability to confirm action and actual removal phase
        if (this.props.store && this.props.store.projectsDetails.versionEditModal) {
            const { versionEditModal } = this.props.store.projectsDetails;
            if (versionEditModal.uploadStatus === 'remove-prompt') {
                if (remove) {
                    ProjectsDetailsActions.removeVersionFromProjectCampaignSpot(
                        versionEditModal.projectId,
                        versionEditModal.projectCampaignId,
                        versionEditModal.spotId,
                        versionEditModal.versionId
                    );
                } else {
                    ProjectsDetailsActions.changeVersionEditModalUploadStatus('none');
                }
            } else {
                ProjectsDetailsActions.changeVersionEditModalUploadStatus('remove-prompt');
            }
        }
    };

    private handleVersionChangesSave = () => {
        if (this.props.store && this.props.store.projectsDetails.versionEditModal) {
            const versionData = toJS(this.props.store.projectsDetails.versionEditModal);
            delete versionData.show;
            delete versionData.uploadStatus;
            ProjectsDetailsActions.changeProjectCampaignSpotVersionData(
                versionData,
                this.userCanEditVersionStatus,
                this.userCanEditVersionNote
            );
        }
    };

}
