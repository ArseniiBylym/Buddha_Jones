import * as React from 'react';
import { AppState } from 'store/AllStores';
import { HeaderActions, UsersActions } from 'actions';
import { inject, observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';
import { Col, Row, Section } from 'components/Section';
import { InputSearch } from 'components/Form';
import { Table, TableCell, TableRow } from 'components/Table';
import { LoadingSpinner } from 'components/Loaders';
import { UserType } from 'types/users';
import { Paragraph } from 'components/Content';
import { history } from 'App';
import { ButtonEdit } from 'components/Button';

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
                        element: (
                            <InputSearch
                                onChange={this.handleUserTypeSearchChange}
                                label="Search user type..."
                            />
                        ),
                    },
                ]}
            >
                {this.getTableWithData()}
            </Section>
        ) : (
            <>
                {this.getTableWithLoadingSpinner()}
            </>
        );
    }

    // Load data by API when component mounted
    private setHeaderAndInitialData = (): void => {
        // Fetch required data
        UsersActions.fetchUsersTypes();

        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'Project Board permissions',
            'Configuration',
            null,
            null
        );
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
            this.userTypesArrFiltered = (e.target.value) ? this.searchInArrByKeysArrAndValue(this.props.store.users.types, ['name'], e.target.value) : null;
        }
    };

    private getTableWithLoadingSpinner(): JSX.Element {
        return (
            <Row justifyContent="center">
                <Col width={64}>
                    <LoadingSpinner size={64}/>
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
            let userTypesArr = (this.userTypesArrFiltered === null) ? this.props.store.users.types : this.userTypesArrFiltered;
            let tableRowsArr: JSX.Element[] = userTypesArr.map((userType: UserType, ind: number) => {
                return (
                    <TableRow key={`user-type-${ind}`}>
                        <TableCell align="left">
                            {userType.name}
                        </TableCell>

                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.handlePermissionEdit(userType.id, userType.name)}
                                label="Manage access"
                                labelOnLeft={false}
                                float="right"
                            />
                        </TableCell>

                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.handleUsersEdit(userType.id, userType.name)}
                                label="Edit users"
                                labelOnLeft={false}
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
                        { title: '', align: 'right' },
                        { title: '', align: 'right' }
                    ]}
                    columnsWidths={['60%', '20%', '20%']}
                >
                    {(this.isSearchResultsEmpty()) ? this.getTableWithNoMatchingText() : tableRowsArr}
                </Table>
            );
        } else {
            return (
                <></>
            );
        }
    }

    private handleUsersEdit = (
        userTypeId: number, userTypeName: string
    ) => (): void => {
        history.push(
            `/portal/configuration/user-management/users-list/${userTypeId}/?type_name=${encodeURIComponent(userTypeName)}`
        );
    };

    private handlePermissionEdit = (
        userTypeId: number, userTypeName: string
    ) => (): void => {
        history.push(
            `/portal/configuration/user-management/project-board-permission/${userTypeId}/?type_name=${encodeURIComponent(userTypeName)}`
        );
    };
}

export default ProjectBoardPermissionList;
