import * as React from 'react';
import * as styles from './styles.scss';
import { HeaderActions, UsersActions } from 'actions/index';
import { AppState } from 'store/AllStores';
import { Section, SectionElement } from 'components/Section/index';
import { Checkmark, InputSearch } from 'components/Form/index';
import { inject, observer } from 'mobx-react';
import { history } from 'App';
import { ButtonBack, ButtonEdit } from 'components/Button';
import { match } from 'react-router';
import { OtherUserFromApi } from 'types/users';
import { Table, TableCell, TableHeader, TableRow } from 'components/Table';
import { LoadingSpinner } from 'components/Loaders';
import { Pagination } from '../../../../../components/Pagination';
import { action, observable } from 'mobx';
import { EditUserModal } from './EditUserModal';

interface Props {
    match: match<MatchRouteParams>;
}

interface MatchRouteParams {
    readonly userTypeId: string;
}

@inject('store')
@observer
class UserManagementUsersList extends React.Component<Props & AppState, {}> {
    @observable private isEditUserModalOpen: boolean = false;

    private static getTableHeader(): TableHeader[] {
        return [
            { title: 'Nick name', align: 'center' },
            { title: 'Full name', align: 'center' },
            { title: 'User name', align: 'center' },
            { title: 'Email', align: 'center' },
            { title: 'Active', align: 'center' },
            { title: '', align: 'right' }
        ];
    }

    private static getTableWithLoadingSpinner(): JSX.Element {
        return (
            <div className={styles.loadingSpinnerBlock}>
                <LoadingSpinner size={64}/>
            </div>
        );
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        return (
            <>
                <EditUserModal
                    isModalOpen={this.isEditUserModalOpen}
                    currentUser={this.props.store.users.currentSelectedUser}
                    onModalClose={this.onEditUserModalCloseHandler}
                    setCurrentSelectedUser={UsersActions.setCurrentSelectedUser}
                    onUserSaveData={UsersActions.saveCurrentSelectedUserAndReloadList}
                    loggedUserTypeId={this.props.store!.user.data!.typeId}
                    userTypes={this.props.store!.users.types}
                    isLoading={this.props.store!.users.isCurrentSelectedUserSaveLoading}
                />

                <Section
                    noSeparator={true}
                    title="Users management by user type"
                    headerElements={this.getHeaderElements()}
                >
                    {
                        this.props.store!.users.isPageableUsersListLoading &&
                        UserManagementUsersList.getTableWithLoadingSpinner()
                    }

                    <Table header={UserManagementUsersList.getTableHeader()}>
                        {this.getTableRows()}
                    </Table>

                    <Pagination
                        countPerPage={Number(this.props.store!.users.usersListRequestParams.length)}
                        countTotal={Number(this.props.store!.users.pageableUsersList.total_count)}
                        currentPage={Number(this.props.store!.users.pageableUsersList.page)}
                        onPageChange={this.onChangePageNumberHandler}
                    />
                </Section>
            </>
        );
    }

    private getTableRows(): JSX.Element[] {
        return this.props.store!.users.pageableUsersList.data.map(
            (user: OtherUserFromApi) => {
                return (
                    <TableRow key={user.id}>
                        <TableCell align="center">
                            {user.nickName}
                        </TableCell>

                        <TableCell align="center">
                            {user.fullName}
                        </TableCell>

                        <TableCell align="center">
                            {user.firstName}
                        </TableCell>

                        <TableCell align="center">
                            {user.email}
                        </TableCell>

                        <TableCell align="center">
                            <Checkmark
                                checked={Boolean(user.status)}
                                type={'no-icon'}
                            />
                        </TableCell>

                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.onTableEditButtonHandler(user)}
                                label="Edit"
                                labelOnLeft={false}
                                float="right"
                            />
                        </TableCell>
                    </TableRow>
                );
            }
        );
    }

    private getHeaderElements(): SectionElement[] {
        return [
            {
                key: 'search-filter',
                element: (
                    <InputSearch
                        onChange={this.onChangeSearchInputHandler}
                        label="Search users..."
                        value={this.props.store!.users.usersListRequestParams.search}
                    />
                ),
            },
        ];
    }

    @action
    private onEditUserModalCloseHandler = () => {
        this.isEditUserModalOpen = false;
    };

    @action
    private onTableEditButtonHandler = (user: OtherUserFromApi) => () => {
        UsersActions.setCurrentSelectedUser(user);
        this.isEditUserModalOpen = true;
    };

    private onChangePageNumberHandler = (page: number): void => {
        UsersActions.setUsersRequestParams({ page });
        UsersActions.fetchUsersByTypeId().then();
    };

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        UsersActions.setUsersRequestParams({
            search: event.currentTarget.value,
            page: 1
        });

        UsersActions.fetchUsersByTypeId().then();
    };

    private goBackToProjectBoardPermissionList = (): void => {
        history.push('/portal/configuration/user-management/project-board-permission');
    };

    private setHeaderAndInitialData = (): void => {
        UsersActions.cleanPageableUsersList();
        UsersActions.setUsersRequestParams({ type: Number(this.props.match.params.userTypeId) });
        UsersActions.fetchUsersByTypeId().then();
        UsersActions.fetchUsersTypes().then();

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'User Management',
            'Configuration',
            null,
            null,
            [
                <ButtonBack
                    key="back-button"
                    onClick={this.goBackToProjectBoardPermissionList}
                    label="Back to user management"
                />,
            ]
        ).then();
    };
}

export default UserManagementUsersList;