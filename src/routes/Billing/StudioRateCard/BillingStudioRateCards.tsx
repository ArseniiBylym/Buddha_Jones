import * as React from 'react';
import * as styles from './styles.scss';
import { HeaderActions, StudiosActions } from 'actions/index';
import { AppState } from 'store/AllStores';
import { Section, SectionElement } from 'components/Section/index';
import { InputSearch } from 'components/Form/index';
import { inject, observer } from 'mobx-react';
import { history } from 'App';
import { ButtonBack, ButtonEdit } from 'components/Button';
import { match } from 'react-router';
import { Table, TableCell, TableRow } from 'components/Table';
import { LoadingSpinner } from 'components/Loaders';
import { action, computed, observable } from 'mobx';
import { Client, ClientsSearch } from '../../../types/clients';
import { Paragraph } from '../../../components/Content';
import { Pagination } from '../../../components/Pagination';

interface Props {
    match: match<MatchRouteParams>;
}

interface MatchRouteParams {
    readonly userTypeId: string;
}

@inject('store')
@observer
class BillingStudioRateCards extends React.Component<Props & AppState, {}> {
    @observable private currentPage: number = 1;
    @observable private perPage: number = 25;
    @observable private searchString: string = '';

    @computed
    private get getClientsBySearch(): ClientsSearch {
        return this.props.store!.studios.clientsBySearch;
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
                <Section
                    noSeparator={true}
                    title="Select Studio"
                    headerElements={this.getHeaderElements()}
                >
                    {
                        this.props.store!.users.isPageableUsersListLoading &&
                        BillingStudioRateCards.getTableWithLoadingSpinner()
                    }
                    {
                        this.getClientsBySearch.loading ?
                        BillingStudioRateCards.getTableWithLoadingSpinner()
                        :
                        <Table>{this.getTableRows()}</Table>
                    }
                    <Pagination
                        countPerPage={Number(this.perPage)}
                        countTotal={Number(this.getClientsBySearch.totalCount)}
                        currentPage={Number(this.currentPage)}
                        onPageChange={this.onChangePageNumberHandler}
                    />
                </Section>
            </>
        );
    }

    private getTableRows(): JSX.Element[] {
        const { clients } = this.getClientsBySearch;
        return clients.map(
            (client: Client) => {
                return (
                    <TableRow
                        key={client.id}
                        onClick={this.onTableEditButtonHandler(client)}
                        className={styles.clickable}
                    >
                        <TableCell align="left">
                            <Paragraph
                                type="brown"
                            >
                                {`#${client.id} - `}
                                <b>{client.name}</b>
                            </Paragraph>
                        </TableCell>
                        <TableCell align="right">
                            <ButtonEdit
                                onClick={this.onTableEditButtonHandler(client)}
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
                        label="Search Studios"
                        value={this.searchString}
                    />
                ),
            },
        ];
    }

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.searchString = event.currentTarget.value;
        this.currentPage = 1;
        this.searchClients();
    };

    private onChangePageNumberHandler = (page: number) => {
        this.currentPage = page;
        this.searchClients();
    }

    private onTableEditButtonHandler = (client: Client) => () => {
        history.push(`/portal/billing/studio-rate-card/${client.id}`);
    };

    private goBackToProjectBoardPermissionList = (): void => {
        history.push('/portal/billing/studio-rate-card');
    };

    @action
    private searchClients = (): void => {
        StudiosActions.searchClients( this.searchString, undefined, (this.currentPage - 1) * this.perPage, this.perPage );
    }

    private setHeaderAndInitialData = (): void => {
        this.searchClients();
        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'Studio rate card',
            null,
            null,
            null,
            [
                <ButtonBack
                    key="back-button"
                    onClick={this.goBackToProjectBoardPermissionList}
                    label="Back to studios list"
                />,
            ]
        ).then();
    };
}

export default BillingStudioRateCards;