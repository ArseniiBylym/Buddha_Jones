import * as React from 'react';
import * as styles from '../TimeEntryPermissions/styles.scss';
import { AppState } from 'store/AllStores';
import { inject, observer } from 'mobx-react';
import { match } from 'react-router';
import { Section, SectionElement } from '../../../components/Section';
import { InputSearch } from '../../../components/Form';
import { Table } from '../../../components/Table';
import { LoadingSpinner } from '../../../components/Loaders';
import {
    HeaderActions,
    TimeApprovalPermissionsActions,
    UsersActions
} from '../../../actions';
import { BottomBar } from '../../../components/Layout/BottomBar';
import { ButtonSave } from '../../../components/Button/ButtonSave';
import { ButtonBack } from '../../../components/Button';
import { history } from '../../../App';
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
                <LoadingSpinner size={64}/>
            </div>
        );
    }

    public componentDidMount(): void {
        this.setHeaderAndInitialData();
    }

    public render() {
        return(
            <>
                <Section
                    noSeparator={true}
                    title="User groups allowed to create time entries:"
                    headerElements={this.getHeaderElements()}
                >
                    {
                        (this.props.store!.users.loadingUserTypes || this.props.store!.timeApprovalPermissions.loading) ?
                            TimeApprovalPermissions.getTableWithLoadingSpinner() :
                            <Table>{this.getTableRows()}</Table>
                    }
                    {
                        <BottomBar
                            show={this.props.store!.timeApprovalPermissions.touched}
                        >
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

    private saveTimeApprovalPermissions = () => TimeApprovalPermissionsActions.saveTimeApprovalPermission(this.props.match.params['id']);

    private getTableRows(): JSX.Element[] {
        if (!this.props.store || !this.props.store.users) {
            return [];
        }
        const id = this.props.match.params['id'];
        return this.props.store.users.types.filter((userType) => userType.name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1).map(
            (userType) => {
                return (
                    <TimeApprovalPermissionsRow
                        key={userType.id}
                        id={userType.id}
                        name={userType.name}
                        isChecked={this.props.store!.timeApprovalPermissions.data[id] && this.props.store!.timeApprovalPermissions.data[id].includes(userType.id)}
                        submitterId={id}
                    />
                );
            }
        );
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
        HeaderActions.setMainHeaderTitlesAndElements(
            'Time approval permissions',
            'Configuration',
            null,
            null,
            [
                <ButtonBack
                    key="back-button"
                    onClick={this.goBackToTimeEntryPermissions}
                    label="Back to time entry permissions"
                />,
            ]
        ).then();
    };

    private goBackToTimeEntryPermissions = () => history.push(`/portal/configuration/user-management/time-entry-permissions`);

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            searchString: event.currentTarget.value
        });
    };
}

export default TimeApprovalPermissions;