import { BillSpotPreviewRowEdit } from '.';
import { toFixed } from 'accounting';
import { SpotToBillFormActions } from 'actions';
import * as classNames from 'classnames';
import {
    ButtonAdd,
    ButtonDelete,
    ButtonEdit,
    ButtonInBox,
    ButtonSave,
    ButtonSend
    } from 'components/Button';
import { Paragraph } from 'components/Content';
import { Counter } from 'components/Form';
import { BottomBar } from 'components/Layout';
import { LoadingIndicator } from 'components/Loaders';
import { Modal } from 'components/Modals';
import { Card, Row } from 'components/Section';
import { ActivityHandler } from 'helpers/ActivityHandler';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { StringHandler } from 'helpers/StringHandler';
import { FLAT_RATE_ACTIVITY_TYPE_ID } from 'invariables';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import {
    SpotBillDiscount,
    SpotBillFirstRevisionRate,
    SpotBillFormSpot,
    SpotBillRowRevision
    } from 'types/spotBilling';
import { StudioRateCardEntryFromApi, StudioRateCardTypeFromApi } from 'types/studioRateCard';

const s = require('./BillSpotPreviewContent.css');

export interface FirstStageRow {
    spotId: number;
    spotName: string;
    revisions: SpotBillRowRevision[];
    amount: number;
}

interface Props extends AppOnlyStoreState {
    onDeleteBill: () => void;
    projectName: string;
    campaignName: string;
    projectCampaignName: string | null;
    studioName: string;
    editable: boolean;
    spotsInBill: SpotBillFormSpot[];
    studioRateCards: StudioRateCardTypeFromApi[];
    selectedRateCard: StudioRateCardEntryFromApi[];
    selectedStudioRateCard: StudioRateCardTypeFromApi | null;
}

@inject('store')
@observer
export class BillSpotPreviewContent extends React.Component<Props, {}> {
    @observable private rowIdInEditMode: number | null = null;

    @observable private isDiscountInEditMode: boolean = false;
    @observable private discountForm: SpotBillDiscount = {
        isFixed: true,
        value: 0,
    };

    @observable private isDeleteRowConfirmationOpen: boolean = false;

    @computed
    private get spotsInBillFirstStageRates(): SpotBillFirstRevisionRate[] {
        return this.props.spotsInBill
            .filter(spot => spot.firstRevisionCost !== null && spot.firstRevisionIsBilled === false)
            .map(spot => ({
                spotId: spot.spotId,
                spotName: spot.spotName,
                firstRevisionCost: spot.firstRevisionCost,
            }));
    }

    @computed
    private get selectedFlatRates(): StudioRateCardEntryFromApi[] {
        return this.props.selectedRateCard.filter(rate => rate.activityTypeId === FLAT_RATE_ACTIVITY_TYPE_ID);
    }

    @computed private get billTotal(): number {
        // Start with zero
        let totals: number = 0;

        // Iterate all activities in bill and calculate it based on selected rate
        if (this.props.selectedStudioRateCard) {
            totals += this.props.store!.spotToBillForm.rows.reduce((total: number, activity) => {
                total += ActivityHandler.calculateActivityTotals(
                    activity,
                    this.props.spotsInBill,
                    this.selectedFlatRates,
                    this.props.selectedRateCard
                );

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
        if (!this.props.selectedStudioRateCard && this.props.studioRateCards.length > 0) {
            SpotToBillFormActions.changeSelectedRateCard(this.props.studioRateCards[0].ratecardId);
        }
    }

    public render() {
        const { rows } = this.props.store!.spotToBillForm;

        return (
            <React.Fragment>
                <Card
                    isExpandable={false}
                    headerContent={
                        <div className={s.summary}>
                            <div className={s.left}>
                                <Paragraph className={s.campaign}>
                                    <span>Campaign: </span>
                                    <strong>
                                        {StringHandler.constructProjectCampaignName(
                                            this.props.campaignName,
                                            this.props.projectCampaignName
                                        )}
                                    </strong>
                                </Paragraph>
                            </div>

                            <div className={s.right}>
                                {this.props.spotsInBill.length > 0 && (
                                    <Paragraph className={s.spots}>
                                        <span>{this.props.spotsInBill.length > 1 ? 'Spots: ' : 'Spot: '}</span>
                                        {this.props.spotsInBill.map(spot => (
                                            <strong key={spot.spotId}>{spot.spotName}</strong>
                                        ))}
                                    </Paragraph>
                                )}
                            </div>
                        </div>
                    }
                />

                <div className={s.activities}>
                    {rows.map((row, rowIndex) => {
                        return (
                            <BillSpotPreviewRowEdit
                                key={row.id}
                                onRequestRowDeletion={this.handleRequestRowDeletion(this.rowIdInEditMode)}
                                onRowEditToggle={this.handleToggleRowEdit(row.id)}
                                className={s.gridRow}
                                editing={row.id === this.rowIdInEditMode}
                                index={rowIndex}
                                rowsCount={rows.length}
                                activity={row}
                                spotsInBill={this.props.spotsInBill}
                                studioFlatRates={this.selectedFlatRates}
                                studioFirstRates={this.spotsInBillFirstStageRates}
                                studioRateCardValues={this.props.selectedRateCard}
                            />
                        );
                    })}
                </div>

                <div className={s.totals}>
                    <div className={s.left}>
                        {(this.isDiscountInEditMode && (
                            <div className={s.discountForm}>
                                <div className={s.discountType}>
                                    <Paragraph size="small">Discount:</Paragraph>

                                    <ButtonInBox
                                        className={classNames(s.discountTypeButton, {
                                            [s.active]: this.discountForm.isFixed,
                                        })}
                                        onClick={this.handleDiscountTypeChange(true)}
                                    >
                                        {'$'}
                                    </ButtonInBox>

                                    <ButtonInBox
                                        className={classNames(s.discountTypeButton, {
                                            [s.active]: !this.discountForm.isFixed,
                                        })}
                                        onClick={this.handleDiscountTypeChange(false)}
                                    >
                                        {'%'}
                                    </ButtonInBox>
                                </div>

                                <Counter
                                    onChange={this.handleDiscountValueChange}
                                    decimals={2}
                                    maxValue={this.discountForm.isFixed ? this.billTotal : 100}
                                    minValue={0}
                                    fieldMaxWidth={128}
                                    incrementBy={this.discountForm.isFixed ? 100 : 5}
                                    multipleOf={0.01}
                                    showAddedTextOnInput={true}
                                    readOnlyTextBeforeValue={this.discountForm.isFixed ? '$' : ''}
                                    readOnlyTextAfterValue={this.discountForm.isFixed ? '' : '%'}
                                    value={this.discountForm.value}
                                    showPlusMinus={true}
                                />

                                <ButtonSave onClick={this.handleSaveDiscount} isSaving={false} label="Apply discount" />
                            </div>
                        )) ||
                            (this.hasDiscount && (
                                <ButtonEdit onClick={this.handleEditDiscount} label="Modify discount" />
                            )) || <ButtonAdd onClick={this.handleEditDiscount} label="Add discount" />}
                    </div>

                    <div className={s.right}>
                        {this.hasDiscount && (
                            <Paragraph>
                                {'Sub total: '}
                                <strong>{MoneyHandler.formatAsDollars(this.billTotal)}</strong>
                            </Paragraph>
                        )}

                        {(this.props.selectedRateCard.length <= 0 && <Paragraph>No rate card selected</Paragraph>) ||
                            (this.hasDiscount && (
                                <div className={s.subTotals}>
                                    <Paragraph>
                                        {'Discount: '}
                                        <strong>
                                            {this.discount.isFixed
                                                ? MoneyHandler.formatAsDollars(this.discount.value)
                                                : toFixed(this.discount.value, 2) + '%'}
                                        </strong>
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

                <BottomBar
                    show={this.props.editable ? true : false}
                    showHeader={this.props.store!.spotToBillForm.savingBillStatus !== 'none'}
                    header={
                        <Row justifyContent="center" alignItems="center">
                            {(this.props.store!.spotToBillForm.savingBillStatus === 'saving' && (
                                <LoadingIndicator label="Saving bill changes" />
                            )) ||
                                (this.props.store!.spotToBillForm.savingBillStatus === 'success' && (
                                    <Paragraph type="success">Saved bill changes</Paragraph>
                                ))}
                        </Row>
                    }
                >
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

                {/** Verify rows deletion modal */}
                <Modal
                    show={this.isDeleteRowConfirmationOpen}
                    onClose={this.handleRowDeleteModalClose}
                    closeButton={true}
                    closeButtonLabel="No, don't delete this row"
                    type="alert"
                    topBarTitle="Delete rows"
                    title="Are you sure you want to remove selected activity row from this bill?"
                    actions={[
                        {
                            closeOnClick: true,
                            label: 'Yes, please remove it',
                            onClick: this.handleEditingRowDeletion,
                            type: 'alert',
                        },
                    ]}
                />
            </React.Fragment>
        );
    }

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

    private handleDiscountTypeChange = (isFixed: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
        this.discountForm.isFixed = isFixed;
    };

    private handleDiscountValueChange = (count: { value: number; text: string }) => {
        this.discountForm.value = count.value;
    };

    private handleToggleRowEdit = (rowId: number) => () => {
        this.rowIdInEditMode = this.rowIdInEditMode === rowId ? null : rowId;
    };

    private handleRowDeleteModalClose = () => {
        this.isDeleteRowConfirmationOpen = false;
    };

    private handleRequestRowDeletion = (rowId: number | null) => () => {
        if (rowId !== null) {
            this.isDeleteRowConfirmationOpen = true;
        }
    };

    @action
    private handleEditingRowDeletion = () => {
        if (this.rowIdInEditMode) {
            SpotToBillFormActions.removeRowFromBill(this.rowIdInEditMode);
            this.rowIdInEditMode = null;
        }
    };

    private handleDeleteBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onDeleteBill();
    };

    private handleSubmitBill = (e: React.MouseEvent<HTMLButtonElement>) => {
        // TODO
    };
}
