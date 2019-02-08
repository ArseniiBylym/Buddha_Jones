import { SpotToBillFormActions } from 'actions';
import * as classNames from 'classnames';
import { AdjustedMinutesAboveOrBelow } from 'components/Buddha';
import { ButtonDelete, ButtonEdit, ButtonSave } from 'components/Button';
import { Paragraph } from 'components/Content';
import {
    Counter,
    DropdownContainer,
    DurationCounter,
    Input,
    OptionsList
    } from 'components/Form';
import { IconMoveBlue } from 'components/Icons';
import { Card, CardContentTable, CardContentTableRow } from 'components/Section';
import { ActivityHandler } from 'helpers/ActivityHandler';
import { DateHandler } from 'helpers/DateHandler';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { ReorderToOptions } from 'invariables';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';
import {
    SpotBillFirstRevisionRate,
    SpotBillFormActivityGroup,
    SpotBillFormSpot,
    SpotBillFormActivityTimeEntry,
} from 'types/spotBilling';

const s = require('./BillSpotPreviewRowEdit.css');

interface Props extends AppOnlyStoreState {
    onRequestRowDeletion: () => void;
    onRowEditToggle: () => void;
    className?: string;
    editing: boolean;
    index: number;
    rowsCount: number;
    activity: SpotBillFormActivityGroup;
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
    @observable private rateType: SpotBillActivityRateType = SpotBillActivityRateType.Hourly;
    @observable private rateFlatOrFirstStageId: number | null = null;
    @observable private rateAmount: number | null = null;

    @computed
    private get nameOrNote(): string {
        return this.props.activity.note ? this.props.activity.note : this.props.activity.name;
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
        return this.props.activity.rateType === SpotBillActivityRateType.FirstStage
            ? this.selectedSpotFirstRate
                ? 'First stage for spot: ' + this.selectedSpotFirstRate.spotName
                : 'First stage rate'
            : this.props.activity.rateType === SpotBillActivityRateType.Flat
            ? this.selectedFlatRate
                ? 'Flat rate for ' + this.selectedFlatRate.activityName
                : 'Flat rate'
            : this.props.activity.rateType === SpotBillActivityRateType.Hourly
            ? 'Hourly'
            : '';
    }

    @computed
    private get timeEntries(): SpotBillFormActivityTimeEntry[] {
        return this.props.activity.timeEntriesIds.reduce((entries: SpotBillFormActivityTimeEntry[], timeEntryId) => {
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
            this.props.activity,
            this.props.spotsInBill,
            this.props.studioFlatRates,
            this.props.studioRateCardValues
        );
    }

    @computed
    private get rowTotalForEditMode(): number {
        const total = ActivityHandler.calculateActivityTotals(
            {
                ...this.props.activity,
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

    public componentWillReceiveProps(nextProps: Props) {
        if (!this.props.editing && nextProps.editing) {
            this.handleEnteringEditModeOfRow();
        } else if (this.props.editing && !nextProps.editing) {
            this.handleSavingRowChanges();
        }
    }

    public componentWillUnmount() {
        if (this.isInEditMode) {
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
                                <Input onChange={this.handleNoteChange} value={this.note} label="Name" minWidth={320} />
                            )) || (
                                <Paragraph>
                                    {'#' + (this.props.index + 1) + ' '}
                                    <strong>{this.nameOrNote}</strong>
                                </Paragraph>
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
                                <Counter
                                    onChange={this.handleRowRateChange}
                                    align="right"
                                    decimals={2}
                                    incrementBy={100}
                                    minValue={0}
                                    readOnlyTextBeforeValue="$"
                                    showAddedTextOnInput={true}
                                    label="Amount"
                                    value={this.rowTotalForEditMode}
                                />
                            )) || (
                                <Paragraph>
                                    {'Row total: '}
                                    <strong>
                                        {this.rowTotal !== null
                                            ? MoneyHandler.formatAsDollars(this.rowTotal)
                                            : 'No rate'}
                                    </strong>
                                </Paragraph>
                            )}
                        </div>
                    </div>
                }
                noPadding={true}
                isExpandable={false}
                title={this.isInEditMode ? 'Time entries' : undefined}
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
                        {this.timeEntries.map((timeEntry, timeEntryIndex) => {
                            const timeEntryActivityRate: number =
                                (this.isInEditMode && this.rateType === SpotBillActivityRateType.Hourly) ||
                                (!this.isInEditMode && this.props.activity.rateType === SpotBillActivityRateType.Hourly)
                                    ? ActivityHandler.calculateBaseActivityRate(
                                          timeEntry.activityId,
                                          this.props.studioRateCardValues
                                      )
                                    : 0;

                            let timeEntryAmount: number = 0;
                            let regularAmount: number = 0;
                            let overtimeAmount: number = 0;
                            let doubletimeAmount: number = 0;

                            if (
                                (this.isInEditMode && this.rateType === SpotBillActivityRateType.Hourly) ||
                                (!this.isInEditMode && this.props.activity.rateType === SpotBillActivityRateType.Hourly)
                            ) {
                                regularAmount = ActivityHandler.calculateRegularHoursAmount(
                                    timeEntry.regularBillableMinutes,
                                    timeEntryActivityRate
                                );
                                overtimeAmount = ActivityHandler.calculateOvertimeHoursAmount(
                                    timeEntry.overtimeBillableMinutes,
                                    timeEntryActivityRate
                                );
                                doubletimeAmount = ActivityHandler.calculateDoubletimeHoursAmount(
                                    timeEntry.doubletimeBillableMinutes,
                                    timeEntryActivityRate
                                );

                                timeEntryAmount =
                                    this.props.activity.rateType !== SpotBillActivityRateType.Hourly
                                        ? timeEntryActivityRate
                                        : regularAmount + overtimeAmount + doubletimeAmount;
                            }

                            return (
                                <CardContentTableRow
                                    key={timeEntry.timeEntryId}
                                    className={s.timeEntryRow}
                                    design="compact"
                                >
                                    <div className={s.timeEntryName}>
                                        <Paragraph size="small" type="brown">
                                            {'#' +
                                                (timeEntryIndex + 1) +
                                                ' ' +
                                                ActivityHandler.constructActivityName([timeEntry])}
                                        </Paragraph>
                                    </div>

                                    <div>
                                        <Paragraph
                                            size="small"
                                            align="right"
                                            type={this.isInEditMode ? 'blue' : 'brown'}
                                            bold={true}
                                        >
                                            {DateHandler.convertTotalMinutesToHM(timeEntry.durationInMinutes)}
                                        </Paragraph>
                                    </div>

                                    <div>
                                        {(this.isInEditMode && (
                                            <DurationCounter
                                                align="right"
                                                onChange={this.handleTimeEntryHoursChange(
                                                    timeEntry.timeEntryId,
                                                    'total'
                                                )}
                                                valueLessThan={{
                                                    value: timeEntry.durationInMinutes,
                                                    color: 'alert',
                                                }}
                                                valueMoreThan={{
                                                    value: timeEntry.durationInMinutes,
                                                    color: 'success',
                                                }}
                                                value={timeEntry.totalAdjustedMinutes}
                                                minValue={0}
                                            />
                                        )) || (
                                            <AdjustedMinutesAboveOrBelow
                                                style={{ width: '100%', textAlign: 'right' }}
                                                minutes={timeEntry.totalAdjustedMinutes - timeEntry.durationInMinutes}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        {(this.isInEditMode && (
                                            <DurationCounter
                                                align="right"
                                                onChange={this.handleTimeEntryHoursChange(
                                                    timeEntry.timeEntryId,
                                                    'regular'
                                                )}
                                                value={timeEntry.regularBillableMinutes}
                                                maxValue={timeEntry.totalAdjustedMinutes}
                                                minValue={0}
                                            />
                                        )) || (
                                            <Paragraph
                                                size="small"
                                                align="right"
                                                type={timeEntry.regularBillableMinutes ? 'default' : 'dim'}
                                            >
                                                {timeEntry.regularBillableMinutes
                                                    ? DateHandler.convertTotalMinutesToHM(
                                                          timeEntry.regularBillableMinutes
                                                      ) +
                                                      (this.props.activity.rateType === SpotBillActivityRateType.Hourly
                                                          ? ' × ' +
                                                            MoneyHandler.formatAsDollars(
                                                                ActivityHandler.calculateRegularRate(
                                                                    timeEntryActivityRate
                                                                )
                                                            )
                                                          : '')
                                                    : '0min'}
                                            </Paragraph>
                                        )}
                                    </div>

                                    <div>
                                        {(this.isInEditMode && (
                                            <DurationCounter
                                                align="right"
                                                onChange={this.handleTimeEntryHoursChange(
                                                    timeEntry.timeEntryId,
                                                    'overtime'
                                                )}
                                                value={timeEntry.overtimeBillableMinutes}
                                                maxValue={timeEntry.totalAdjustedMinutes}
                                                minValue={0}
                                            />
                                        )) || (
                                            <Paragraph
                                                size="small"
                                                align="right"
                                                type={timeEntry.overtimeBillableMinutes ? 'default' : 'dim'}
                                            >
                                                {timeEntry.overtimeBillableMinutes
                                                    ? DateHandler.convertTotalMinutesToHM(
                                                          timeEntry.overtimeBillableMinutes
                                                      ) +
                                                      (this.props.activity.rateType === SpotBillActivityRateType.Hourly
                                                          ? ' × ' +
                                                            MoneyHandler.formatAsDollars(
                                                                ActivityHandler.calculateOvertimeRate(
                                                                    timeEntryActivityRate
                                                                )
                                                            )
                                                          : '')
                                                    : '0min'}
                                            </Paragraph>
                                        )}
                                    </div>

                                    <div>
                                        {(this.isInEditMode && (
                                            <DurationCounter
                                                align="right"
                                                onChange={this.handleTimeEntryHoursChange(
                                                    timeEntry.timeEntryId,
                                                    'doubletime'
                                                )}
                                                value={timeEntry.doubletimeBillableMinutes}
                                                maxValue={timeEntry.totalAdjustedMinutes}
                                                minValue={0}
                                            />
                                        )) || (
                                            <Paragraph
                                                size="small"
                                                align="right"
                                                type={timeEntry.doubletimeBillableMinutes ? 'default' : 'dim'}
                                            >
                                                {timeEntry.doubletimeBillableMinutes
                                                    ? DateHandler.convertTotalMinutesToHM(
                                                          timeEntry.doubletimeBillableMinutes
                                                      ) +
                                                      (this.props.activity.rateType === SpotBillActivityRateType.Hourly
                                                          ? ' × ' +
                                                            MoneyHandler.formatAsDollars(
                                                                ActivityHandler.calculateDoubletimeRate(
                                                                    timeEntryActivityRate
                                                                )
                                                            )
                                                          : '')
                                                    : '0min'}
                                            </Paragraph>
                                        )}
                                    </div>

                                    <div className={s.timeEntryAmount}>
                                        <Paragraph size="small" align="right" bold={true}>
                                            {MoneyHandler.formatAsDollars(timeEntryAmount)}
                                        </Paragraph>
                                    </div>
                                </CardContentTableRow>
                            );
                        })}
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
        this.rateType = this.props.activity.rateType;
        this.rateFlatOrFirstStageId = this.props.activity.rateFlatOrFirstStageId;
        this.rateAmount = this.props.activity.rateAmount;

        this.isInEditMode = true;
    };

    private handleSavingRowChanges = () => {
        SpotToBillFormActions.changeBillRowNote(this.props.index, this.note);

        SpotToBillFormActions.changeBillRowRateType(
            this.props.index,
            this.rateType,
            this.rateFlatOrFirstStageId,
            this.rateAmount
        );

        this.isInEditMode = false;
    };

    private handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.note = e.target.value;
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

    private handleTimeEntryHoursChange = (
        timeEntryId: number,
        hours: 'total' | 'regular' | 'overtime' | 'doubletime'
    ) => (totalMinutes: number) => {
        SpotToBillFormActions.adjustTimeEntryHoursInBill(timeEntryId, {
            [hours === 'total'
                ? 'totalHoursInMinutes'
                : hours === 'doubletime'
                ? 'doubletimeHoursInMinutes'
                : hours === 'overtime'
                ? 'overtimeHoursInMinutes'
                : 'regularHoursInMinutes']: totalMinutes,
        });
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
