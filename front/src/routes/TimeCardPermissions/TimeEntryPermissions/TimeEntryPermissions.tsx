import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { AppState } from 'store/AllStores';
import { HeaderActions, TimeEntryPermissionsActions, UsersActions } from '../../../actions';
import { ButtonSave } from '../../../components/Button/ButtonSave';
import { InputSearch } from '../../../components/Form';
import { BottomBar } from '../../../components/Layout/BottomBar';
import { LoadingSpinner } from '../../../components/Loaders';
import { Section, SectionElement } from '../../../components/Section';
import { Table } from '../../../components/Table';
import * as styles from './styles.scss';
import TimeEntryPermissionsRow from './TimeEntryPermissionsRow';

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
class TimeEntryPermissions extends React.Component<TimeEntryPermissionsProps, State> {
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
                    {this.props.store!.users.loadingUserTypes ? (
                        TimeEntryPermissions.getTableWithLoadingSpinner()
                    ) : (
                        <Table>{this.getTableRows()}</Table>
                    )}
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
            </>
        );
    }

    private getTableRows(): JSX.Element[] {
        if (!this.props.store || !this.props.store.users) {
            return [];
        }
        return this.props.store.users.types
            .filter(userType => userType.name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1)
            .map(userType => {
                return (
                    <TimeEntryPermissionsRow
                        key={userType.id}
                        id={userType.id}
                        name={userType.name}
                        isChecked={this.props.store!.timeEntryPermissions.data.includes(userType.id)}
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
        TimeEntryPermissionsActions.getTimeEntryPermissions();
        // Set header
        HeaderActions.replaceMainHeaderContent({
            title: 'Time entry permissions',
            subTitle: 'Configuration',
        });
    };

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            searchString: event.currentTarget.value,
        });
    };
}

export default TimeEntryPermissions;
