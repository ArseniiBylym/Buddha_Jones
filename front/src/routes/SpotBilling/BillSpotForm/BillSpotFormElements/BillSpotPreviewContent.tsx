import { BillSpotPreviewRowEdit } from '.';
import { ButtonDelete, ButtonSend } from 'components/Button';
import { Paragraph } from 'components/Content';
import { BottomBar } from 'components/Layout';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { StringHandler } from 'helpers/StringHandler';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot, SpotBillRowRevision } from 'types/spotBilling';
import { StudioRateCardEntryFromApi, StudioRateCardTypeFromApi } from 'types/studioRateCard';

const s = require('./BillSpotPreviewContent.css');

export interface FirstStageRow {
    spotId: number;
    spotName: string;
    revisions: SpotBillRowRevision[];
    amount: number;
}

interface Props extends AppOnlyStoreState {
    projectName: string;
    campaignName: string;
    projectCampaignName: string | null;
    studioName: string;
    billTotal: number;
    spotsInBill: SpotBillFormSpot[];
    firstStageRows: FirstStageRow[];
    editable: boolean;
    studioRateCards: StudioRateCardTypeFromApi[];
    selectedRateCard: StudioRateCardEntryFromApi[];
}

@inject('store')
@observer
export class BillSpotPreviewContent extends React.Component<Props, {}> {
    public render() {
        const { activities } = this.props.store!.spotToBillForm;

        return (
            <React.Fragment>
                <div className={s.summary}>
                    <div className={s.left}>
                        {this.props.spotsInBill.length > 0 && (
                            <Paragraph className={s.spots}>
                                <span>{this.props.spotsInBill.length > 1 ? 'Spots: ' : 'Spot: '}</span>
                                {this.props.spotsInBill.map(spot => (
                                    <strong key={spot.spotId}>{spot.spotName}</strong>
                                ))}
                            </Paragraph>
                        )}

                        <Paragraph className={s.campaign}>
                            <span>Campaign: </span>
                            <strong>
                                {StringHandler.constructProjectCampaignName(
                                    this.props.campaignName,
                                    this.props.projectCampaignName
                                )}
                            </strong>
                            <span> — </span>
                            <strong>{this.props.projectName}</strong>
                        </Paragraph>
                    </div>

                    <Paragraph className={s.studio}>
                        <em>for </em>
                        <strong>{this.props.studioName}</strong>
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

                        {this.props.firstStageRows.map((firstStageRow, firstStageRowIndex) => (
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
                            const activityNumberingId = activityIndex + this.props.firstStageRows.length + 1;

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
                        <Paragraph>{'Total: ' + MoneyHandler.formatAsDollars(this.props.billTotal)}</Paragraph>
                    </div>
                </div>

                <BottomBar show={this.props.editable ? true : false} isWholeWidth={true}>
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
            </React.Fragment>
        );
    }

    private handleDeleteBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };

    private handleSubmitBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };
}
