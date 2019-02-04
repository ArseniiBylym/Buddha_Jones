import { HeaderActions, UsersActions } from 'actions/index';
import { history } from 'App';
import { ButtonBack, ButtonSave } from 'components/Button/index';
import { Checkmark } from 'components/Form/index';
import { BottomBar } from 'components/Layout/index';
import { LoadingSpinner } from 'components/Loaders/index';
import { Modal } from 'components/Modals/index';
import { Col, Row } from 'components/Section/index';
import { Table, TableCell, TableRow } from 'components/Table/index';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { parse } from 'query-string';
import * as React from 'react';
// import { ProjectPermissionData, ProjectPermissionsType } from 'types/users';
import { AppState } from '../../../store/AllStores';
import * as styles from './styles.scss';
// const s = require('../../../ActivitiesDefinition/Form/ActivityDefinitionForm.css');
const s = require('../../Configuration/ActivitiesDefinition/Form/ActivityDefinitionForm.css');

export enum uploadStatus {
    none = 'none',
    success = 'success',
    saving = 'saving',
    error = 'error',
}

// Component
@inject('store')
@observer
class UserTypePermissions extends React.Component<any, {}> {

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return this.props.store.users.userTypePermissionsLoading;
        }
        return true;
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public render() {
        if (!this.props.store ) {
            return null;
        }
        return !this.essentialDataIsLoading ? (
            <>
                {this.getTableWithData()}
            </>
        ) : (
            <>{this.getTableWithLoadingSpinner()}</>
        );
    }

    // Load data by API when component mounted
    private setHeaderAndInitialData = (): void => {
        if (!this.props.match) {
            return;
        }

        const typeId = this.props.match.params.id;
        const typeName: any = this.props.location.search.split('=')[1] + '';

        // Fetch required data
        UsersActions.fetchUserTypesPermissions(typeId);

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            typeName,
            'Module access',
            null,
            null,
            [
                <ButtonBack
                    key="back-button"
                    onClick={this.goBackToProjectBoardPermissionList}
                    label="Back to User Management"
                />,
            ],
            [],
            false
        );
    };

    private goBackToProjectBoardPermissionList = () => {
        history.push('/portal/configuration/user-management');
    };

    // @action 
    // private hideNotificationBoard = () => {
    //     this.isProjectBoardPermissionsModified = false;
    // }

    // @action
    // private handleProjectBoardPermissionToggle(
    //     ind: number,
    //     val: 1 | 0,
    //     _projectPermissionId: number,
    //     type: 'canView' | 'canEdit'
    // ): void {
    //     if (!this.props.match || !this.props.store) {
    //         return;
    //     }
    //     let newVal: 1 | 0 = val === 1 ? 0 : 1;
    //     this.props.store.users.projectPermissionsTypes[ind][type] = newVal;
    //     if (type === 'canEdit' && newVal === 1) {
    //         this.props.store.users.projectPermissionsTypes[ind]['canView'] = 1;
    //     }
    //     this.isProjectBoardPermissionsModified = true;
    // }

    // private getButtonText(): string {
    //     let buttonText: string;
    //     switch (this.uploadStatus) {
    //         case 'none':
    //             buttonText = 'Save changes';
    //             break;
    //         case 'success':
    //             buttonText = 'Saved successfully';
    //             break;
    //         default:
    //             buttonText = 'Could not save, try again';
    //     }
    //     return buttonText;
    // }

    // render table data
    private getTableWithData(): JSX.Element {
        if (this.props.store!.users.userTypePermissions) {
            let tableRowsArr: JSX.Element[] = this.props.store.users.userTypePermissions.map(
                (boardType: any, ind: number) => {
                    return (
                        <TableRow key={`permission-type-${ind}`}>
                            <TableCell align="left">{boardType.subModuleName}</TableCell>
                            <TableCell align="center">
                                <Checkmark
                                    // onClick={() =>
                                    //     this.handleProjectBoardPermissionToggle(
                                    //         ind,
                                    //         boardType.canEdit,
                                    //         boardType.projectPermissionId,
                                    //         'canEdit'
                                    //     )
                                    // }
                                    checked={boardType.canAccess}
                                    type={'no-icon'}
                                />
                            </TableCell>
                        </TableRow>
                    );
                }
            );
            return (
                <Table
                    header={[
                        { title: '', align: 'left' },
                        { title: 'View', align: 'center' },
                    ]}
                    columnsWidths={['50%', '50%']}
                >
                    {tableRowsArr}
                </Table>
            );
        } else {
            return <></>;
        }
    }

    // render bottom bar
    // private getBottomBar(): JSX.Element {
    //     return (
    //         <BottomBar show={this.isProjectBoardPermissionsModified}>
    //             <div className={s.summary}>
    //                 <ButtonSave
    //                     onClick={this.handleSaveChanges}
    //                     labelColor={
    //                         this.uploadStatus === 'none'
    //                             ? 'blue'
    //                             : this.uploadStatus === 'success'
    //                             ? 'green'
    //                             : this.uploadStatus === 'saving'
    //                             ? 'black'
    //                             : 'orange'
    //                     }
    //                     isSaving={this.uploadStatus === 'saving'}
    //                     savingLabel="Saving"
    //                     label={this.getButtonText()}
    //                 />
    //             </div>
    //         </BottomBar>
    //     );
    // }

    // render warning modal
    // private getModalWarning(): JSX.Element {
    //     return (
    //         <Modal
    //             show={this.showCancelModal}
    //             title="Warning"
    //             closeButton={false}
    //             type="alert"
    //             text="Going back to project board permission list will revert changes you've made!"
    //             actions={[
    //                 {
    //                     onClick: this.handleClosingModal,
    //                     closeOnClick: false,
    //                     label: 'Stay on project board permission edit page, let me save changes',
    //                     type: 'default',
    //                 },
    //                 {
    //                     onClick: this.handleGoBackToProjectBoardPermissionList,
    //                     closeOnClick: false,
    //                     label: 'Revert changes and go back to project board permission list',
    //                     type: 'alert',
    //                 },
    //             ]}
    //         />
    //     );
    // }

    // render table spinner
    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64} />
                </Col>
            </Row>
        );
    }

//     @action
//     private handleSaveChanges = async () => {
//         if (!this.props.match || !this.props.store) {
//             return;
//         }
//         try {
//             const projectBoardPermissionData: ProjectPermissionData = {
//                 user_type_id: this.props.match.params['id'],
//                 permissions: JSON.stringify(
//                     this.props.store.users.projectPermissionsTypes.map(
//                         (projectBoardPermission: ProjectPermissionsType) => {
//                             return {
//                                 project_permission_id: projectBoardPermission.projectPermissionId,
//                                 can_view: projectBoardPermission.canView,
//                                 can_edit: projectBoardPermission.canEdit,
//                             };
//                         }
//                     )
//                 ),
//             };
//             this.uploadStatus = uploadStatus.saving;
//             await UsersActions.saveProjectBoardPermission(projectBoardPermissionData);
//             this.uploadStatus = uploadStatus.success;

//             setTimeout(() => {
//                 this.hideNotificationBoard();
//                 // this.goBackToProjectBoardPermissionList();
//             }, 2500);
//         } catch (error) {
//             if (this.uploadStatus === 'saving') {
//                 this.uploadStatus = uploadStatus.error;
//             }
//             throw error;
//         }
//     };
}

export default UserTypePermissions;
