import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { AppState } from 'store/AllStores';
import { HeaderActions, TimeApprovalPermissionsActions, UsersActions } from '../../../actions';
import { history } from '../../../App';
import { ButtonBack } from '../../../components/Button';
import { ButtonSave } from '../../../components/Button/ButtonSave';
import { InputSearch } from '../../../components/Form';
import { BottomBar } from '../../../components/Layout/BottomBar';
import { LoadingSpinner } from '../../../components/Loaders';
import { Section, SectionElement } from '../../../components/Section';
import { Table } from '../../../components/Table';
import * as styles from '../TimeEntryPermissions/styles.scss';
import TimeApprovalPermissionsRow from './TimeApprovalPermissionsRow';

interface Props {
    match: match<MatchRouteParams>;
}

interface State {
    searchString: string;
}

interface MatchRouteParams {
    readonly userTypeId: string;
}

type TimeEntryPermissionsProps = Props & AppState;

@inject('store')
@observer
class TimeApprovalPermissions extends React.Component<TimeEntryPermissionsProps, State> {
    constructor(props: TimeEntryPermissionsProps) {
        super(props);

        this.state = {
            searchString: '',
        };
    }

    private static getTableWithLoadingSpinner(): JSX.Element {
        return (
            <div className={styles.loadingSpinnerBlock}>
                <LoadingSpinner size={64} />
            </div>
        );
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public render() {
        return (
            <>
                <Section
                    noSeparator={true}
                    title="User groups allowed to create time entries:"
                    headerElements={this.getHeaderElements()}
                >
                    {this.props.store!.users.loadingUserTypes || this.props.store!.timeApprovalPermissions.loading ? (
                        TimeApprovalPermissions.getTableWithLoadingSpinner()
                    ) : (
                        <Table>{this.getTableRows()}</Table>
                    )}

                    {
                        <BottomBar show={this.props.store!.timeApprovalPermissions.touched}>
                            <ButtonSave
                                onClick={this.saveTimeApprovalPermissions}
                                float={'right'}
                                label={'Save Changes'}
                                savingLabel={'Saving'}
                                isSaving={this.props.store!.timeApprovalPermissions.saving}
                            />
                        </BottomBar>
                    }
                </Section>
            </>
        );
    }

    private saveTimeApprovalPermissions = () =>
        TimeApprovalPermissionsActions.saveTimeApprovalPermission(this.props.match.params['id']);

    private getTableRows(): JSX.Element[] {
        if (!this.props.store || !this.props.store.users) {
            return [];
        }
        const id = this.props.match.params['id'];
        return this.props.store.users.types
            .filter(userType => userType.name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1)
            .map(userType => {
                return (
                    <TimeApprovalPermissionsRow
                        key={userType.id}
                        id={userType.id}
                        name={userType.name}
                        isChecked={
                            this.props.store!.timeApprovalPermissions.data[id] &&
                            this.props.store!.timeApprovalPermissions.data[id].includes(userType.id)
                        }
                        submitterId={id}
                    />
                );
            });
    }

    private getHeaderElements = (): SectionElement[] => {
        return [
            {
                key: 'search-filter',
                element: (
                    <InputSearch
                        onChange={this.onChangeSearchInputHandler}
                        label="Search user group"
                        value={this.state.searchString}
                    />
                ),
            },
        ];
    };

    private setHeaderAndInitialData = (): void => {
        UsersActions.fetchUsersTypes();
        TimeApprovalPermissionsActions.getTimeApprovalPermissions();
        // Set header
        HeaderActions.replaceMainHeaderContent({
            title: 'Time approval permissions',
            subTitle: 'Configuration',
            elements: [
                <ButtonBack
                    key="back-button"
                    onClick={this.goBackToUserManagment}
                    // label="Back to time entry permissions"
                    label="Back to user managment"
                />,
            ],
        });
    };

    // private goBackToTimeEntryPermissions = () => history.push(`/portal/configuration/user-management/time-entry-permissions`);

    private goBackToUserManagment = () =>
        history.push(`/portal/configuration/user-management/project-board-permission`);

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            searchString: event.currentTarget.value,
        });
    };
}

export default TimeApprovalPermissions;
