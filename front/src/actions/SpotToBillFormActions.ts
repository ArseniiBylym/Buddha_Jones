import { ActivityHandler } from 'helpers/ActivityHandler';
import { AsyncHandler } from 'helpers/AsyncHandler';
import { ReorderToOptions } from 'invariables';
import _debounce from 'lodash-es/debounce';
import { action, toJS } from 'mobx';
import { FormattedInBillTimeEntry } from 'routes/SpotBilling/BillSpotForm';
import { AddingActivityToBillStatus } from 'store';
import { SpotToBillFormStore } from 'store/AllStores';
import {
    ActivityHours,
    SpotBillDiscount,
    SpotBillFormActivityTimeEntry,
    SpotBillFormData
    } from 'types/spotBilling';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';

export class SpotToBillFormActionsClass {
    onstructor() {
        this.scheduleSavingBillToApi = _debounce(this.scheduleSavingBillToApi, 6000);
    }

    @action
    public reset = () => {
        SpotToBillFormStore.billId = 0;
        SpotToBillFormStore.billTypeId = null;
        SpotToBillFormStore.billStatusId = 1;
        SpotToBillFormStore.billStatusName = 'Draft';

        SpotToBillFormStore.nextRowIdCounter = 1;
        SpotToBillFormStore.rows = [];
        SpotToBillFormStore.timeEntries = [];
        SpotToBillFormStore.spotsIdsAddedToBill = [];
        SpotToBillFormStore.selectedRateCardId = null;

        SpotToBillFormStore.addingActivityToBillStatus = 'none';

        SpotToBillFormStore.selectedActivities = [];
        SpotToBillFormStore.discount = {
            value: 0,
            isFixed: true,
        };
    };

    @action
    public initialize = (billData: SpotBillFormData) => {
        this.reset();

        SpotToBillFormStore.billId = billData.billId;
        SpotToBillFormStore.billStatusId = billData.billStatusId;
        SpotToBillFormStore.billStatusName = billData.billStatusName;
        SpotToBillFormStore.billTypeId = billData.billTypeId;

        SpotToBillFormStore.nextRowIdCounter = billData.rows.reduce((counter: number, row) => {
            if (row.id + 1 > counter) {
                counter = row.id + 1;
            }

            return counter;
        }, 1);

        SpotToBillFormStore.rows = billData.rows.sort((billA, billB) =>
            billA.sort < billB.sort ? -1 : billA.sort <= billB.sort ? 0 : 1
        );

        SpotToBillFormStore.timeEntries = billData.timeEntries;
        SpotToBillFormStore.selectedRateCardId = billData.selectedRateCardId;
        SpotToBillFormStore.spotsIdsAddedToBill = billData.selectedSpotsIds;
        SpotToBillFormStore.discount = billData.discount;
    };

    @action
    public changeBillType = (billTypeId: number | null) => {
        SpotToBillFormStore.billTypeId = billTypeId;

        this.saveBillToApi(SpotToBillFormStore.billId);
    };

    @action
    public addSpotToBill = (spotId: number) => {
        SpotToBillFormStore.spotsIdsAddedToBill.push(spotId);

        this.saveBillToApi(SpotToBillFormStore.billId);
    };

    @action
    public removeSpotFromBill = (spotId: number) => {
        const index = SpotToBillFormStore.spotsIdsAddedToBill.indexOf(spotId);
        if (index !== -1) {
            SpotToBillFormStore.spotsIdsAddedToBill = [
                ...SpotToBillFormStore.spotsIdsAddedToBill.slice(0, index),
                ...SpotToBillFormStore.spotsIdsAddedToBill.slice(index + 1),
            ];
        }

        this.saveBillToApi(SpotToBillFormStore.billId);
    };

    private hoursOnlyPositive = (hours: ActivityHours): ActivityHours => {
        return {
            totalHoursInMinutes: hours.totalHoursInMinutes > 0 ? hours.totalHoursInMinutes : 0,
            regularHoursInMinutes: hours.regularHoursInMinutes > 0 ? hours.regularHoursInMinutes : 0,
            overtimeHoursInMinutes: hours.overtimeHoursInMinutes > 0 ? hours.overtimeHoursInMinutes : 0,
            doubletimeHoursInMinutes: hours.doubletimeHoursInMinutes > 0 ? hours.doubletimeHoursInMinutes : 0,
        };
    };

    private calculateAdjustedHours = (
        activityTime: number,
        values: ActivityHours,
        lastChanged: 'total' | 'regular' | 'overtime' | 'doubletime'
    ): ActivityHours => {
        let remainingTime = activityTime;
        let hours: ActivityHours = values;

        if (lastChanged === 'doubletime') {
            remainingTime -= values.doubletimeHoursInMinutes;
        } else if (lastChanged === 'overtime') {
            remainingTime -= values.overtimeHoursInMinutes;
        } else if (lastChanged === 'regular') {
            remainingTime -= values.regularHoursInMinutes;
        }

        // When user attempts to enter more time than max allowed into a single field
        if (remainingTime <= 0) {
            hours.totalHoursInMinutes = activityTime;
            hours.regularHoursInMinutes = 0;
            hours.overtimeHoursInMinutes = 0;
            hours.doubletimeHoursInMinutes = 0;

            if (lastChanged === 'doubletime') {
                hours.doubletimeHoursInMinutes = activityTime;
            } else if (lastChanged === 'overtime') {
                hours.overtimeHoursInMinutes = activityTime;
            } else {
                hours.regularHoursInMinutes = activityTime;
            }

            return this.hoursOnlyPositive(hours);
        }

        if (lastChanged === 'doubletime') {
            remainingTime -= values.overtimeHoursInMinutes;
            if (remainingTime <= 0) {
                hours.overtimeHoursInMinutes = activityTime - hours.doubletimeHoursInMinutes;
                hours.regularHoursInMinutes = 0;
                return this.hoursOnlyPositive(hours);
            }

            remainingTime -= values.regularHoursInMinutes;
            if (remainingTime <= 0) {
                hours.regularHoursInMinutes =
                    activityTime - hours.doubletimeHoursInMinutes - hours.overtimeHoursInMinutes;
                return this.hoursOnlyPositive(hours);
            }

            if (remainingTime > 0) {
                hours.regularHoursInMinutes += remainingTime;
            }

            return this.hoursOnlyPositive(hours);
        } else if (lastChanged === 'overtime') {
            remainingTime -= values.doubletimeHoursInMinutes;
            if (remainingTime <= 0) {
                hours.doubletimeHoursInMinutes = activityTime - hours.overtimeHoursInMinutes;
                hours.regularHoursInMinutes = 0;
                return this.hoursOnlyPositive(hours);
            }

            remainingTime -= values.regularHoursInMinutes;
            if (remainingTime <= 0) {
                hours.regularHoursInMinutes =
                    activityTime - hours.overtimeHoursInMinutes - hours.doubletimeHoursInMinutes;
                return this.hoursOnlyPositive(hours);
            }

            if (remainingTime > 0) {
                hours.regularHoursInMinutes += remainingTime;
            }

            return this.hoursOnlyPositive(hours);
        } else if (lastChanged === 'regular') {
            remainingTime -= values.doubletimeHoursInMinutes;
            if (remainingTime <= 0) {
                hours.doubletimeHoursInMinutes = activityTime - hours.regularHoursInMinutes;
                hours.overtimeHoursInMinutes = 0;
                return this.hoursOnlyPositive(hours);
            }

            remainingTime -= values.overtimeHoursInMinutes;
            if (remainingTime <= 0) {
                hours.overtimeHoursInMinutes =
                    activityTime - hours.regularHoursInMinutes - hours.doubletimeHoursInMinutes;
                return this.hoursOnlyPositive(hours);
            }

            if (remainingTime > 0) {
                hours.overtimeHoursInMinutes += remainingTime;
            }

            return this.hoursOnlyPositive(hours);
        } else if (lastChanged === 'total') {
            remainingTime -= values.doubletimeHoursInMinutes;
            if (remainingTime <= 0) {
                hours.doubletimeHoursInMinutes = activityTime;
                hours.overtimeHoursInMinutes = 0;
                hours.regularHoursInMinutes = 0;
                return this.hoursOnlyPositive(hours);
            } else {
                hours.doubletimeHoursInMinutes = values.doubletimeHoursInMinutes;
            }

            remainingTime -= values.overtimeHoursInMinutes;
            if (remainingTime <= 0) {
                hours.overtimeHoursInMinutes = activityTime - hours.doubletimeHoursInMinutes;
                hours.regularHoursInMinutes = 0;
                return this.hoursOnlyPositive(hours);
            } else {
                hours.overtimeHoursInMinutes = values.overtimeHoursInMinutes;
            }

            remainingTime -= values.regularHoursInMinutes;
            if (remainingTime <= 0) {
                hours.regularHoursInMinutes =
                    activityTime - hours.doubletimeHoursInMinutes - hours.overtimeHoursInMinutes;
                return this.hoursOnlyPositive(hours);
            } else {
                hours.regularHoursInMinutes = values.regularHoursInMinutes;
            }

            if (remainingTime > 0) {
                hours.regularHoursInMinutes += remainingTime;
            }
        }

        return this.hoursOnlyPositive(hours);
    };

    @action
    public addTimeEntryToActivitiesSelection = (timeEntry: FormattedInBillTimeEntry, hours: Partial<ActivityHours>) => {
        let object: SpotBillFormActivityTimeEntry = {
            timeEntryId: timeEntry.timeEntryId,
            activityId: timeEntry.activityId,
            activityName: timeEntry.activityName,
            spotId: timeEntry.spotId,
            spotName: timeEntry.spotName,
            versionId: timeEntry.versionId,
            versionName: timeEntry.versionName,
            hoursAreSplit:
                (typeof hours.overtimeHoursInMinutes === 'number' && hours.overtimeHoursInMinutes > 0) ||
                (typeof hours.doubletimeHoursInMinutes === 'number' && hours.doubletimeHoursInMinutes > 0),
            durationInMinutes: timeEntry.durationInMinutes,
            totalAdjustedMinutes: typeof hours.totalHoursInMinutes === 'number' ? hours.totalHoursInMinutes : 0,
            regularBillableMinutes: typeof hours.regularHoursInMinutes === 'number' ? hours.regularHoursInMinutes : 0,
            overtimeBillableMinutes:
                typeof hours.overtimeHoursInMinutes === 'number' ? hours.overtimeHoursInMinutes : 0,
            doubletimeBillableMinutes:
                typeof hours.doubletimeHoursInMinutes === 'number' ? hours.doubletimeHoursInMinutes : 0,
        };

        const index = SpotToBillFormStore.selectedActivitiesIds.indexOf(timeEntry.timeEntryId);
        if (index !== -1) {
            const time = this.calculateAdjustedHours(
                typeof hours.totalHoursInMinutes === 'number'
                    ? hours.totalHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].totalAdjustedMinutes,
                {
                    totalHoursInMinutes:
                        typeof hours.totalHoursInMinutes === 'number'
                            ? hours.totalHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].totalAdjustedMinutes,
                    regularHoursInMinutes:
                        typeof hours.regularHoursInMinutes === 'number'
                            ? hours.regularHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].regularBillableMinutes,
                    overtimeHoursInMinutes:
                        typeof hours.overtimeHoursInMinutes === 'number'
                            ? hours.overtimeHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].overtimeBillableMinutes,
                    doubletimeHoursInMinutes:
                        typeof hours.doubletimeHoursInMinutes === 'number'
                            ? hours.doubletimeHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].doubletimeBillableMinutes,
                },
                typeof hours.totalHoursInMinutes === 'number'
                    ? 'total'
                    : typeof hours.regularHoursInMinutes === 'number'
                    ? 'regular'
                    : typeof hours.overtimeHoursInMinutes === 'number'
                    ? 'overtime'
                    : 'doubletime'
            );

            object.totalAdjustedMinutes = time.totalHoursInMinutes;
            object.regularBillableMinutes = time.regularHoursInMinutes;
            object.overtimeBillableMinutes = time.overtimeHoursInMinutes;
            object.doubletimeBillableMinutes = time.doubletimeHoursInMinutes;
            object.hoursAreSplit =
                object.overtimeBillableMinutes > 0 ||
                object.doubletimeBillableMinutes > 0 ||
                SpotToBillFormStore.selectedActivities[index].hoursAreSplit;

            SpotToBillFormStore.selectedActivities[index] = object;
        } else {
            SpotToBillFormStore.selectedActivities.push({
                ...object,
                regularBillableMinutes:
                    object.regularBillableMinutes <= 0 &&
                    object.overtimeBillableMinutes <= 0 &&
                    object.doubletimeBillableMinutes <= 0
                        ? object.totalAdjustedMinutes
                        : object.regularBillableMinutes,
            });
        }
    };

    @action
    public adjustTimeEntryHoursInBill = (timeEntryId: number, hours: Partial<ActivityHours>) => {
        const index = SpotToBillFormStore.timeEntries.findIndex(timeEntry => timeEntry.timeEntryId === timeEntryId);
        if (index !== -1) {
            const time = this.calculateAdjustedHours(
                typeof hours.totalHoursInMinutes === 'number'
                    ? hours.totalHoursInMinutes
                    : SpotToBillFormStore.timeEntries[index].totalAdjustedMinutes,
                {
                    totalHoursInMinutes:
                        typeof hours.totalHoursInMinutes === 'number'
                            ? hours.totalHoursInMinutes
                            : SpotToBillFormStore.timeEntries[index].totalAdjustedMinutes,
                    regularHoursInMinutes:
                        typeof hours.regularHoursInMinutes === 'number'
                            ? hours.regularHoursInMinutes
                            : SpotToBillFormStore.timeEntries[index].regularBillableMinutes,
                    overtimeHoursInMinutes:
                        typeof hours.overtimeHoursInMinutes === 'number'
                            ? hours.overtimeHoursInMinutes
                            : SpotToBillFormStore.timeEntries[index].overtimeBillableMinutes,
                    doubletimeHoursInMinutes:
                        typeof hours.doubletimeHoursInMinutes === 'number'
                            ? hours.doubletimeHoursInMinutes
                            : SpotToBillFormStore.timeEntries[index].doubletimeBillableMinutes,
                },
                typeof hours.totalHoursInMinutes === 'number'
                    ? 'total'
                    : typeof hours.regularHoursInMinutes === 'number'
                    ? 'regular'
                    : typeof hours.overtimeHoursInMinutes === 'number'
                    ? 'overtime'
                    : 'doubletime'
            );

            SpotToBillFormStore.timeEntries[index].totalAdjustedMinutes = time.totalHoursInMinutes;
            SpotToBillFormStore.timeEntries[index].regularBillableMinutes = time.regularHoursInMinutes;
            SpotToBillFormStore.timeEntries[index].overtimeBillableMinutes = time.overtimeHoursInMinutes;
            SpotToBillFormStore.timeEntries[index].doubletimeBillableMinutes = time.doubletimeHoursInMinutes;
        }
    };

    @action
    public splitTimeEntryHoursInActivitiesSelection = (timeEntryId: number) => {
        const index = SpotToBillFormStore.selectedActivitiesIds.indexOf(timeEntryId);
        if (index !== -1) {
            SpotToBillFormStore.selectedActivities[index].hoursAreSplit = true;
        }
    };

    @action
    public removeTimeEntryFromActivitiesSelection = (timeEntryId: number) => {
        const index = SpotToBillFormStore.selectedActivitiesIds.indexOf(timeEntryId);
        if (index !== -1) {
            SpotToBillFormStore.selectedActivities = [
                ...SpotToBillFormStore.selectedActivities.slice(0, index),
                ...SpotToBillFormStore.selectedActivities.slice(index + 1),
            ];
        }
    };

    @action public changeSelectedRateCard = (rateCardId: number) => {
        SpotToBillFormStore.selectedRateCardId = rateCardId;

        this.saveBillToApi(SpotToBillFormStore.billId);
    };

    @action private changeAddingActivityToBillStatus = (status: AddingActivityToBillStatus) => {
        SpotToBillFormStore.addingActivityToBillStatus = status;
    };

    @action
    public constructActivityNameFromTimeEntriesIds = (timeEntriesIds: number[]) => {
        const timeEntries = SpotToBillFormStore.timeEntries.filter(timeEntry =>
            timeEntriesIds.includes(timeEntry.timeEntryId)
        );

        return ActivityHandler.constructActivityName(timeEntries);
    };

    @action
    public recreateNameForRow = (rowId: number) => {
        const row = SpotToBillFormStore.rows.find(r => r.id === rowId);
        if (row) {
            const timeEntries =
                row.timeEntriesIds.length > 0
                    ? SpotToBillFormStore.timeEntries.filter(
                          timeEntry => row.timeEntriesIds.indexOf(timeEntry.timeEntryId) !== -1
                      )
                    : [];

            row.name = ActivityHandler.constructActivityName(timeEntries);
        }
    };

    @action
    public addSelectedActivitiesToBillAsNewRow = async (timeEntries: SpotBillFormActivityTimeEntry[]) => {
        this.changeAddingActivityToBillStatus('saving');

        // Push individual time entries to flat array
        SpotToBillFormStore.timeEntries.push(...timeEntries);

        // Push combined time entries to new row
        SpotToBillFormStore.rows.push({
            id: SpotToBillFormStore.nextRowIdCounter,
            sort: SpotToBillFormStore.nextRowIdCounter,
            name: ActivityHandler.constructActivityName(timeEntries),
            note: null,
            discount: {
                value: 0,
                isFixed: true,
            },
            rateType: SpotBillActivityRateType.Hourly,
            rateAmount: null,
            rateFlatOrFirstStageId: null,
            timeEntriesIds: timeEntries.map(timeEntry => timeEntry.timeEntryId),
        });

        // Iterate rows ID counter
        SpotToBillFormStore.nextRowIdCounter++;

        // Clear user selection
        SpotToBillFormStore.selectedActivities = [];

        // NOTE: Fake delay - remove when actual sync is enabled
        await AsyncHandler.timeout(1000);

        this.saveBillToApi(SpotToBillFormStore.billId);

        this.changeAddingActivityToBillStatus('success');

        setTimeout(() => {
            if (SpotToBillFormStore.addingActivityToBillStatus === 'success') {
                this.changeAddingActivityToBillStatus('none');
            }
        }, 3000);
    };

    @action
    moveTimeEntryToOtherRow = (timeEntryId: number, rowId: number | null) => {
        const timeEntry = toJS(SpotToBillFormStore.timeEntries.find(te => te.timeEntryId === timeEntryId));
        if (timeEntry) {
            // Remove time entry from current row
            this.removeTimeEntryFromBill(timeEntryId, false);

            // Move to other row
            if (rowId) {
                // Move to other row
                SpotToBillFormStore.rows.some(row => {
                    if (row.id === rowId) {
                        row.timeEntriesIds.push(timeEntryId);
                        this.recreateNameForRow(row.id);

                        return true;
                    }

                    return false;
                });
            } else {
                // Create new hourly row
                SpotToBillFormStore.rows.push({
                    id: SpotToBillFormStore.nextRowIdCounter,
                    sort: SpotToBillFormStore.nextRowIdCounter,
                    name: ActivityHandler.constructActivityName([timeEntry]),
                    note: null,
                    discount: {
                        value: 0,
                        isFixed: true,
                    },
                    rateType: SpotBillActivityRateType.Hourly,
                    rateAmount: null,
                    rateFlatOrFirstStageId: null,
                    timeEntriesIds: [timeEntryId],
                });

                // Iterate rows ID counter
                SpotToBillFormStore.nextRowIdCounter++;
            }

            // Save changes
            this.saveBillToApi(SpotToBillFormStore.billId);
        }
    };

    @action
    removeRowFromBill = (rowId: number) => {
        // Filter out rows which have been scheduled for deletion
        SpotToBillFormStore.rows = SpotToBillFormStore.rows.filter(row => {
            // If row is not in selection, leave it be
            if (row.id !== rowId) {
                return true;
            }

            // If row is in selection, remove its time entries first
            SpotToBillFormStore.timeEntries = SpotToBillFormStore.timeEntries.filter(
                (timeEntry, timeEntryIndex) => row.timeEntriesIds.indexOf(timeEntry.timeEntryId) === -1
            );

            // Then filter out the row as well
            return false;
        });

        this.saveBillToApi(SpotToBillFormStore.billId);
    };

    @action
    removeTimeEntryFromBill = (timeEntryId: number, removeFromTimeEntries: boolean = true) => {
        // Remove time entry
        if (removeFromTimeEntries) {
            SpotToBillFormStore.timeEntries = SpotToBillFormStore.timeEntries.filter(
                timeEntry => timeEntry.timeEntryId !== timeEntryId
            );
        }

        // Remove time entries from rows
        SpotToBillFormStore.rows = SpotToBillFormStore.rows.filter(row => {
            const timeEntriesLengthBefore = row.timeEntriesIds.length;
            row.timeEntriesIds = row.timeEntriesIds.filter(id => id !== timeEntryId);

            if (row.timeEntriesIds.length <= 0) {
                return false;
            }

            // Update row name if count of time entries in it changes
            if (timeEntriesLengthBefore !== row.timeEntriesIds.length) {
                this.recreateNameForRow(row.id);
            }

            return true;
        });

        // Update the bill
        this.saveBillToApi(SpotToBillFormStore.billId);
    };

    @action
    public changeBillRowRateType = (
        rowId: number,
        rateType: SpotBillActivityRateType,
        rateFlatOrFirstStageId: number | null = null,
        rateAmount: number | null = null
    ) => {
        const rowIndex = SpotToBillFormStore.rows.findIndex(r => r.id === rowId);
        if (rowIndex !== -1) {
            SpotToBillFormStore.rows[rowIndex].rateType = rateType;
            SpotToBillFormStore.rows[rowIndex].rateFlatOrFirstStageId = rateFlatOrFirstStageId;
            SpotToBillFormStore.rows[rowIndex].rateAmount = rateAmount;

            this.saveBillToApi(SpotToBillFormStore.billId);
        }
    };

    @action
    public changeBillRowNote = (rowId: number, note: string | null) => {
        const rowIndex = SpotToBillFormStore.rows.findIndex(r => r.id === rowId);
        if (rowIndex !== -1) {
            SpotToBillFormStore.rows[rowIndex].note =
                note !== null && SpotToBillFormStore.rows[rowIndex].name === note ? null : note;

            this.saveBillToApi(SpotToBillFormStore.billId);
        }
    };

    @action
    public changeBillRowAmount = (rowId: number, amount: number | null) => {
        const rowIndex = SpotToBillFormStore.rows.findIndex(r => r.id === rowId);
        if (rowIndex !== -1) {
            SpotToBillFormStore.rows[rowIndex].rateAmount = amount;

            this.scheduleSavingBillToApi(SpotToBillFormStore.billId);
        }
    };

    @action
    public changeBillRowDiscount = (rowId: number, discount: SpotBillDiscount) => {
        const rowIndex = SpotToBillFormStore.rows.findIndex(r => r.id === rowId);
        if (rowIndex !== -1) {
            SpotToBillFormStore.rows[rowIndex].discount.value = discount.value;
            SpotToBillFormStore.rows[rowIndex].discount.isFixed = discount.isFixed;

            this.scheduleSavingBillToApi(SpotToBillFormStore.billId);
        }
    };

    @action
    public changeBillDiscount = (discount: Partial<SpotBillDiscount>) => {
        if (typeof discount.isFixed !== 'undefined') {
            SpotToBillFormStore.discount.isFixed = discount.isFixed;
        }

        if (typeof discount.value !== 'undefined') {
            SpotToBillFormStore.discount.value = discount.value;
        }

        this.scheduleSavingBillToApi(SpotToBillFormStore.billId);
    };

    public checkIfSpotIsInBill = (spotId: number): boolean => {
        if (SpotToBillFormStore.spotsIdsAddedToBill.some(spot => spot === spotId)) {
            return true;
        }

        return false;
    };

    public checkIfTimeEntryIsInBill = (timeEntryId: number): boolean => {
        if (SpotToBillFormStore.timeEntries.findIndex(timeEntry => timeEntry.timeEntryId === timeEntryId) !== -1) {
            return true;
        }

        return false;
    };

    @action
    public reorderRow = (rowIndex: number, rowsCount: number, reorderTo: ReorderToOptions) => {
        const row = SpotToBillFormStore.rows[rowIndex];
        if (row) {
            let rows = [
                ...SpotToBillFormStore.rows.slice(0, rowIndex),
                ...SpotToBillFormStore.rows.slice(rowIndex + 1),
            ];

            switch (reorderTo) {
                case 'top':
                    rows = [row, ...rows];
                    break;

                case 'bottom':
                    rows = [...rows, row];
                    break;

                case 'up':
                    const beforeIndex = rowIndex - 1 >= 0 ? rowIndex - 1 : 0;
                    rows = [...rows.slice(0, beforeIndex), row, ...rows.slice(beforeIndex)];
                    break;

                case 'down':
                    const afterIndex = rowIndex + 1 < rowsCount ? rowIndex + 1 : rowsCount - 1;
                    rows = [...rows.slice(0, afterIndex), row, ...rows.slice(afterIndex)];
                    break;

                default:
                    break;
            }

            SpotToBillFormStore.rows = rows.map((mappedRow, mappedRowIndex) => ({
                ...mappedRow,
                sort: mappedRowIndex + 1,
            }));

            this.scheduleSavingBillToApi(SpotToBillFormStore.billId);
        }
    };

    public scheduleSavingBillToApi = (billId: number) => {
        this.saveBillToApi(billId);
    };

    @action
    public saveBillToApi = async (billId: number) => {
        if (SpotToBillFormStore.billId !== billId) {
            return;
        }

        try {
            SpotToBillFormStore.savingBillStatus = 'saving';

            await AsyncHandler.timeout(1000);

            SpotToBillFormStore.savingBillStatus = 'success';

            await AsyncHandler.timeout(2000);

            if (SpotToBillFormStore.savingBillStatus === 'success') {
                SpotToBillFormStore.savingBillStatus = 'none';
            }
        } catch (error) {
            SpotToBillFormStore.savingBillStatus = 'error';
        }
    };
}
