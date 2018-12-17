import { HeaderActions, StudioRateCardActions } from 'actions/index';
import { history } from 'App';
import {
    ButtonAdd,
    ButtonBack,
    ButtonClose,
    ButtonEdit,
    ButtonSave
    } from 'components/Button';
import { InputSearch, TextArea } from 'components/Form/index';
import { LoadingSpinner } from 'components/Loaders';
import { Section, SectionElement } from 'components/Section/index';
import { Table } from 'components/Table';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { AppState } from 'store/AllStores';
import { ActivitiesActions, ProjectsCampaignsSpotsActions } from '../../../actions';
import { RemoveConfirmationModal } from '../../../components/RemoveConfiramtionModal';
import { TableHeader } from '../../../components/Table';
import { StudioRateCard } from '../../../types/studioRateCard';
import BillingStudioRateCardRow from './BillingStudioRateCardRow';
import RateCardSelector from './RateCardSelector';
import * as styles from './styles.scss';

interface Props {
    match: match<MatchParams>;
}

interface MatchParams {}

@inject('store')
@observer
class BillingStudioRateCards extends React.Component<Props & AppState, {}> {
    @observable private searchString: string = '';
    @observable private addNew: boolean = false;
    @observable private isDeleteModalOpened: boolean = false;
    @observable private deleteActivityIsPending: boolean = false;
    @observable private activityToDelete: number | null = null;

    @observable private noteEditMode: boolean = false;
    @observable private noteSaving: boolean = false;
    @observable private noteValue: string = '';

    @computed
    private get getStudioRateCardData(): StudioRateCard {
        return this.props.store!.studioRateCard;
    }

    private static getTableWithLoadingSpinner(): JSX.Element {
        return (
            <div className={styles.loadingSpinnerBlock}>
                <LoadingSpinner size={64} />
            </div>
        );
    }

    private static getTableHeaders(): TableHeader[] {
        return [
            { title: 'Activity', align: 'left' },
            { title: 'TRT', align: 'right' },
            { title: 'Revisions', align: 'center' },
            { title: 'Note', align: 'center' },
            { title: 'Rate', align: 'right' },
            { title: '', align: 'center' },
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
                <Section noSeparator={true} title="Activities pricing" headerElements={this.getHeaderElements()}>
                    {this.getStudioRateCardData.rateCard.loading ? (
                        BillingStudioRateCards.getTableWithLoadingSpinner()
                    ) : (
                        <Table
                            header={BillingStudioRateCards.getTableHeaders()}
                            columnsWidths={['35%', '10%', '2%', '18%', '10%', '10%', '5%', '10%']}
                        >
                            {this.getTableRows()}
                            {this.addNew && (
                                <BillingStudioRateCardRow
                                    card={{
                                        ratecardId: this.getStudioRateCardData.selectedRateCardId
                                            ? this.getStudioRateCardData.selectedRateCardId
                                            : 0,
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
                            )}
                        </Table>
                    )}
                    {!this.getStudioRateCardData.rateCard.loading && (
                        <div className={styles.rateCardNoteWrapper}>
                            <h3 className={styles.noteLabel}>Additional Rate Card Notes</h3>
                            <div className={styles.rateCardNote}>
                                {this.noteEditMode ? (
                                    <TextArea
                                        label="Note"
                                        value={this.noteValue}
                                        onChange={this.handleNoteChange}
                                        className={styles.noteTextAreaWrapperStyles}
                                        fieldClassName={styles.noteTextAreaStyles}
                                    />
                                ) : this.getStudioRateCardData.selectedRateCardNote ? (
                                    this.getStudioRateCardData.selectedRateCardNote
                                ) : (
                                    'No Notes Found'
                                )}
                                {this.noteEditMode ? (
                                    <div className={styles.rateCardNoteActions}>
                                        <ButtonSave
                                            label="Save"
                                            labelColor="green"
                                            isSaving={this.noteSaving}
                                            savingLabel="Saving"
                                            onClick={this.handleSaveNote}
                                        />
                                        <ButtonClose
                                            className={styles.rowCancelButton}
                                            label="Close"
                                            onClick={this.exitNoteEditMode}
                                        />
                                    </div>
                                ) : (
                                    <div className={styles.rateCardNoteActions}>
                                        <ButtonEdit
                                            className={styles.rowEditButton}
                                            onClick={this.enterNoteEditMode}
                                            label="Edit"
                                            labelOnLeft={true}
                                            float="none"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {!this.addNew && !this.getStudioRateCardData.rateCard.loading && (
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
                    )}
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

    private enterNoteEditMode = () => {
        this.noteValue = this.getStudioRateCardData.selectedRateCardNote
            ? this.getStudioRateCardData.selectedRateCardNote
            : '';
        this.noteEditMode = true;
    };

    private exitNoteEditMode = () => {
        this.noteEditMode = false;
    };

    private handleNoteChange = e => {
        this.noteValue = e.target.value;
    };

    private handleSaveNote = () => {
        this.noteSaving = true;
        StudioRateCardActions.saveRateCardType(this.getStudioRateCardData.selectedRateCardLabel, this.noteValue).then(
            () => {
                this.noteSaving = false;
                this.exitNoteEditMode();
            }
        );
    };

    private openDeleteActivityModal = (activityId: number) => {
        this.activityToDelete = activityId;
        this.isDeleteModalOpened = true;
    };

    private closeDeleteActivityModal = () => {
        this.isDeleteModalOpened = false;
        this.activityToDelete = null;
    };

    private handleAdd = () => {
        this.addNew = true;
    };

    private onSaveDone = () => {
        this.addNew = false;
    };

    private getTableRows(): JSX.Element[] {
        const { data } = this.getStudioRateCardData.rateCard;
        return Object.keys(data)
            .filter(key => data[key].activityName.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1)
            .map(p => (
                <BillingStudioRateCardRow card={data[p]} key={p} openDeleteModal={this.openDeleteActivityModal} />
            ));
    }

    private getHeaderElements(): SectionElement[] {
        return [
            {
                key: 'rate-card-selector',
                element: <RateCardSelector {...this.props} />,
                minWidth: 300,
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
    };

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
