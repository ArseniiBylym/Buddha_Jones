import * as React from 'react';
import { parse } from 'query-string';
import { AppState } from '../../../../../store/AllStores';
import { HeaderActions, UsersActions } from 'actions/index';
import { inject, observer } from 'mobx-react';
import { ProjectPermissionData, ProjectPermissionsType } from 'types/users';
import { ButtonBack, ButtonSave } from 'components/Button/index';
import { Col, Row } from 'components/Section/index';
import { LoadingSpinner } from 'components/Loaders/index';
import { action, computed, observable } from 'mobx';
import { Table, TableCell, TableRow } from 'components/Table/index';
import { Checkmark } from 'components/Form/index';
import { BottomBar } from 'components/Layout/index';
import { history } from 'App';
import { Modal } from 'components/Modals/index';

export enum uploadStatus {
    none = 'none',
    success = 'success',
    saving = 'saving',
    error = 'error'
}

// Styles
const s = require('../../../ActivitiesDefinition/Form/ActivityDefinitionForm.css');

// Props
interface ProjectBoardPermissionEditProps {
}

// Props types
type ProjectBoardPermissionEditPropsTypes = ProjectBoardPermissionEditProps & AppState;

// Component
@inject('store')
@observer
class ProjectBoardPermissionEdit extends React.Component<ProjectBoardPermissionEditPropsTypes, {}> {

    @observable private isProjectBoardPermissionsModified: boolean = false;
    @observable private uploadStatus: uploadStatus = uploadStatus.none;
    @observable private showCancelModal: boolean = false;

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return this.props.store.users.projectPermissionsTypesLoading;
        }
        return true;
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public componentDidUpdate(prevProps: ProjectBoardPermissionEditPropsTypes) {
        if (prevProps.match && this.props.match && prevProps.match.params['id'] !== this.props.match.params['id']) {
            this.setHeaderAndInitialData();
        }
    }

    public render() {
        if (!this.props.store) {
            return null;
        }
        return !this.essentialDataIsLoading ? (
            <>
                {this.getTableWithData()}
                {this.getBottomBar()}
                {this.getModalWarning()}
            </>
        ) : (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        );
    }

    // Load data by API when component mounted
    private setHeaderAndInitialData = (): void => {
        if (!this.props.match) {
            return;
        }
        const query = (this.props.location) ? parse(this.props.location.search) : null;
        const typeName: string = (query && query.type_name) ? query.type_name : null;

        // Fetch required data
        UsersActions.fetchProjectPermissionsTypes(this.props.match.params['id'], true);

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            decodeURIComponent(typeName),
            'Project Board permissions',
            null,
            null,
            [
                <ButtonBack
                    key="back-button"
                    onClick={this.handleGoBackToProjectBoardPermissionList}
                    label="Back to Project Board permissions"
                />,
            ]
        );
    };

    private handleGoBackToProjectBoardPermissionList = (): void => {
        if (this.isProjectBoardPermissionsModified && !this.showCancelModal) {
            this.showCancelModal = true;
            return;
        }

        this.goBackToProjectBoardPermissionList();
        this.showCancelModal = false;
    };

    private handleClosingModal = () => {
        this.showCancelModal = false;
    };

    private goBackToProjectBoardPermissionList = () => {
        history.push('/portal/configuration/user-management/project-board-permission');
    };

    @action
    private handleProjectBoardPermissionToggle(ind: number, val: 1 | 0, _projectPermissionId: number, type: 'canView' | 'canEdit'): void {
        if (!this.props.match || !this.props.store) {
            return;
        }
        let newVal: 1 | 0 = (val === 1) ? 0 : 1;
        this.props.store.users.projectPermissionsTypes[ind][type] = newVal;
        if (type === 'canEdit' && newVal === 1) {
            this.props.store.users.projectPermissionsTypes[ind]['canView'] = 1;
        }
        this.isProjectBoardPermissionsModified = true;
    }

    private getButtonText(): string {
        let buttonText: string;
        switch (this.uploadStatus) {
            case 'none' :
                buttonText = 'Save changes';
                break;
            case 'success' :
                buttonText = 'Saved successfully';
                break;
            default:
                buttonText = 'Could not save, try again';
        }
        return buttonText;
    }

    // render table data
    private getTableWithData(): JSX.Element {
        if (this.props.store) {
            let tableRowsArr: JSX.Element[] = this.props.store.users.projectPermissionsTypes.map((permissionType: ProjectPermissionsType, ind: number) => {
                return (
                    <TableRow key={`permission-type-${ind}`}>
                        <TableCell align="left">
                            {permissionType.projectPermissionLabel}
                        </TableCell>
                        <TableCell align="center">
                            <Checkmark
                                onClick={() => this.handleProjectBoardPermissionToggle(ind, permissionType.canView, permissionType.projectPermissionId, 'canView')}
                                checked={permissionType.canView === 1}
                                type={'no-icon'}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Checkmark
                                onClick={() => this.handleProjectBoardPermissionToggle(ind, permissionType.canEdit, permissionType.projectPermissionId, 'canEdit')}
                                checked={permissionType.canEdit === 1}
                                type={'no-icon'}
                            />
                        </TableCell>
                    </TableRow>
                );
            });
            return (
                <Table
                    header={[
                        { title: 'Project name', align: 'left' },
                        { title: 'View', align: 'center' },
                        { title: 'Edit', align: 'center' }
                    ]}
                    columnsWidths={['50%', '25%', '25%']}
                >
                    {tableRowsArr}
                </Table>
            );
        } else {
            return (
                <></>
            );
        }
    }

    // render bottom bar
    private getBottomBar(): JSX.Element {
        return (
            <BottomBar show={this.isProjectBoardPermissionsModified}>
                <div className={s.summary}>
                    <ButtonSave
                        onClick={this.handleSaveChanges}
                        labelColor={
                            this.uploadStatus === 'none'
                                ? 'blue'
                                : this.uploadStatus === 'success'
                                ? 'green'
                                : this.uploadStatus === 'saving'
                                    ? 'black'
                                    : 'orange'
                        }
                        isSaving={this.uploadStatus === 'saving'}
                        savingLabel="Saving"
                        label={this.getButtonText()}
                    />
                </div>
            </BottomBar>
        );
    }

    // render warning modal
    private getModalWarning(): JSX.Element {
        return (
            <Modal
                show={this.showCancelModal}
                title="Warning"
                closeButton={false}
                type="alert"
                text="Going back to project board permission list will revert changes you've made!"
                actions={[
                    {
                        onClick: this.handleClosingModal,
                        closeOnClick: false,
                        label: 'Stay on project board permission edit page, let me save changes',
                        type: 'default',
                    },
                    {
                        onClick: this.handleGoBackToProjectBoardPermissionList,
                        closeOnClick: false,
                        label: 'Revert changes and go back to project board permission list',
                        type: 'alert',
                    },
                ]}
            />
        );
    }

    // render table spinner
    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64}/>
                </Col>
            </Row>
        );
    }

    @action
    private handleSaveChanges = async () => {
        if (!this.props.match || !this.props.store) {
            return;
        }
        try {
            const projectBoardPermissionData: ProjectPermissionData = {
                user_type_id: this.props.match.params['id'],
                permissions: JSON.stringify(this.props.store.users.projectPermissionsTypes
                    .map((projectBoardPermission: ProjectPermissionsType) => {
                        return {
                            project_permission_id: projectBoardPermission.projectPermissionId,
                            can_view: projectBoardPermission.canView,
                            can_edit: projectBoardPermission.canEdit
                        };
                    }))
            };
            this.uploadStatus = uploadStatus.saving;
            await UsersActions.saveProjectBoardPermission(projectBoardPermissionData);
            this.uploadStatus = uploadStatus.success;

            setTimeout(() => {
                this.goBackToProjectBoardPermissionList();
            }, 1024);
        } catch (error) {
            if (this.uploadStatus === 'saving') {
                this.uploadStatus = uploadStatus.error;
            }
            throw error;
        }
    };
}

export default ProjectBoardPermissionEdit;
