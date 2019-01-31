import { HeaderActions, UsersActions } from 'actions';
import { history } from 'App';
import { ButtonEdit } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Checkmark, InputSearch } from 'components/Form';
import { LoadingSpinner } from 'components/Loaders';
import { Col, Row, Section } from 'components/Section';
import { Table, TableCell, TableRow } from 'components/Table';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { UserType } from 'types/users';
import { TimeEntryPermissionsActions } from '../../../../../actions';
import { ButtonSave } from '../../../../../components/Button/ButtonSave';
import { BottomBar } from '../../../../../components/Layout/BottomBar';

const s = require('./ProjectBoardPermissionList.css');

@inject('store')
@observer
class ProjectBoardPermissionList extends React.Component<AppState, {}> {
    @observable private userTypesArrFiltered: UserType[] | null = null;

    @computed
    private get essentialDataIsLoading(): boolean {
        if (this.props.store) {
            return this.props.store.users.typesLoading;
        }

        return true;
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public render() {
        if (!this.props.store) {
            return null;
        }
        return this.essentialDataIsLoading === false ? (
            <Section
                noSeparator={true}
                title="User types"
                headerElements={[
                    {
                        key: 'search-filter',
                        element: <InputSearch onChange={this.handleUserTypeSearchChange} label="Search user type..." />,
                    },
                ]}
            >
                {this.getTableWithData()}
                {
                    <BottomBar show={this.props.store!.timeEntryPermissions.touched}>
                        <ButtonSave
                            onClick={TimeEntryPermissionsActions.saveTimeEntryPermissions}
                            float={'right'}
                            label={'Save Changes'}
                            savingLabel={'Saving'}
                            isSaving={this.props.store!.timeEntryPermissions.saving}
                        />
                    </BottomBar>
                }
            </Section>
        ) : (
            <>{this.getTableWithLoadingSpinner()}</>
        );
    }

    // Load data by API when component mounted
    private setHeaderAndInitialData = (): void => {
        // Fetch required data
        UsersActions.fetchUsersTypes();
        TimeEntryPermissionsActions.getTimeEntryPermissions();

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements('User Management', 'Configuration', null, null, [], [], false);
    };

    private searchInArrByKeysArrAndValue(arr: UserType[], keysArr: string[], value: string | number): UserType[] {
        return arr.filter((obj: UserType) => {
            return keysArr.some((key: string) => {
                return obj[key].includes(value);
            });
        });
    }

    @action
    private handleUserTypeSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (this.props.store) {
            this.userTypesArrFiltered = e.target.value
                ? this.searchInArrByKeysArrAndValue(this.props.store.users.types, ['name'], e.target.value)
                : null;
        }
    };

    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64} />
                </Col>
            </Row>
        );
    }

    private getTableWithNoMatchingText(): JSX.Element {
        return (
            <TableRow>
                <TableCell colSpan={2} align="center">
                    <Paragraph type="dim" align="center">
                        No user types matching filters exist.
                    </Paragraph>
                </TableCell>
            </TableRow>
        );
    }

    // check if search results are empty
    private isSearchResultsEmpty(): boolean {
        return this.userTypesArrFiltered !== null && this.userTypesArrFiltered.length === 0;
    }

    // render table data
    private getTableWithData(): JSX.Element {
        if (this.props.store) {
            let userTypesArr =
                this.userTypesArrFiltered === null ? this.props.store.users.types : this.userTypesArrFiltered;
            let tableRowsArr: JSX.Element[] = userTypesArr.map((userType: UserType, ind: number) => {
                return (
                    <TableRow key={`user-type-${ind}`}>
                        <TableCell align="left">
                            <div className={s.userType__wrapper}>
                                <div>{userType.name}</div>
                                {userType.timeEntryApprover ? <div className={s.userType__label}>approver</div> : null}
                            </div>
                        </TableCell>
                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.onEditClick(userType.id)}
                                label={`approving ${
                                    userType.timeEntryApprovingCount ? userType.timeEntryApprovingCount : 0
                                }`}
                                labelOnLeft={true}
                                float="right"
                            />
                        </TableCell>
                        <TableCell align="right">
                            <Checkmark
                                onClick={this.handlePermissionChange(userType.id)}
                                checked={this.props.store!.timeEntryPermissions.data.includes(userType.id)}
                                label={this.props.store!.timeEntryPermissions.data.includes(userType.id) ? 'Required' : 'Not Required'}
                                labelOnLeft={true}
                                type={'no-icon'}
                            />
                        </TableCell>
                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.handleUsersEdit(userType.id, userType.name)}
                                label={`${userType.userCount ? userType.userCount : 0} users`}
                                labelOnLeft={true}
                                float="right"
                            />
                        </TableCell>
                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.handlePermissionEdit(userType.id, userType.name)}
                                label="Manage access"
                                labelOnLeft={true}
                                float="right"
                            />
                        </TableCell>
                    </TableRow>
                );
            });
            return (
                <Table
                    header={[
                        { title: 'User type', align: 'left' },
                        { title: 'Approval', align: 'right' },
                        { title: 'Time entry', align: 'right' },
                        { title: 'Users', align: 'right' },
                        { title: 'Access', align: 'right' },
                    ]}
                    columnsWidths={['28%', '18%', '18%', '18%', '18%']}
                >
                    {this.isSearchResultsEmpty() ? this.getTableWithNoMatchingText() : tableRowsArr}
                </Table>
            );
        } else {
            return <></>;
        }
    }

    private handlePermissionChange = (id: number) => e => {
        TimeEntryPermissionsActions.changeTimeEntryPermission(id);
    };

    private onEditClick = (id: number) => e => {
        history.push(`/portal/configuration/user-management/time-approval-permissions/${id}`);
    };

    private handleUsersEdit = (userTypeId: number, userTypeName: string) => (): void => {
        history.push(
            `/portal/configuration/user-management/users-list/${userTypeId}/?type_name=${encodeURIComponent(
                userTypeName
            )}`
        );
    };

    private handlePermissionEdit = (userTypeId: number, userTypeName: string) => (): void => {
        history.push(
            `/portal/configuration/user-management/project-board-permission/${userTypeId}/?type_name=${encodeURIComponent(
                userTypeName
            )}`
        );
    };
}

export default ProjectBoardPermissionList;
