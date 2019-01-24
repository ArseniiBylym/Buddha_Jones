import { SpotToBillFormActions } from 'actions';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { Modal } from 'components/Modals';
import { APIPath, FetchQuery } from 'fetch';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot, SpotBillRowRevision } from 'types/spotBilling';
import { StudioRateCardApiQuery, StudioRateCardFromApi } from 'types/studioRateCard';
import { BillSpotPreviewContent, FirstStageRow } from './BillSpotPreviewContent';

const s = require('./BillSpotPreview.css');

interface Props extends AppOnlyStoreState {
    billId: number;
    spots: SpotBillFormSpot[];
    unbilledProjectTimeEntries: BillTimeEntry[];
    unbilledProjectCampaignTimeEntries: BillTimeEntry[];
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
    @computed private get combinedUnbilledTimeEntries(): BillTimeEntry[] {
        return this.props.unbilledProjectTimeEntries.concat(this.props.unbilledProjectCampaignTimeEntries);
    }

    @computed
    private get firstStageRows(): FirstStageRow[] {
        return this.props.store!.spotToBillForm.firstStage.map(firstStage => {
            let spotName = '';
            let amount = 0;
            const revisions: SpotBillRowRevision[] = [];

            const spot = this.props.spots.find(iteratedSpot => iteratedSpot.spotId === firstStage.spotId);
            if (spot) {
                spotName = spot.spotName;
                amount = spot.firstRevisionCost || 0;
            }

            firstStage.timeEntriesIds.forEach(timeEntryId => {
                const unbilledTimeEntry = this.combinedUnbilledTimeEntries.find(
                    iteratedTimeEntry => iteratedTimeEntry.timeEntryId === timeEntryId
                );

                if (unbilledTimeEntry) {
                    if (unbilledTimeEntry.versionId) {
                        revisions.push({
                            versionId: unbilledTimeEntry.versionId,
                            versionName: unbilledTimeEntry.versionName || unbilledTimeEntry.versionId.toString(),
                        });
                    }
                } else {
                    let found: boolean = false;
                    if (spot) {
                        const spotTimeEntry = spot.timeEntries.find(
                            iteratedTimeEntry => iteratedTimeEntry.timeEntryId === timeEntryId
                        );
                        if (spotTimeEntry) {
                            if (spotTimeEntry.versionId) {
                                revisions.push({
                                    versionId: spotTimeEntry.versionId,
                                    versionName: spotTimeEntry.versionName || spotTimeEntry.versionId.toString(),
                                });
                            }

                            found = true;
                        }
                    }

                    if (found === false) {
                        this.props.spots.some(iteratedSpot => {
                            if (iteratedSpot.spotId === firstStage.spotId) {
                                return false;
                            }

                            const spotFound = iteratedSpot.timeEntries.find(
                                iteratedTimeEntry => iteratedTimeEntry.timeEntryId === timeEntryId
                            );
                            if (spotFound) {
                                if (spotFound.versionId) {
                                    revisions.push({
                                        versionId: spotFound.versionId,
                                        versionName: spotFound.versionName || spotFound.versionId.toString(),
                                    });
                                }
                                return true;
                            }

                            return false;
                        });
                    }
                }
            });

            const versionIds: number[] = [];

            return {
                spotId: firstStage.spotId,
                spotName: spotName,
                revisions: revisions.reduce((revs: SpotBillRowRevision[], revision) => {
                    if (versionIds.indexOf(revision.versionId) === -1) {
                        versionIds.push(revision.versionId);
                        revs.push(revision);
                    }

                    return revs;
                }, []),
                amount: amount,
            };
        });
    }

    @computed private get spotsInBill(): SpotBillFormSpot[] {
        return this.props.spots.filter(spot =>
            this.props.store!.spotToBillForm.spotsAddedToBill.some(id => id === spot.spotId)
        );
    }

    public render() {
        const { billId, projectName, campaignName, projectCampaignName, studioId, studioName, editable } = this.props;
        const { showBillPreview, activities, selectedRateCardId: selectedRateCard } = this.props.store!.spotToBillForm;

        return (
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
                <FetchQuery<StudioRateCardFromApi, StudioRateCardApiQuery>
                    skipFetching={studioId ? false : true}
                    dataExpiresInMiliseconds={60000}
                    getQueries={[
                        {
                            apiEndpoint: APIPath.STUDIO_RATE_CARD,
                            queryObject: {
                                studio_id: studioId || 0,
                                ...(selectedRateCard
                                    ? {
                                          ratecard_id: selectedRateCard,
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
                                projectName={projectName}
                                campaignName={campaignName}
                                projectCampaignName={projectCampaignName}
                                studioName={studioName}
                                spotsInBill={this.spotsInBill}
                                firstStageRows={this.firstStageRows}
                                editable={editable}
                                studioRateCards={studioRateCards.response.data.ratecardType}
                                selectedRateCard={studioRateCards.response.data.studioRateCard}
                            />
                        );
                    }}
                </FetchQuery>
            </Modal>
        );
    }

    private closeBillPreview = () => {
        SpotToBillFormActions.toggleBillPreview(false);
    };
}
