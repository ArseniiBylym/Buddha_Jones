import { SpotToBillFormActions } from 'actions';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Modal } from 'components/Modals';
import { APIPath, FetchQuery } from 'fetch';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { StudioRateCardApiQuery, StudioRateCardFromApi } from 'types/studioRateCard';
import { BillSpotPreviewContent } from './BillSpotPreviewContent';

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
    @observable private isDeleteConfirmationOpen: boolean = false;

    @computed private get spotsInBill(): SpotBillFormSpot[] {
        return this.props.spots.filter(spot =>
            this.props.store!.spotToBillForm.spotsIdsAddedToBill.some(id => id === spot.spotId)
        );
    }

    public render() {
        const { billId, projectName, campaignName, projectCampaignName, studioId, studioName, editable } = this.props;
        const { showBillPreview, selectedRateCardId } = this.props.store!.spotToBillForm;

        return (
            <React.Fragment>
                {/** Bill content modal */}
                <Modal
                    show={showBillPreview}
                    closeButton={true}
                    closeButtonLabel="Close preview"
                    onClose={this.closeBillPreview}
                    noPadding={true}
                    size="content-wide"
                    forceLongContent={true}
                    topBarTitle={'Preview of bill #' + billId}
                    classNameForTopBar={s.topBar}
                >
                    {/** Get studio's rate card values based on selected rate card */}
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

                            return (
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
                                />
                            );
                        }}
                    </FetchQuery>
                </Modal>

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
    }

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
        SpotToBillFormActions.toggleBillPreview(false);
    };
}
