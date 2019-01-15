import { HeaderActions, StudiosActions } from 'actions/index';
import { InputSearch } from 'components/Form/index';
import { LoadingSpinner } from 'components/Loaders';
import { Section, SectionElement } from 'components/Section/index';
import { Table } from 'components/Table';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { AppState } from 'store/AllStores';
import { Pagination } from '../../../components/Pagination';
import { Client, ClientsSearch } from '../../../types/clients';
import BillingStudioRateCardsRow from './BillingStudioRateCardsRow';
import * as styles from './styles.scss';

interface Props {
    match: match<MatchRouteParams>;
}

interface State {
    currentPage: number;
    searchString: string;
}

interface MatchRouteParams {
    readonly userTypeId: string;
}

type BillingStudioRateCardsProps = Props & AppState;

@inject('store')
@observer
class BillingStudioRateCards extends React.Component<BillingStudioRateCardsProps, State> {
    constructor(props: BillingStudioRateCardsProps) {
        super(props);

        this.state = {
            currentPage: 1,
            searchString: '',
        };
    }

    private perPage: number = 25;

    private get getClientsBySearch(): ClientsSearch {
        return this.props.store!.studios.clientsBySearch;
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
        if (!this.props.store) {
            return null;
        }

        return (
            <>
                <Section noSeparator={true} title="Select Studio" headerElements={this.getHeaderElements()}>
                    {this.props.store!.users.isPageableUsersListLoading &&
                        BillingStudioRateCards.getTableWithLoadingSpinner()}
                    {this.getClientsBySearch.loading ? (
                        BillingStudioRateCards.getTableWithLoadingSpinner()
                    ) : (
                        <Table>{this.getTableRows()}</Table>
                    )}
                    <Pagination
                        countPerPage={Number(this.perPage)}
                        countTotal={Number(this.getClientsBySearch.totalCount)}
                        currentPage={this.state.currentPage}
                        onPageChange={this.onChangePageNumberHandler}
                    />
                </Section>
            </>
        );
    }

    private getTableRows(): JSX.Element[] {
        const { clients } = this.getClientsBySearch;
        return clients.map((client: Client) => <BillingStudioRateCardsRow client={client} key={client.id} />);
    }

    private getHeaderElements(): SectionElement[] {
        return [
            {
                key: 'search-filter',
                element: (
                    <InputSearch
                        onChange={this.onChangeSearchInputHandler}
                        label="Search Studios"
                        value={this.state.searchString}
                    />
                ),
            },
        ];
    }

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            currentPage: 1,
            searchString: event.currentTarget.value,
        });
        this.searchClients();
    };

    private onChangePageNumberHandler = (page: number) => {
        this.setState({
            currentPage: page,
        });
        this.searchClients();
    };

    private searchClients = (): void => {
        StudiosActions.searchClients(
            this.state.searchString,
            undefined,
            (this.state.currentPage - 1) * this.perPage,
            this.perPage
        );
    };

    private setHeaderAndInitialData = (): void => {
        this.searchClients();
        // Set header
        HeaderActions.setMainHeaderTitlesAndElements('Studio rate card', null, null, null, [], [], false).then();
    };
}

export default BillingStudioRateCards;
