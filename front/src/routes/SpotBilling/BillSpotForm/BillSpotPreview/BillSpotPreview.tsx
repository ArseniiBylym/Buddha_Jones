import { HeaderActions, SpotToBillFormActions } from 'actions';
import { history } from 'App';
import { ButtonBack } from 'components/Button';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Modal } from 'components/Modals';
import { Section } from 'components/Section';
import { APIPath, FetchQuery } from 'fetch';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { StudioRateCardApiQuery, StudioRateCardFromApi, StudioRateCardTypeFromApi } from 'types/studioRateCard';
import { BillSpotPreviewContent } from './BillSpotPreviewContent';
import { DropdownContainer, OptionsList } from 'components/Form';
import { Paragraph } from 'components/Content';

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

    componentDidMount() {
        HeaderActions.setMainHeaderElements([
            <ButtonBack key="back-to-bill-form" onClick={this.closeBillPreview} label="Close bill preview" />,
        ]);
    }

    public render() {
        const { billId, projectName, campaignName, projectCampaignName, studioId, studioName, editable } = this.props;
        const { selectedRateCardId } = this.props.store!.spotToBillForm;

        return (
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
                    if (studioRateCards.loading && studioRateCards.response === null) {
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
                        const rateCard = studioRateCards.response.data.ratecardType.find(
                            r => r.ratecardId === this.props.store!.spotToBillForm.selectedRateCardId
                        );

                        selectedStudioRateCard = rateCard || null;
                    }

                    return (
                        <React.Fragment>
                            <Section
                                noSeparator={true}
                                title={'Preview of bill #' + billId}
                                headerElements={[{
                                    key: 'studio-rate',
                                    element: studioRateCards.response.data.ratecardType.length > 0 && (
                                        <DropdownContainer
                                            ref={this.referenceStudioRateCardsDropdown}
                                            label="Rate card:"
                                            value={selectedStudioRateCard
                                            ? selectedStudioRateCard.ratecardName
                                                    : undefined
                                            }
                                        >
                                            <OptionsList
                                                onChange={this.handleRateCardChange}
                                                options={studioRateCards.response.data.ratecardType.map(rate => ({
                                                    value: rate.ratecardId,
                                                    label: rate.ratecardName,
                                                }))}
                                            />
                                        </DropdownContainer>
                                    ) || (
                                            <Paragraph type="dim" size="small">
                                                Studio has no rate cards defined
                                        </Paragraph>
                                        )
                                }]}
                            >
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
