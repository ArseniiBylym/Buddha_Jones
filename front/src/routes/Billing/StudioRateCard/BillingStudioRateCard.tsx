import * as React from 'react';
import * as styles from './styles.scss';
import { HeaderActions, StudioRateCardActions } from 'actions/index';
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
import { RateCard, StudioRateCard } from '../../../types/studioRateCard';
import { TableHeader } from '../../../components/Table';
import RateCardSelector from './RateCardSelector';

interface Props {
    match: match<MatchRouteParams>;
}

interface MatchRouteParams {
    readonly userTypeId: string;
}

@inject('store')
@observer
class BillingStudioRateCards extends React.Component<Props & AppState, {}> {
    @observable private searchString: string = '';

    @computed
    private get getStudioRateCardData(): StudioRateCard {
        return this.props.store!.studioRateCard;
    }

    private static getTableWithLoadingSpinner(): JSX.Element {
        return (
            <div className={styles.loadingSpinnerBlock}>
                <LoadingSpinner size={64}/>
            </div>
        );
    }

    private static getTableHeaders(): TableHeader[] {
        return [
            { title: 'Activity', align: 'left' },
            { title: 'TRT', align: 'center' },
            { title: 'Revisions', align: 'center' },
            { title: 'Note', align: 'center' },
            { title: '', align: 'center' },
            { title: 'Price', align: 'center' },
            { title: 'Type', align: 'right' },
        ];
    }

    public componentDidMount(): void {
        const studioId = this.props.match.params['studio_id'];
        const selectedRateCardId = this.props.match.params['rate_card_id'];

        if (studioId) {
            this.setStudioId(studioId);
        }

        if (selectedRateCardId) {
            this.setSelectedRateCardId(selectedRateCardId);
        }

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
                    title="Activities pricing"
                    headerElements={this.getHeaderElements()}
                >
                    {
                        this.props.store!.users.isPageableUsersListLoading &&
                        BillingStudioRateCards.getTableWithLoadingSpinner()
                    }
                    {
                        this.getStudioRateCardData.loading ?
                            BillingStudioRateCards.getTableWithLoadingSpinner()
                            :
                            <Table
                                header={BillingStudioRateCards.getTableHeaders()}
                                columnsWidths={['40%', '5%', '5%', '10%', '10%', '5%', '20%', '10%']}
                            >
                                {this.getTableRows()}
                            </Table>
                    }
                </Section>
            </>
        );
    }

    private getTableRows(): JSX.Element[] {
        const { data } = this.getStudioRateCardData.rateCard;
        return Object.keys(data).map(
            (key) => {
                const card: RateCard = data[key];
                return (
                    <TableRow
                        key={card.activityId}
                        className={styles.clickable}
                    >
                        <TableCell align="left">
                            <b>{card.activityName}</b>
                        </TableCell>
                        <TableCell align="center">
                            {card.runtime}
                        </TableCell>
                        <TableCell align="center">
                            {card.revisionInc}
                        </TableCell>
                        <TableCell align="center">
                            {card.note}
                        </TableCell>
                        <TableCell align="center">
                            <ButtonEdit
                                onClick={this.onTableEditButtonHandler(card)}
                                label=""
                                labelOnLeft={false}
                                float="none"
                            />
                        </TableCell>
                        <TableCell align="center">
                            {card.rate}
                        </TableCell>
                        <TableCell align="right">
                            {card.activityType}
                        </TableCell>
                    </TableRow>
                );
            }
        );
    }

    private getHeaderElements(): SectionElement[] {
        return [
            {
                key: 'rate-card-selector',
                element: <RateCardSelector/>,
                minWidth: 300
            },
            {
                key: 'search-filter',
                element: (
                    <InputSearch
                        onChange={this.onChangeSearchInputHandler}
                        label="Search Activities"
                        value={this.searchString}
                    />
                ),
            },
        ];
    }

    private onChangeSearchInputHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.searchString = event.currentTarget.value;
    };

    private onTableEditButtonHandler = (rateCard: RateCard) => () => {
        // edit
    };

    private goBackToProjectBoardPermissionList = (): void => {
        history.push('/portal/billing/studio-rate-card');
    };

    @action
    private setStudioId = (id: number): void => {
        StudioRateCardActions.setStudioId(id);
        this.getStudioRateCardTypes();
    };

    @action
    private setSelectedRateCardId = (id: number): void => {
        StudioRateCardActions.setSelectedRateCardId(id);
        this.getStudioRateCard();
    };

    @action
    private getStudioRateCardTypes = (): void => {
        StudioRateCardActions.getStudioRateCardTypes().then(() => {
            if (this.getStudioRateCardData.selectedRateCardId && !this.props.match.params['rate_card_id']) {
                history.push(`${this.props.match.url}/${this.getStudioRateCardData.selectedRateCardId}`);
            }
            StudioRateCardActions.getStudioRateCard().then(() => {
                this.setHeaderAndInitialData(this.getStudioRateCardData.name);
            });
        });
    };

    @action
    private getStudioRateCard = (): void => {
        StudioRateCardActions.getStudioRateCard();
    };

    @action
    private setHeaderAndInitialData = (studioName?: string): void => {
        // this.getClient();
        // this.getStudioRateCard();
        // Set header
        HeaderActions.setMainHeaderTitlesAndElements(
            'Studio rate card',
            studioName ? studioName : 'Loading...',
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