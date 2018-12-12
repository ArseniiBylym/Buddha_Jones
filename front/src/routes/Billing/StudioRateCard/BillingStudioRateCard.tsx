import * as React from 'react';
import * as styles from './styles.scss';
import { HeaderActions, StudioRateCardActions } from 'actions/index';
import { AppState } from 'store/AllStores';
import { Section, SectionElement } from 'components/Section/index';
import { InputSearch } from 'components/Form/index';
import { inject, observer } from 'mobx-react';
import { history } from 'App';
import { ButtonAdd, ButtonBack } from 'components/Button';
import { match } from 'react-router';
import { Table } from 'components/Table';
import { LoadingSpinner } from 'components/Loaders';
import { action, computed, observable } from 'mobx';
import { StudioRateCard } from '../../../types/studioRateCard';
import { TableHeader } from '../../../components/Table';
import RateCardSelector from './RateCardSelector';
import BillingStudioRateCardRow from './BillingStudioRateCardRow';
import { ActivitiesActions, ProjectsCampaignsSpotsActions } from '../../../actions';
import { RemoveConfirmationModal } from '../../../components/RemoveConfiramtionModal';

interface Props {
    match: match<MatchParams>;
}

interface MatchParams {

}

@inject('store')
@observer
class BillingStudioRateCards extends React.Component<Props & AppState, {}> {
    @observable private searchString: string = '';
    @observable private addNew: boolean = false;
    @observable private isDeleteModalOpened: boolean = false;
    @observable private deleteActivityIsPending: boolean = false;
    @observable private activityToDelete: number | null = null;

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
            { title: 'Price', align: 'center' },
            { title: '', align: 'center' },
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
        ProjectsCampaignsSpotsActions.fetchTRT();
        ActivitiesActions.fetchActivityList(true);
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
                        this.getStudioRateCardData.rateCard.loading ?
                            BillingStudioRateCards.getTableWithLoadingSpinner()
                            :
                            <Table
                                header={BillingStudioRateCards.getTableHeaders()}
                                columnsWidths={['35%', '10%', '2%', '18%', '10%', '10%', '5%', '10%']}
                            >
                                {this.getTableRows()}
                                {
                                    this.addNew &&
                                    <BillingStudioRateCardRow
                                        card={{
                                            ratecardId: this.getStudioRateCardData.selectedRateCardId ? this.getStudioRateCardData.selectedRateCardId : 0,
                                            id: -1,
                                            activityId: -1,
                                            activityName: '',
                                            activityTypeId: 4,
                                            activityType: 'Rate Card',
                                            trtId: '',
                                            runtime: '',
                                            revisionInc: '',
                                            note: '',
                                            rate: 0,
                                        }}
                                        key="new-activity"
                                        isNew={true}
                                        onSaveDone={this.onSaveDone}
                                    />
                                }
                            </Table>
                    }
                    {
                        !this.addNew && !this.getStudioRateCardData.rateCard.loading &&
                        <ButtonAdd
                            className={styles.rateCardAddButton}
                            label="New Activity"
                            labelOnLeft={true}
                            float="right"
                            isWhite={true}
                            labelSize="small"
                            labelColor="black"
                            onClick={this.handleAdd}
                            adding={false}
                        />
                    }
                    <RemoveConfirmationModal
                        isActive={this.isDeleteModalOpened}
                        onConfirmationModalClose={this.closeDeleteActivityModal}
                        isErrorRemovingEntry={false}
                        isRemoving={this.deleteActivityIsPending}
                        onConfirmationSuccess={this.deleteActivity}
                        confirmationMessage="Are you sure you want to delete the activity?"
                    />
                </Section>
            </>
        );
    }

    private openDeleteActivityModal = (activityId: number) => {
        this.activityToDelete = activityId;
        this.isDeleteModalOpened = true;
    }

    private closeDeleteActivityModal = () => {
        this.isDeleteModalOpened = false;
        this.activityToDelete = null;
    }

    private handleAdd = () => {
        this.addNew = true;
    }

    private onSaveDone = () => {
        this.addNew = false;
    }

    private getTableRows(): JSX.Element[] {
        const { data } = this.getStudioRateCardData.rateCard;
        return Object.keys(data)
            .filter((key) => data[key].activityName.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1)
            .map((p) => <BillingStudioRateCardRow card={data[p]} key={data[p].activityId} openDeleteModal={this.openDeleteActivityModal}/>);
    }

    private getHeaderElements(): SectionElement[] {
        return [
            {
                key: 'rate-card-selector',
                element: <RateCardSelector {...this.props}/>,
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
    private deleteActivity = (): void => {
        this.deleteActivityIsPending = true;
        if (this.activityToDelete) {
            StudioRateCardActions.removeStudioRateCard(this.activityToDelete).then(() => {
                this.deleteActivityIsPending = false;
                this.closeDeleteActivityModal();
            });
        }
    }

    @action
    private setHeaderAndInitialData = (studioName?: string): void => {
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