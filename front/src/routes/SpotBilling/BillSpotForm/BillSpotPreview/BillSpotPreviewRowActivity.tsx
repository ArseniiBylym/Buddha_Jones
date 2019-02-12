import { SpotToBillFormActions } from 'actions';
import { AdjustedMinutesAboveOrBelow } from 'components/Buddha';
import { Paragraph } from 'components/Content';
import {
    DropdownContainer,
    DurationCounter,
    OptionsList,
    OptionsListOptionProp
    } from 'components/Form';
import { CardContentTableRow } from 'components/Section';
import { ActivityHandler } from 'helpers/ActivityHandler';
import { DateHandler } from 'helpers/DateHandler';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { SpotBillFormActivityGroup, SpotBillFormActivityTimeEntry } from 'types/spotBilling';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';

const s = require('./BillSpotPreviewRowActivity.css');

interface Props extends AppOnlyStoreState {
    onRequestTimeEntryDeletion: (timeEntryId: number) => void;
    index: number;
    timeEntry: SpotBillFormActivityTimeEntry;
    timeEntriesCountInRow: number;
    activity: SpotBillFormActivityGroup;
    studioRateCardValues: StudioRateCardEntryFromApi[];
    rateType: SpotBillActivityRateType;
    isInEditMode: boolean;
}

@inject('store')
@observer
export class BillSpotPreviewRowActivity extends React.Component<Props, {}> {
    private activityActionsDropdown: DropdownContainer | null = null;

    @computed private get timeEntryActivityRate(): number {
        return (this.props.isInEditMode && this.props.rateType === SpotBillActivityRateType.Hourly) ||
            (!this.props.isInEditMode && this.props.activity.rateType === SpotBillActivityRateType.Hourly)
            ? ActivityHandler.calculateBaseActivityRate(
                  this.props.timeEntry.activityId,
                  this.props.studioRateCardValues
              )
            : 0;
    }

    @computed
    private get timeEntryAmount(): number {
        let timeEntryAmount: number = 0;
        let regularAmount: number = 0;
        let overtimeAmount: number = 0;
        let doubletimeAmount: number = 0;

        if (
            (this.props.isInEditMode && this.props.rateType === SpotBillActivityRateType.Hourly) ||
            (!this.props.isInEditMode && this.props.activity.rateType === SpotBillActivityRateType.Hourly)
        ) {
            regularAmount = ActivityHandler.calculateRegularHoursAmount(
                this.props.timeEntry.regularBillableMinutes,
                this.timeEntryActivityRate
            );
            overtimeAmount = ActivityHandler.calculateOvertimeHoursAmount(
                this.props.timeEntry.overtimeBillableMinutes,
                this.timeEntryActivityRate
            );
            doubletimeAmount = ActivityHandler.calculateDoubletimeHoursAmount(
                this.props.timeEntry.doubletimeBillableMinutes,
                this.timeEntryActivityRate
            );

            timeEntryAmount =
                this.props.activity.rateType !== SpotBillActivityRateType.Hourly
                    ? this.timeEntryActivityRate
                    : regularAmount + overtimeAmount + doubletimeAmount;
        }

        return timeEntryAmount;
    }

    @computed
    private get moveTimeEntryOptions(): OptionsListOptionProp[] {
        let otherRowIndex: number = 1;
        const options: OptionsListOptionProp[] = this.props.store!.spotToBillForm.rows.reduce(
            (optionsList: OptionsListOptionProp[], otherRow) => {
                if (otherRow.timeEntriesIds.indexOf(this.props.timeEntry.timeEntryId) === -1) {
                    optionsList.push({
                        key: 'move-to-row-' + otherRow.id,
                        value: otherRow.id,
                        label:
                            'Move time entry to row #' +
                            otherRowIndex +
                            ': ' +
                            (otherRow.note ? otherRow.note : otherRow.name),
                    });
                }

                otherRowIndex++;
                return optionsList;
            },
            []
        );

        const row = this.props.store!.spotToBillForm.rows.find(
            r => r.timeEntriesIds.indexOf(this.props.timeEntry.timeEntryId) !== -1
        );
        if (row && row.timeEntriesIds.length > 1) {
            options.push({
                key: 'move-to-new-row',
                value: 'newrow',
                label: 'Move time entry to new row',
            });
        }

        return options;
    }

    public render() {
        const { timeEntry, isInEditMode } = this.props;

        return (
            <CardContentTableRow className={s.timeEntryRow} design="compact">
                <div className={s.timeEntryName}>
                    <Paragraph size="small" type="brown">
                        {'#' + (this.props.index + 1) + ' ' + ActivityHandler.constructActivityName([timeEntry])}
                    </Paragraph>
                </div>

                <div>
                    <Paragraph size="small" align="right" type={isInEditMode ? 'blue' : 'brown'} bold={true}>
                        {DateHandler.convertTotalMinutesToHM(timeEntry.durationInMinutes)}
                    </Paragraph>
                </div>

                <div>
                    {(isInEditMode && (
                        <DurationCounter
                            align="right"
                            onChange={this.handleTimeEntryHoursChange(timeEntry.timeEntryId, 'total')}
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
                    {(isInEditMode && (
                        <DurationCounter
                            align="right"
                            onChange={this.handleTimeEntryHoursChange(timeEntry.timeEntryId, 'regular')}
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
                                ? DateHandler.convertTotalMinutesToHM(timeEntry.regularBillableMinutes) +
                                  (this.props.activity.rateType === SpotBillActivityRateType.Hourly
                                      ? ' × ' +
                                        MoneyHandler.formatAsDollars(
                                            ActivityHandler.calculateRegularRate(this.timeEntryActivityRate)
                                        )
                                      : '')
                                : '0min'}
                        </Paragraph>
                    )}
                </div>

                <div>
                    {(isInEditMode && (
                        <DurationCounter
                            align="right"
                            onChange={this.handleTimeEntryHoursChange(timeEntry.timeEntryId, 'overtime')}
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
                                ? DateHandler.convertTotalMinutesToHM(timeEntry.overtimeBillableMinutes) +
                                  (this.props.activity.rateType === SpotBillActivityRateType.Hourly
                                      ? ' × ' +
                                        MoneyHandler.formatAsDollars(
                                            ActivityHandler.calculateOvertimeRate(this.timeEntryActivityRate)
                                        )
                                      : '')
                                : '0min'}
                        </Paragraph>
                    )}
                </div>

                <div>
                    {(isInEditMode && (
                        <DurationCounter
                            align="right"
                            onChange={this.handleTimeEntryHoursChange(timeEntry.timeEntryId, 'doubletime')}
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
                                ? DateHandler.convertTotalMinutesToHM(timeEntry.doubletimeBillableMinutes) +
                                  (this.props.activity.rateType === SpotBillActivityRateType.Hourly
                                      ? ' × ' +
                                        MoneyHandler.formatAsDollars(
                                            ActivityHandler.calculateDoubletimeRate(this.timeEntryActivityRate)
                                        )
                                      : '')
                                : '0min'}
                        </Paragraph>
                    )}
                </div>

                <div className={s.timeEntryAmount}>
                    <Paragraph size="small" align="right" bold={true}>
                        {MoneyHandler.formatAsDollars(this.timeEntryAmount)}
                    </Paragraph>

                    {this.props.isInEditMode && (
                        <DropdownContainer
                            ref={this.referenceActivityActionsDropdown}
                            className={s.timeEntryActions}
                            minWidth={320}
                        >
                            <OptionsList
                                onChange={this.handleTimeEntryActions}
                                options={[
                                    ...this.moveTimeEntryOptions,
                                    ...(this.moveTimeEntryOptions.length > 0
                                        ? [
                                              {
                                                  key: 'sep-1',
                                                  value: null,
                                                  label: '---',
                                              },
                                          ]
                                        : []),
                                    {
                                        key: 'del',
                                        value: 'delete',
                                        label: 'Remove time entry from the bill',
                                    },
                                ]}
                            />
                        </DropdownContainer>
                    )}
                </div>
            </CardContentTableRow>
        );
    }

    private referenceActivityActionsDropdown = (ref: DropdownContainer) => (this.activityActionsDropdown = ref);

    private handleTimeEntryActions = (option: { value: string | null; label: string }) => {
        if (option.value === 'delete') {
            this.handleDeletingTimeEntryRow();
        } else if (option.value === 'newrow') {
            this.handleMovingTimeEntreToNewRow();
        } else if (typeof option.value === 'number') {
            this.handleMovingTimeEntryBetweenRows(option.value);
        }

        if (this.activityActionsDropdown) {
            this.activityActionsDropdown.closeDropdown();
        }
    };

    private handleMovingTimeEntryBetweenRows = (rowId: number) => {
        SpotToBillFormActions.moveTimeEntryToOtherRow(this.props.timeEntry.timeEntryId, rowId);
    };

    private handleMovingTimeEntreToNewRow = () => {
        SpotToBillFormActions.moveTimeEntryToOtherRow(this.props.timeEntry.timeEntryId, null);
    };

    private handleDeletingTimeEntryRow = () => {
        this.props.onRequestTimeEntryDeletion(this.props.timeEntry.timeEntryId);
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
}
