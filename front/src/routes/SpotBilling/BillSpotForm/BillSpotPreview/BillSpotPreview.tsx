import { HeaderActions, SpotToBillFormActions } from 'actions';
import { history } from 'App';
import { ButtonBack } from 'components/Button';
import { Paragraph } from 'components/Content';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { DropdownContainer, OptionsList } from 'components/Form';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Modal } from 'components/Modals';
import { Section } from 'components/Section';
import { APIPath, FetchQuery, FetchQueryMock } from 'fetch';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, BillTypesFromApi, SpotBillFormSpot } from 'types/spotBilling';
import { StudioRateCardApiQuery, StudioRateCardFromApi, StudioRateCardTypeFromApi } from 'types/studioRateCard';
import { BillSpotPreviewContent } from './BillSpotPreviewContent';
import { BillSpotPreviewType } from './BillSpotPreviewType';

const s = require('./BillSpotPreview.css');

interface Props extends AppOnlyStoreState {
    billId: number;
    spots: SpotBillFormSpot[];
    unbilledTimeEntries: BillTimeEntry[];
    editable: boolean;
    projectName: string;
    campaignName: string;
    projectCampaignName: string | null;
    projectCampaignId: number;
    studioId: number;
    studioName: string;
}

@inject('store')
@observer
export class BillSpotPreview extends React.Component<Props, {}> {
    private studioRateCardsDropdown: DropdownContainer | null = null;

    @observable private isDeleteConfirmationOpen: boolean = false;

    @computed private get spotsInBill(): SpotBillFormSpot[] {
        return this.props.spots.filter(spot =>
            this.props.store!.spotToBillForm.spotsIdsAddedToBill.some(id => id === spot.spotId)
        );
    }

    @computed
    private get billIsEmpty(): boolean {
        return this.props.store!.spotToBillForm.rows.length <= 0;
    }

    componentDidMount() {
        HeaderActions.setMainHeaderElements([
            <ButtonBack
                key="back-to-bill-form"
                onClick={this.closeBillPreview}
                label="Add more activities to the bill"
            />,
        ]);

        if (this.billIsEmpty) {
            history.push('/portal/bill-spot-form/' + this.props.billId);
        }
    }

    public render() {
        const { billId, projectName, campaignName, projectCampaignName, studioId, studioName, editable } = this.props;
        const { selectedRateCardId } = this.props.store!.spotToBillForm;

        return (
            <FetchQueryMock<BillTypesFromApi>
                mockResponses={[
                    {
                        status: 1,
                        message: 'Success',
                        data: [
                            {
                                id: 1,
                                name: 'Creative Fee',
                                note:
                                    `Client requests Buddha Jones create and produce the following:

                            Additional revisions will be billed separately, as will overtime, music licensing ` +
                                    `and / or composition, stock footage fees, graphics creation, graphics finishing, finishing costs ` +
                                    `and narration fees(plus 10% handling charge).Additional charges may be billed if client ` +
                                    `requests extensive dailies usage.`,
                            },
                            {
                                id: 2,
                                name: 'Revisions',
                                note: `Client requests the following revisions:`,
                            },
                            {
                                id: 3,
                                name: 'Finish',
                                note:
                                    `Client requests Buddha Jones provide finishing materials for the following:

                            Based on approved concepts, Buddha Jones is to provide all materials required (EDL's, AAF's, ` +
                                    `unmatted offline reference overcut with most current picture and final rendered graphics) to finish.`,
                            },
                            {
                                id: 4,
                                name: 'Graphic Design',
                                note: `Client requests Buddha Jones design and create graphics for use in the following:`,
                            },
                            {
                                id: 5,
                                name: 'Graphic Finish',
                                note: `Client requests Buddha Jones provide final rendered graphics for use in the following:`,
                            },
                            {
                                id: 6,
                                name: 'Other',
                                note: `Client requests Buddha Jones provide the following:`,
                            },
                            {
                                id: 7,
                                name: 'Outside Expense',
                                note: `Client requests Buddha Jones provide the following:`,
                            },
                            {
                                id: 8,
                                name: 'Narration',
                                note: `Client requests Buddha Jones read a narrator for use in the following:`,
                            },
                        ],
                    },
                ]}
            >
                {([billTypes]) => (
                    <FetchQuery<StudioRateCardFromApi, StudioRateCardApiQuery>
                        skipFetching={studioId ? false : true}
                        dataExpiresInMiliseconds={60000}
                        getQueries={[
                            {
                                apiEndpoint: APIPath.STUDIO_RATE_CARD,
                                queryObject: {
                                    studio_id: studioId || 0,
                                    ...(selectedRateCardId
                                        ? {
                                              ratecard_id: selectedRateCardId,
                                          }
                                        : {}),
                                },
                            },
                        ]}
                    >
                        {([studioRateCards]) => {
                            if (
                                (billTypes.loading && billTypes.response === null) ||
                                (studioRateCards.loading && studioRateCards.response === null)
                            ) {
                                return (
                                    <LoadingShade
                                        className={s.loader}
                                        contentCentered={true}
                                        contentCenteredToTop={true}
                                        isStatic={true}
                                        background="transparent"
                                    >
                                        <LoadingSpinner />
                                    </LoadingShade>
                                );
                            }

                            if (billTypes.fetchError || billTypes.response === null) {
                                return (
                                    <DataFetchError
                                        errorLabel="Could not fetch bill types"
                                        onRefetch={billTypes.retry}
                                    />
                                );
                            }

                            if (studioRateCards.fetchError || studioRateCards.response === null) {
                                return (
                                    <DataFetchError
                                        errorLabel="Could not fetch studio rate card"
                                        onRefetch={studioRateCards.retry}
                                    />
                                );
                            }

                            let selectedStudioRateCard: StudioRateCardTypeFromApi | null = null;
                            if (this.props.store!.spotToBillForm.selectedRateCardId) {
                                selectedStudioRateCard =
                                    studioRateCards.response.data.ratecardType.find(
                                        r => r.ratecardId === this.props.store!.spotToBillForm.selectedRateCardId
                                    ) || null;
                            }

                            return (
                                <React.Fragment>
                                    <Section
                                        noSeparator={true}
                                        title={'Preview of bill #' + billId}
                                        headerElements={[
                                            {
                                                key: 'studio-rate',
                                                element: (studioRateCards.response.data.ratecardType.length > 0 && (
                                                    <DropdownContainer
                                                        ref={this.referenceStudioRateCardsDropdown}
                                                        label="Rate card:"
                                                        value={
                                                            selectedStudioRateCard
                                                                ? selectedStudioRateCard.ratecardName
                                                                : undefined
                                                        }
                                                    >
                                                        <OptionsList
                                                            onChange={this.handleRateCardChange}
                                                            options={studioRateCards.response.data.ratecardType.map(
                                                                rate => ({
                                                                    value: rate.ratecardId,
                                                                    label: rate.ratecardName,
                                                                })
                                                            )}
                                                        />
                                                    </DropdownContainer>
                                                )) || (
                                                    <Paragraph type="dim" size="small">
                                                        Studio has no rate cards defined
                                                    </Paragraph>
                                                ),
                                            },
                                        ]}
                                    >
                                        <BillSpotPreviewType billTypes={billTypes.response.data} />

                                        <BillSpotPreviewContent
                                            onDeleteBill={this.handleBillDeleteConfirmation}
                                            projectName={projectName}
                                            campaignName={campaignName}
                                            projectCampaignName={projectCampaignName}
                                            studioName={studioName}
                                            spotsInBill={this.spotsInBill}
                                            editable={editable}
                                            studioRateCards={studioRateCards.response.data.ratecardType}
                                            selectedRateCard={studioRateCards.response.data.studioRateCard}
                                            selectedStudioRateCard={selectedStudioRateCard}
                                        />
                                    </Section>

                                    {/** Verify bill deletion modal */}
                                    <Modal
                                        show={this.isDeleteConfirmationOpen}
                                        onClose={this.handleBillDeleteModalClose}
                                        closeButton={true}
                                        closeButtonLabel="No, don't delete this bill"
                                        type="alert"
                                        topBarTitle="Delete bill"
                                        title="Are you sure you want to delete this bill irreversibly?"
                                        actions={[
                                            {
                                                closeOnClick: true,
                                                label: 'Yes, please delete',
                                                onClick: this.handleBillDeletion,
                                                type: 'alert',
                                            },
                                        ]}
                                    />
                                </React.Fragment>
                            );
                        }}
                    </FetchQuery>
                )}
            </FetchQueryMock>
        );
    }

    private referenceStudioRateCardsDropdown = (ref: DropdownContainer) => (this.studioRateCardsDropdown = ref);

    private handleRateCardChange = (option: { value: number; label: string }) => {
        SpotToBillFormActions.changeSelectedRateCard(option.value);

        if (this.studioRateCardsDropdown) {
            this.studioRateCardsDropdown.closeDropdown();
        }
    };

    @action
    private handleBillDeleteConfirmation = () => {
        this.isDeleteConfirmationOpen = true;
    };

    @action
    private handleBillDeleteModalClose = () => {
        this.isDeleteConfirmationOpen = false;
    };

    private handleBillDeletion = () => {
        // TODO: Delete bill
    };

    private closeBillPreview = () => {
        history.push('/portal/bill-spot-form/' + this.props.billId);
    };
}
