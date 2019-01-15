import { SpotToBillFormActions } from 'actions';
import { ButtonDelete, ButtonSend } from 'components/Button';
import { Paragraph } from 'components/Content';
import { BottomBar } from 'components/Layout';
import { Modal } from 'components/Modals';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { StringHandler } from 'helpers/StringHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot, SpotBillRowRevision } from 'types/spotBilling';
import { BillSpotPreviewRowEdit } from './BillSpotPreviewRowEdit';

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
    studioName: string;
}

@inject('store')
@observer
export class BillSpotPreview extends React.Component<Props, {}> {
    @computed private get combinedUnbilledTimeEntries(): BillTimeEntry[] {
        return this.props.unbilledProjectTimeEntries.concat(this.props.unbilledProjectCampaignTimeEntries);
    }

    @computed
    private get firstStageRows(): Array<{
        spotId: number;
        spotName: string;
        revisions: SpotBillRowRevision[];
        amount: number;
    }> {
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

    @computed private get billTotal(): number {
        let totals: number = this.firstStageRows.reduce((total: number, firstStageRow) => {
            total += firstStageRow.amount;
            return total;
        }, 0);

        // TODO: Implement bill rate per activity
        totals += this.props.store!.spotToBillForm.activities.length * 1000;

        return totals;
    }

    public render() {
        const { billId, spots, projectName, campaignName, projectCampaignName, studioName, editable } = this.props;
        const { showBillPreview, activities } = this.props.store!.spotToBillForm;

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
                <div className={s.summary}>
                    <div className={s.left}>
                        {spots.length > 0 && (
                            <Paragraph className={s.spots}>
                                <span>{spots.length > 1 ? 'Spots: ' : 'Spot: '}</span>
                                {spots.map(spot => (
                                    <strong key={spot.spotId}>{spot.spotName}</strong>
                                ))}
                            </Paragraph>
                        )}

                        <Paragraph className={s.campaign}>
                            <span>Campaign: </span>
                            <strong>
                                {StringHandler.constructProjectCampaignName(campaignName, projectCampaignName)}
                            </strong>
                            <span> — </span>
                            <strong>{projectName}</strong>
                        </Paragraph>
                    </div>

                    <Paragraph className={s.studio}>
                        <em>for </em>
                        <strong>{studioName}</strong>
                    </Paragraph>
                </div>

                <div className={s.content}>
                    <div className={s.grid}>
                        <div className={s.gridHeader}>
                            <Paragraph type="dim" size="small" align="left">
                                ID
                            </Paragraph>
                            <Paragraph type="dim" size="small" align="left">
                                Activity
                            </Paragraph>
                            <Paragraph type="dim" size="small" align="left">
                                Spot
                            </Paragraph>
                            <Paragraph type="dim" size="small" align="left">
                                Revisions
                            </Paragraph>
                            <Paragraph type="dim" size="small" align="left">
                                Rate
                            </Paragraph>
                            <Paragraph type="dim" size="small" align="right">
                                Amount
                            </Paragraph>
                        </div>

                        {this.firstStageRows.map((firstStageRow, firstStageRowIndex) => (
                            <BillSpotPreviewRowEdit
                                key={firstStageRowIndex}
                                className={s.gridRow}
                                id={firstStageRowIndex + 1}
                                name={'First stage cost'}
                                note={null}
                                spots={firstStageRow.spotName}
                                revisions={firstStageRow.revisions.map(rev => rev.versionName).join(', ')}
                                billingRate={null}
                                amount={firstStageRow.amount}
                                editable={true}
                            />
                        ))}

                        {activities.map((activity, activityIndex) => {
                            const activityNumberingId = activityIndex + this.firstStageRows.length + 1;

                            return (
                                <BillSpotPreviewRowEdit
                                    key={activityNumberingId}
                                    className={s.gridRow}
                                    id={activityNumberingId}
                                    name={activity.name}
                                    note={activity.note}
                                    spots={activity.spot}
                                    revisions={activity.version}
                                    billingRate={{
                                        id: 1,
                                        name: 'A',
                                    }}
                                    amount={1000}
                                    editable={true}
                                />
                            );
                        })}
                    </div>

                    <div className={s.totals}>
                        <Paragraph>{'Total: ' + MoneyHandler.formatAsDollars(this.billTotal)}</Paragraph>
                    </div>
                </div>

                <BottomBar show={editable ? true : false} isWholeWidth={true}>
                    <div className={s.actions}>
                        <ButtonDelete
                            onClick={this.handleDeleteBill}
                            label="Delete this bill and reopen all its activities for billing"
                            labelColor="orange"
                            labelIsBold={true}
                            labelOnLeft={false}
                        />

                        <ButtonSend
                            onClick={this.handleSubmitBill}
                            label="Submit bill for review"
                            labelColor="green"
                            iconColor="green"
                        />
                    </div>
                </BottomBar>
            </Modal>
        );
    }

    private closeBillPreview = () => {
        SpotToBillFormActions.toggleBillPreview(false);
    };

    private handleDeleteBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };

    private handleSubmitBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };
}
