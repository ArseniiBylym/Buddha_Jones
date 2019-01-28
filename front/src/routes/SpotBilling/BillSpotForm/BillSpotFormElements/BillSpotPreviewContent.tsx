import { BillSpotPreviewRowEdit } from '.';
import { toFixed } from 'accounting';
import { SpotToBillFormActions } from 'actions';
import {
    ButtonAdd,
    ButtonDelete,
    ButtonEdit,
    ButtonSave,
    ButtonSend
    } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Counter, DropdownContainer, OptionsList } from 'components/Form';
import { BottomBar } from 'components/Layout';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { StringHandler } from 'helpers/StringHandler';
import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillDiscount, SpotBillFormSpot, SpotBillRowRevision } from 'types/spotBilling';
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
    private discountTypeDropdown: DropdownContainer | null = null;

    @observable private isDiscountInEditMode: boolean = false;
    @observable private discountForm: SpotBillDiscount = {
        isFixed: true,
        value: 0,
    };

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

    @computed
    private get hasDiscount(): boolean {
        return this.props.store!.spotToBillForm.discount.value > 0;
    }

    @computed
    private get discount(): SpotBillDiscount {
        if (this.isDiscountInEditMode) {
            return this.discountForm;
        }

        return this.props.store!.spotToBillForm.discount;
    }

    @computed
    private get discountValue(): number {
        if (this.hasDiscount === false) {
            return 0;
        }

        if (this.discount.isFixed) {
            return this.discount.value;
        }

        return (this.billTotal * this.discount.value) / 100;
    }

    @computed
    private get billTotalAfterDiscount(): number {
        const total = this.billTotal - this.discountValue;
        return total || 0;
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
                                Version
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
                        <div className={s.left}>
                            {(this.isDiscountInEditMode && (
                                <div className={s.discountForm}>
                                    <DropdownContainer
                                        ref={this.referenceDiscountTypeDropdown}
                                        label="Discount: "
                                        value={this.discountForm.isFixed ? 'Flat' : 'Percentage'}
                                    >
                                        <OptionsList
                                            onChange={this.handleDiscountTypeChange}
                                            options={[
                                                { value: true, label: 'Flat' },
                                                { value: false, label: 'Percentage' },
                                            ]}
                                            value={this.discountForm.isFixed ? true : false}
                                        />
                                    </DropdownContainer>

                                    <Counter
                                        onChange={this.handleDiscountValueChange}
                                        decimals={2}
                                        label="Amount"
                                        maxValue={this.discountForm.isFixed ? this.billTotal : 100}
                                        minValue={0}
                                        fieldMaxWidth={128}
                                        incrementBy={this.discountForm.isFixed ? 100 : 5}
                                        multipleOf={0.01}
                                        readOnlyTextBeforeValue={this.discountForm.isFixed ? '$' : ''}
                                        readOnlyTextAfterValue={this.discountForm.isFixed ? '' : '%'}
                                        value={this.discountForm.value}
                                        showPlusMinus={true}
                                    />

                                    <ButtonSave
                                        onClick={this.handleSaveDiscount}
                                        isSaving={false}
                                        label="Apply discount"
                                    />
                                </div>
                            )) ||
                                (this.hasDiscount && (
                                    <ButtonEdit onClick={this.handleEditDiscount} label="Modify discount" />
                                )) || <ButtonAdd onClick={this.handleEditDiscount} label="Add discount" />}
                        </div>

                        <div className={s.right}>
                            {this.hasDiscount && (
                                <Paragraph>
                                    {(this.discount.isFixed ? 'Flat' : 'Percentage') + ' discount: '}
                                    <strong>
                                        {this.discount.isFixed
                                            ? MoneyHandler.formatAsDollars(this.discount.value)
                                            : toFixed(this.discount.value, 2) + '%'}
                                    </strong>
                                </Paragraph>
                            )}

                            {(this.props.selectedRateCard.length <= 0 && (
                                <Paragraph>No rate card selected</Paragraph>
                            )) ||
                                (this.hasDiscount && (
                                    <div className={s.subTotals}>
                                        <Paragraph>
                                            {'Sub total: '}
                                            <strong>{MoneyHandler.formatAsDollars(this.billTotal)}</strong>
                                        </Paragraph>
                                        <Paragraph>
                                            {'Total: '}
                                            <strong>{MoneyHandler.formatAsDollars(this.billTotalAfterDiscount)}</strong>
                                        </Paragraph>
                                    </div>
                                )) || (
                                    <Paragraph>
                                        {'Total: '}
                                        <strong>{MoneyHandler.formatAsDollars(this.billTotalAfterDiscount)}</strong>
                                    </Paragraph>
                                )}
                        </div>
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
    private referenceDiscountTypeDropdown = (ref: DropdownContainer) => (this.discountTypeDropdown = ref);

    private handleRateCardChange = (option: { value: number; label: string }) => {
        SpotToBillFormActions.changeSelectedRateCard(option.value);

        if (this.studioRateCardsDropdown) {
            this.studioRateCardsDropdown.closeDropdown();
        }
    };

    private handleEditDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.discountForm = {
            isFixed: this.props.store!.spotToBillForm.discount.isFixed,
            value: this.props.store!.spotToBillForm.discount.value,
        };

        this.isDiscountInEditMode = true;
    };

    private handleSaveDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
        SpotToBillFormActions.changeBillDiscount(this.discountForm);

        this.isDiscountInEditMode = false;
    };

    private handleDiscountTypeChange = (option: { value: boolean; label: string }) => {
        this.discountForm.isFixed = option.value ? true : false;

        if (this.discountTypeDropdown) {
            this.discountTypeDropdown.closeDropdown();
        }
    };

    private handleDiscountValueChange = (count: { value: number; text: string }) => {
        this.discountForm.value = count.value;
    };

    private handleDeleteBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };

    private handleSubmitBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };
}
