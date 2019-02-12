import { SpotToBillFormActions } from 'actions';
import * as classNames from 'classnames';
import { MonetaryTotalsWithOptionalDiscount } from 'components/Buddha';
import {
    ButtonClose,
    ButtonDelete,
    ButtonDiscount,
    ButtonEdit,
    ButtonSave
    } from 'components/Button';
import { Paragraph, Tooltip } from 'components/Content';
import {
    Counter,
    DropdownContainer,
    Input,
    OptionsList
    } from 'components/Form';
import { IconMoveBlue } from 'components/Icons';
import { Card, CardContentTable } from 'components/Section';
import { ActivityHandler } from 'helpers/ActivityHandler';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { ReorderToOptions } from 'invariables';
import {
    action,
    computed,
    observable,
    reaction
    } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';
import { BillSpotPreviewRowActivity } from './BillSpotPreviewRowActivity';
import {
    SpotBillFirstRevisionRate,
    SpotBillFormActivityGroup,
    SpotBillFormSpot,
    SpotBillFormActivityTimeEntry,
    SpotBillDiscount,
} from 'types/spotBilling';

const s = require('./BillSpotPreviewRowEdit.css');

interface Props extends AppOnlyStoreState {
    onRequestRowDeletion: () => void;
    onRequestTimeEntryDeletion: (timeEntryId: number) => void;
    onRowEditToggle: () => void;
    className?: string;
    editing: boolean;
    index: number;
    rowsCount: number;
    row: SpotBillFormActivityGroup;
    spotsInBill: SpotBillFormSpot[];
    studioFlatRates: StudioRateCardEntryFromApi[];
    studioFirstRates: SpotBillFirstRevisionRate[];
    studioRateCardValues: StudioRateCardEntryFromApi[];
}

@inject('store')
@observer
export class BillSpotPreviewRowEdit extends React.Component<Props, {}> {
    private rateDropdown: DropdownContainer | null = null;
    private reorderDropdown: DropdownContainer | null = null;

    @observable private isInEditMode: boolean = this.props.editing;
    @observable private note: string = '';
    @observable private noteHasChanged: boolean = false;
    @observable private rateType: SpotBillActivityRateType = SpotBillActivityRateType.Hourly;
    @observable private rateFlatOrFirstStageId: number | null = null;
    @observable private rateAmount: number | null = null;
    @observable private hasDiscount: boolean = false;
    @observable private discount: SpotBillDiscount = {
        value: 0,
        isFixed: true,
    };

    @computed
    private get useNote(): boolean {
        return this.props.row.note ? true : false;
    }

    @computed
    private get useNoteInEditMode(): boolean {
        if (this.isInEditMode) {
            return this.note !== this.props.row.name ? true : false;
        }

        return false;
    }

    @computed
    private get nameOrNote(): string {
        return this.useNote ? this.props.row.note! : this.props.row.name!;
    }

    @computed
    private get selectedSpotFirstRate(): SpotBillFormSpot | null {
        if (this.rateType !== SpotBillActivityRateType.FirstStage) {
            return null;
        }

        return this.props.spotsInBill.find(spot => spot.spotId === this.rateFlatOrFirstStageId) || null;
    }

    @computed
    private get selectedFlatRate(): StudioRateCardEntryFromApi | null {
        if (this.rateType !== SpotBillActivityRateType.Flat) {
            return null;
        }

        return this.props.studioFlatRates.find(flat => flat.id === this.rateFlatOrFirstStageId) || null;
    }

    @computed
    private get selectedSpotFirstRateForEditMode(): SpotBillFormSpot | null {
        if (this.rateType !== SpotBillActivityRateType.FirstStage) {
            return null;
        }

        return this.props.spotsInBill.find(spot => spot.spotId === this.rateFlatOrFirstStageId) || null;
    }

    @computed
    private get selectedFlatRateForEditMode(): StudioRateCardEntryFromApi | null {
        if (this.rateType !== SpotBillActivityRateType.Flat) {
            return null;
        }

        return this.props.studioFlatRates.find(flat => flat.id === this.rateFlatOrFirstStageId) || null;
    }

    @computed
    private get activityRateLabel(): string {
        return this.props.row.rateType === SpotBillActivityRateType.FirstStage
            ? this.selectedSpotFirstRate
                ? 'First stage for spot: ' + this.selectedSpotFirstRate.spotName
                : 'First stage rate'
            : this.props.row.rateType === SpotBillActivityRateType.Flat
            ? this.selectedFlatRate
                ? 'Flat rate for ' + this.selectedFlatRate.activityName
                : 'Flat rate'
            : this.props.row.rateType === SpotBillActivityRateType.Hourly
            ? 'Hourly'
            : '';
    }

    @computed
    private get timeEntries(): SpotBillFormActivityTimeEntry[] {
        return this.props.row.timeEntriesIds.reduce((entries: SpotBillFormActivityTimeEntry[], timeEntryId) => {
            const timeEntry = this.props.store!.spotToBillForm.timeEntries.find(t => t.timeEntryId === timeEntryId);

            if (timeEntry) {
                entries.push(timeEntry);
            }

            return entries;
        }, []);
    }

    @computed
    private get rowTotal(): number {
        return ActivityHandler.calculateActivityTotals(
            this.props.row,
            this.props.spotsInBill,
            this.props.studioFlatRates,
            this.props.studioRateCardValues
        );
    }

    @computed
    private get rowDiscount(): number {
        const discount = this.props.row.discount.value || 0;

        if (this.props.row.discount.isFixed) {
            return discount;
        }

        return discount > 0 ? (this.rowTotal * discount) / 100 : 0;
    }

    @computed
    private get rowTotalAfterDiscount(): number {
        const total = this.rowTotal - this.rowDiscount;
        return total || 0;
    }

    @computed
    private get rowTotalForEditMode(): number {
        const total = ActivityHandler.calculateActivityTotals(
            {
                ...this.props.row,
                rateType: this.rateType,
                rateFlatOrFirstStageId: this.rateFlatOrFirstStageId,
                rateAmount: this.rateAmount,
            },
            this.props.spotsInBill,
            this.props.studioFlatRates,
            this.props.studioRateCardValues
        );

        return total;
    }

    @computed
    private get rowDiscountForEditMode(): number {
        const discount = this.discount.value || 0;

        if (this.discount.isFixed) {
            return discount;
        }

        return discount > 0 ? (this.rowTotalForEditMode * discount) / 100 : 0;
    }

    @computed
    private get rowTotalAfterDiscountForEditMode(): number {
        const total = this.rowTotalForEditMode - this.rowDiscountForEditMode;
        return total || 0;
    }

    constructor(props: Props) {
        super(props);

        reaction(
            () => this.props.row.timeEntriesIds.length,
            count => {
                if (this.isInEditMode && this.noteHasChanged === false) {
                    this.note = this.nameOrNote;
                }
            }
        );
    }

    public componentWillReceiveProps(nextProps: Props) {
        if (!this.props.editing && nextProps.editing) {
            this.handleEnteringEditModeOfRow();
        } else if (this.props.editing && !nextProps.editing) {
            this.handleSavingRowChanges();
        }
    }

    public render() {
        return (
            <Card
                className={s.card}
                contentAboveTitleBar={
                    <div className={s.rowGrid}>
                        <div>
                            {(this.isInEditMode && (
                                <div className={s.titleInEditMode}>
                                    <Input
                                        onChange={this.handleNoteChange}
                                        value={this.note}
                                        label="Name"
                                        minWidth={320}
                                    />

                                    <div className={s.resetButton}>
                                        {this.useNoteInEditMode && (
                                            <Tooltip text="Reset row title to default">
                                                <ButtonClose onClick={this.handleResettingNote} label="" />
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            )) || (
                                <div className={s.title}>
                                    <Paragraph>
                                        {'#' + (this.props.index + 1) + ' '}
                                        <strong>{this.nameOrNote}</strong>
                                    </Paragraph>

                                    {this.useNote && (
                                        <Paragraph className={s.subTitle} size="small" type="dim">
                                            {this.props.row.name}
                                        </Paragraph>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            {(this.isInEditMode && (
                                <DropdownContainer
                                    ref={this.referenceRateDropdown}
                                    type="field"
                                    label=""
                                    value={
                                        this.rateType === SpotBillActivityRateType.FirstStage
                                            ? this.selectedSpotFirstRateForEditMode
                                                ? 'First stage rate for spot: ' +
                                                  this.selectedSpotFirstRateForEditMode.spotName
                                                : 'First stage rate'
                                            : this.rateType === SpotBillActivityRateType.Flat
                                            ? this.selectedFlatRateForEditMode
                                                ? 'Flat rate: ' + this.selectedFlatRateForEditMode.activityName
                                                : 'Flat rate'
                                            : 'Hourly'
                                    }
                                >
                                    <OptionsList
                                        onChange={this.handleRateChange}
                                        value={
                                            this.rateType === SpotBillActivityRateType.FirstStage
                                                ? 'first-' + (this.rateFlatOrFirstStageId || 0)
                                                : this.rateType === SpotBillActivityRateType.Flat
                                                ? 'flat-' + (this.rateFlatOrFirstStageId || 0)
                                                : SpotBillActivityRateType.Hourly
                                        }
                                        options={[
                                            { key: 'h', value: SpotBillActivityRateType.Hourly, label: 'Hourly' },
                                            ...(this.props.studioFirstRates.length > 0
                                                ? [{ key: 'sep-1', value: null, label: '---' }]
                                                : []),
                                            ...this.props.studioFirstRates.map(firstStage => ({
                                                key: 'first-' + firstStage.spotId,
                                                value: 'first-' + firstStage.spotId,
                                                label: 'First stage rate for spot: ' + firstStage.spotName,
                                            })),
                                            ...(this.props.studioFlatRates.length > 0
                                                ? [{ key: 'sep-2', value: null, label: '---' }]
                                                : []),
                                            ...this.props.studioFlatRates.map(flat => ({
                                                key: 'flat-' + flat.id,
                                                value: 'flat-' + flat.id,
                                                label:
                                                    flat.activityName +
                                                    (flat.rate ? ': ' + MoneyHandler.formatAsDollars(flat.rate) : ''),
                                            })),
                                        ]}
                                    />
                                </DropdownContainer>
                            )) || <Paragraph>{this.activityRateLabel}</Paragraph>}
                        </div>

                        <div>
                            {(this.isInEditMode && this.rateType !== SpotBillActivityRateType.Hourly && (
                                <div className={s.rowRate}>
                                    <Counter
                                        onChange={this.handleRowRateChange}
                                        align="right"
                                        decimals={2}
                                        incrementBy={100}
                                        minValue={0}
                                        readOnlyTextBeforeValue="$"
                                        showAddedTextOnInput={true}
                                        label={this.hasDiscount ? 'Row sub total' : 'Row total'}
                                        value={this.rowTotalForEditMode}
                                    />
                                </div>
                            )) || (
                                <MonetaryTotalsWithOptionalDiscount
                                    onChange={this.handleChangingRowDiscount}
                                    classNameForDiscountForm={s.rowDiscountForm}
                                    discountFormStackedVertically={true}
                                    discountLabel="Row discount"
                                    discountValue={
                                        this.isInEditMode ? this.discount.value : this.props.row.discount.value
                                    }
                                    discountIsFixed={
                                        this.isInEditMode ? this.discount.isFixed : this.props.row.discount.isFixed
                                    }
                                    hideSubTotal={
                                        this.isInEditMode && this.rateType !== SpotBillActivityRateType.Hourly
                                    }
                                    subTotalLabel="Row sub total"
                                    subTotalValue={this.isInEditMode ? this.rowTotalForEditMode : this.rowTotal}
                                    totalLabel="Row total"
                                    totalValue={
                                        this.isInEditMode
                                            ? this.rowTotalAfterDiscountForEditMode
                                            : this.rowTotalAfterDiscount
                                    }
                                    applyDiscountLabel="Apply discount"
                                    editing={this.isInEditMode && this.hasDiscount}
                                    maxFixedDiscountValue={this.rowTotalForEditMode}
                                />
                            )}
                        </div>
                    </div>
                }
                noPadding={true}
                isExpandable={false}
                title={this.isInEditMode ? 'Time entries' : undefined}
                headerElements={
                    this.isInEditMode && this.hasDiscount === false ? (
                        <ButtonDiscount
                            onClick={this.handleInitializeDiscount}
                            label="Discount row"
                            labelOnLeft={true}
                        />
                    ) : (
                        undefined
                    )
                }
            >
                <React.Fragment>
                    <CardContentTable
                        header={[
                            { title: 'Activity', align: 'left' },
                            { title: 'Duration', align: 'right' },
                            { title: 'Adjusted', align: 'right' },
                            { title: 'Regular', align: 'right' },
                            { title: 'Overtime', align: 'right' },
                            { title: 'Double time', align: 'right' },
                            { title: 'Amount', align: 'right' },
                        ]}
                    >
                        {this.timeEntries.map((timeEntry, timeEntryIndex) => (
                            <BillSpotPreviewRowActivity
                                key={timeEntry.timeEntryId}
                                onRequestTimeEntryDeletion={this.props.onRequestTimeEntryDeletion}
                                index={timeEntryIndex}
                                timeEntry={timeEntry}
                                timeEntriesCountInRow={this.timeEntries.length}
                                activity={this.props.row}
                                studioRateCardValues={this.props.studioRateCardValues}
                                rateType={this.rateType}
                                isInEditMode={this.isInEditMode}
                            />
                        ))}
                    </CardContentTable>

                    <div className={classNames(s.rowEditBox, { [s.editing]: this.isInEditMode })}>
                        {(this.isInEditMode && (
                            <ButtonSave isSaving={false} onClick={this.handleRowEditToggle} label="" />
                        )) || <ButtonEdit onClick={this.handleRowEditToggle} label="" />}

                        {this.isInEditMode && this.props.rowsCount > 1 && (
                            <div className={s.reorderButtonsBox}>
                                <DropdownContainer
                                    ref={this.referenceReorderDropdown}
                                    icon={<IconMoveBlue width={14} height={13} />}
                                >
                                    <OptionsList
                                        onChange={this.handleReorderRow}
                                        options={[
                                            ...(this.props.index > 0
                                                ? [
                                                      { value: 'top', label: 'Move to the top' },
                                                      { value: 'up', label: 'Move up one row' },
                                                  ]
                                                : []),
                                            ...(this.props.index + 1 < this.props.rowsCount
                                                ? [
                                                      { value: 'down', label: 'Move down one row' },
                                                      { value: 'bottom', label: 'Move to the bottom' },
                                                  ]
                                                : []),
                                        ]}
                                    />
                                </DropdownContainer>
                            </div>
                        )}

                        {this.isInEditMode && (
                            <div className={s.deleteButtonsBox}>
                                <ButtonDelete onClick={this.handleDeleteRow} iconColor="orange" label="" />
                            </div>
                        )}
                    </div>
                </React.Fragment>
            </Card>
        );
    }

    private referenceRateDropdown = (ref: DropdownContainer) => (this.rateDropdown = ref);
    private referenceReorderDropdown = (ref: DropdownContainer) => (this.reorderDropdown = ref);

    private handleRowEditToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onRowEditToggle();
    };

    private handleEnteringEditModeOfRow = () => {
        this.note = this.nameOrNote;
        this.noteHasChanged = false;
        this.rateType = this.props.row.rateType;
        this.rateFlatOrFirstStageId = this.props.row.rateFlatOrFirstStageId;
        this.rateAmount = this.props.row.rateAmount;
        this.hasDiscount = this.props.row.discount.value > 0;
        this.discount.value = this.props.row.discount.value;
        this.discount.isFixed = this.props.row.discount.isFixed;

        this.isInEditMode = true;
    };

    private handleSavingRowChanges = () => {
        SpotToBillFormActions.changeBillRowNote(this.props.row.id, this.note);

        SpotToBillFormActions.changeBillRowRateType(
            this.props.row.id,
            this.rateType,
            this.rateFlatOrFirstStageId,
            this.rateAmount
        );

        SpotToBillFormActions.changeBillRowDiscount(this.props.row.id, this.discount);

        this.isInEditMode = false;
    };

    @action
    private handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.note = e.target.value;
        this.noteHasChanged = true;
    };

    @action
    private handleResettingNote = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.note = this.props.row.name;
        this.noteHasChanged = false;
    };

    @action
    private handleRateChange = (option: { value: string; label: string }) => {
        if (option.value === null) {
            return;
        }

        if (this.rateDropdown) {
            this.rateDropdown.closeDropdown();
        }

        this.rateAmount = null;

        const firstString = 'first-';
        const isFirstRate = option.value.includes(firstString);
        if (isFirstRate) {
            const firstRateId = parseInt(option.value.slice(firstString.length, option.value.length), 10);
            const firstRateSpot = this.props.studioFirstRates.find(spot => spot.spotId === firstRateId);

            this.rateType = SpotBillActivityRateType.FirstStage;
            this.rateFlatOrFirstStageId = firstRateSpot ? firstRateSpot.spotId : null;
            return;
        }

        const flatString = 'flat-';
        const isFlat = option.value.includes(flatString);
        if (isFlat) {
            const flatRateId = parseInt(option.value.slice(flatString.length, option.value.length), 10);

            this.rateType = SpotBillActivityRateType.Flat;
            this.rateFlatOrFirstStageId = !isNaN(flatRateId) ? flatRateId : null;
            return;
        }

        this.rateType = SpotBillActivityRateType.Hourly;
        this.rateFlatOrFirstStageId = null;
    };

    private handleRowRateChange = (count: { value: number; text: string }) => {
        this.rateAmount = count.value;
    };

    private handleInitializeDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.hasDiscount = true;
    };

    @action
    private handleChangingRowDiscount = (value: number, isFixed: boolean) => {
        this.discount.value = value;
        this.discount.isFixed = isFixed;
    };

    private handleReorderRow = (option: { value: ReorderToOptions; label: string }) => {
        SpotToBillFormActions.reorderRow(this.props.index, this.props.rowsCount, option.value);

        if (this.reorderDropdown) {
            this.reorderDropdown.closeDropdown();
        }
    };

    private handleDeleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onRequestRowDeletion();
    };
}
