import { BillSpotPreviewRowEdit } from '.';
import { SpotToBillFormActions } from 'actions';
import { ButtonDelete, ButtonSend } from 'components/Button';
import { Paragraph } from 'components/Content';
import { DropdownContainer, OptionsList } from 'components/Form';
import { BottomBar } from 'components/Layout';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { StringHandler } from 'helpers/StringHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormSpot, SpotBillRowRevision } from 'types/spotBilling';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
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
    spotsInBill: SpotBillFormSpot[];
    firstStageRows: FirstStageRow[];
    editable: boolean;
    studioRateCards: StudioRateCardTypeFromApi[];
    selectedRateCard: StudioRateCardEntryFromApi[];
}

@inject('store')
@observer
export class BillSpotPreviewContent extends React.Component<Props, {}> {
    private studioRateCardsDropdown: DropdownContainer | null = null;

    @computed
    private get selectedStudioRateCard(): StudioRateCardTypeFromApi | null {
        if (!this.props.store!.spotToBillForm.selectedRateCardId) {
            return null;
        }

        const rateCard = this.props.studioRateCards.find(
            r => r.ratecardId === this.props.store!.spotToBillForm.selectedRateCardId
        );

        return rateCard || null;
    }

    @computed
    private get selectedFlatRates(): StudioRateCardEntryFromApi[] {
        return this.props.selectedRateCard.filter(rate => rate.activityTypeId === 4);
    }

    @computed private get billTotal(): number {
        // Start with iterating first stage rows
        let totals: number = this.props.firstStageRows.reduce((total: number, firstStageRow) => {
            total += firstStageRow.amount;
            return total;
        }, 0);

        // Iterate all activities in bill and calculate it based on selected rate
        if (this.selectedStudioRateCard) {
            totals += this.props.store!.spotToBillForm.activities.reduce((total: number, activity) => {
                // For flat rate
                if (activity.rateType === SpotBillActivityRateType.Flat) {
                    const flatRate = activity.rateFlatId
                        ? this.selectedFlatRates.find(rate => rate.id === activity.rateFlatId)
                        : undefined;

                    total += flatRate && flatRate.rate ? flatRate.rate : 0;

                    return total;
                }

                // For hourly
                if (activity.rateType === SpotBillActivityRateType.Hourly) {
                    total += SpotToBillFormActions.calculateHourlyActivityTotals(activity, this.props.selectedRateCard);
                }

                return total;
            }, 0);
        }

        return totals;
    }

    public componentDidMount() {
        if (!this.selectedStudioRateCard && this.props.studioRateCards.length > 0) {
            SpotToBillFormActions.changeSelectedRateCard(this.props.studioRateCards[0].ratecardId);
        }
    }

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

                    <div className={s.right}>
                        <Paragraph className={s.studio}>
                            <em>for </em>
                            <strong>{this.props.studioName}</strong>
                        </Paragraph>

                        <div className={s.studioRateCard}>
                            {(this.props.studioRateCards.length > 0 && (
                                <DropdownContainer
                                    ref={this.referenceStudioRateCardsDropdown}
                                    label="Rate card:"
                                    value={
                                        this.selectedStudioRateCard
                                            ? this.selectedStudioRateCard.ratecardName
                                            : undefined
                                    }
                                >
                                    <OptionsList
                                        onChange={this.handleRateCardChange}
                                        options={this.props.studioRateCards.map(rate => ({
                                            value: rate.ratecardId,
                                            label: rate.ratecardName,
                                        }))}
                                    />
                                </DropdownContainer>
                            )) || (
                                <Paragraph type="dim" size="small">
                                    Studio has no rate cards defined
                                </Paragraph>
                            )}
                        </div>
                    </div>
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
                            <Paragraph type="dim" size="small" align="right" />
                            <Paragraph type="dim" size="small" align="right">
                                Amount
                            </Paragraph>
                        </div>

                        {this.props.firstStageRows.map((firstStageRow, firstStageRowIndex) => (
                            <BillSpotPreviewRowEdit
                                key={firstStageRowIndex}
                                className={s.gridRow}
                                id={firstStageRowIndex + 1}
                                index={firstStageRowIndex}
                                name={'First stage cost'}
                                note={null}
                                spots={firstStageRow.spotName}
                                revisions={firstStageRow.revisions.map(rev => rev.versionName).join(', ')}
                                amount={firstStageRow.amount}
                                editable={true}
                                flatRates={this.selectedFlatRates}
                                hourlyActivity={null}
                                rateType={SpotBillActivityRateType.FirstStage}
                                rateFlatId={null}
                                studioFlatRates={this.selectedFlatRates}
                                selectedRateCard={this.props.selectedRateCard}
                            />
                        ))}

                        {activities.map((activity, activityIndex) => {
                            const activityNumberingId = activityIndex + this.props.firstStageRows.length + 1;

                            return (
                                <BillSpotPreviewRowEdit
                                    key={activityNumberingId}
                                    className={s.gridRow}
                                    id={activityNumberingId}
                                    index={activityIndex}
                                    name={activity.name}
                                    note={activity.note}
                                    spots={activity.spot}
                                    revisions={activity.version}
                                    amount={1000}
                                    editable={true}
                                    flatRates={this.selectedFlatRates}
                                    hourlyActivity={activity}
                                    rateType={activity.rateType}
                                    rateFlatId={activity.rateFlatId}
                                    studioFlatRates={this.selectedFlatRates}
                                    selectedRateCard={this.props.selectedRateCard}
                                />
                            );
                        })}
                    </div>

                    <div className={s.totals}>
                        <Paragraph>
                            {this.props.selectedRateCard
                                ? 'Total: ' + MoneyHandler.formatAsDollars(this.billTotal)
                                : 'No rate card selected'}
                        </Paragraph>
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

    private referenceStudioRateCardsDropdown = (ref: DropdownContainer) => (this.studioRateCardsDropdown = ref);

    private handleRateCardChange = (option: { value: number; label: string }) => {
        SpotToBillFormActions.changeSelectedRateCard(option.value);

        if (this.studioRateCardsDropdown) {
            this.studioRateCardsDropdown.closeDropdown();
        }
    };

    private handleDeleteBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };

    private handleSubmitBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };
}
