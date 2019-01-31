import { ActivityHandler } from 'helpers/ActivityHandler';
import { AsyncHandler } from 'helpers/AsyncHandler';
import { action } from 'mobx';
import { FormattedInBillTimeEntry } from 'routes/SpotBilling/BillSpotForm';
import { AddingActivityToBillStatus } from 'store';
import { SpotToBillFormStore } from 'store/AllStores';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';
import {
    ActivityHours,
    SpotBillFormActivityTimeEntry,
    SpotBillFormData,
    SpotBillFormActivityGroup,
    SpotBillDiscount,
} from 'types/spotBilling';

export class SpotToBillFormActionsClass {
    @action
    public reset = () => {
        SpotToBillFormStore.typeId = null;
        SpotToBillFormStore.typeName = null;
        SpotToBillFormStore.rows = [];
        SpotToBillFormStore.timeEntries = [];
        SpotToBillFormStore.spotsIdsAddedToBill = [];
        SpotToBillFormStore.selectedRateCardId = null;

        SpotToBillFormStore.addingActivityToBillStatus = 'none';
        SpotToBillFormStore.showBillPreview = false;

        SpotToBillFormStore.selectedActivities = [];
    };

    @action
    public initialize = (billData: SpotBillFormData) => {
        this.reset();

        SpotToBillFormStore.typeId = billData.typeId;
        SpotToBillFormStore.typeName = billData.typeName;
        SpotToBillFormStore.rows = billData.rows;
        SpotToBillFormStore.timeEntries = billData.timeEntries;
        SpotToBillFormStore.selectedRateCardId = billData.selectedRateCardId;
        SpotToBillFormStore.spotsIdsAddedToBill = billData.selectedSpots;
    };

    @action
    public addSpotToBill = (spotId: number) => {
        SpotToBillFormStore.spotsIdsAddedToBill.push(spotId);
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
        lastChanged: 'regular' | 'overtime' | 'doubletime'
    ): ActivityHours => {
        let remainingTime = activityTime;
        let hours: ActivityHours = values;

        if (lastChanged === 'doubletime') {
            remainingTime -= values.doubletimeHoursInMinutes;
        } else if (lastChanged === 'overtime') {
            remainingTime -= values.overtimeHoursInMinutes;
        } else {
            remainingTime -= values.regularHoursInMinutes;
        }

        if (remainingTime <= 0) {
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

            return this.hoursOnlyPositive(hours);
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
            totalHours: typeof hours.totalHoursInMinutes === 'number' ? hours.totalHoursInMinutes : 0,
            regularHours: typeof hours.regularHoursInMinutes === 'number' ? hours.regularHoursInMinutes : 0,
            overtimeHours: typeof hours.overtimeHoursInMinutes === 'number' ? hours.overtimeHoursInMinutes : 0,
            doubletimeHours: typeof hours.doubletimeHoursInMinutes === 'number' ? hours.doubletimeHoursInMinutes : 0,
        };

        const index = SpotToBillFormStore.selectedActivitiesIds.indexOf(timeEntry.timeEntryId);
        if (index !== -1) {
            const time = this.calculateAdjustedHours(
                timeEntry.durationInMinutes,
                {
                    totalHoursInMinutes:
                        typeof hours.totalHoursInMinutes === 'number'
                            ? hours.totalHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].totalHours,
                    regularHoursInMinutes:
                        typeof hours.regularHoursInMinutes === 'number'
                            ? hours.regularHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].regularHours,
                    overtimeHoursInMinutes:
                        typeof hours.overtimeHoursInMinutes === 'number'
                            ? hours.overtimeHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].overtimeHours,
                    doubletimeHoursInMinutes:
                        typeof hours.doubletimeHoursInMinutes === 'number'
                            ? hours.doubletimeHoursInMinutes
                            : SpotToBillFormStore.selectedActivities[index].doubletimeHours,
                },
                typeof hours.regularHoursInMinutes === 'number'
                    ? 'regular'
                    : typeof hours.overtimeHoursInMinutes === 'number'
                    ? 'overtime'
                    : 'doubletime'
            );

            object.regularHours = time.regularHoursInMinutes;
            object.overtimeHours = time.overtimeHoursInMinutes;
            object.doubletimeHours = time.doubletimeHoursInMinutes;
            object.hoursAreSplit =
                object.overtimeHours > 0 ||
                object.doubletimeHours > 0 ||
                SpotToBillFormStore.selectedActivities[index].hoursAreSplit;

            SpotToBillFormStore.selectedActivities[index] = object;
        } else {
            SpotToBillFormStore.selectedActivities.push(object);
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
    };

    @action private changeAddingActivityToBillStatus = (status: AddingActivityToBillStatus) => {
        SpotToBillFormStore.addingActivityToBillStatus = status;
    };

    @action
    public addSelectedActivitiesToBillAsNewRow = async (timeEntries: SpotBillFormActivityTimeEntry[]) => {
        this.changeAddingActivityToBillStatus('saving');

        SpotToBillFormStore.timeEntries.push(...timeEntries);

        const activities: {
            [key: string]: SpotBillFormActivityGroup;
        } = timeEntries.reduce((combinations: { [key: string]: SpotBillFormActivityGroup }, timeEntry) => {
            const key = ActivityHandler.constructActivityKey(
                timeEntry.activityId,
                timeEntry.spotId,
                timeEntry.versionId
            );
            if (combinations[key]) {
                combinations[key].timeEntriesIds.push(timeEntry.timeEntryId);
                return combinations;
            }

            combinations[key] = {
                name: '',
                note: null,
                rateType: SpotBillActivityRateType.Hourly,
                rateAmount: null,
                rateFlatOrFirstStageId: null,
                timeEntriesIds: [timeEntry.timeEntryId],
            };

            return combinations;
        }, {});

        const rows: SpotBillFormActivityGroup[] = Object.keys(activities).map(activityKey => {
            const row = activities[activityKey];
            const rowTimeEntries = timeEntries.filter(
                timeEntry => row.timeEntriesIds.indexOf(timeEntry.timeEntryId) !== -1
            );

            return {
                ...row,
                name: ActivityHandler.constructActivityName(rowTimeEntries),
            };
        });

        SpotToBillFormStore.rows.push(...rows);
        SpotToBillFormStore.selectedActivities = [];

        // NOTE: Fake delay - remove when actual sync is enabled
        await AsyncHandler.timeout(1000);

        this.changeAddingActivityToBillStatus('success');

        setTimeout(() => {
            if (SpotToBillFormStore.addingActivityToBillStatus === 'success') {
                this.changeAddingActivityToBillStatus('none');
            }
        }, 3000);
    };

    @action
    public toggleBillPreview = (show?: boolean) => {
        SpotToBillFormStore.showBillPreview = typeof show !== 'undefined' ? show : !SpotToBillFormStore.showBillPreview;
    };

    @action
    public changeBillRowRateType = (
        activityIndex: number,
        rateType: SpotBillActivityRateType,
        rateFlatOrFirstStageId: number | null = null,
        rateAmount: number | null = null
    ) => {
        if (SpotToBillFormStore.rows[activityIndex]) {
            SpotToBillFormStore.rows[activityIndex].rateType = rateType;
            SpotToBillFormStore.rows[activityIndex].rateFlatOrFirstStageId = rateFlatOrFirstStageId;
            SpotToBillFormStore.rows[activityIndex].rateAmount = rateAmount;
        }
    };

    @action
    public changeBillRowNote = (index: number, note: string | null) => {
        if (SpotToBillFormStore.rows[index]) {
            SpotToBillFormStore.rows[index].note =
                note !== null && SpotToBillFormStore.rows[index].name === note ? null : note;
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
    };

    public checkIfSpotIsInBill = (spotId: number): boolean => {
        if (SpotToBillFormStore.spotsIdsAddedToBill.some(spot => spot === spotId)) {
            return true;
        }

        return false;
    };

    public checkIfTimeEntryIsInBill = (timeEntryId: number): boolean => {
        if (
            SpotToBillFormStore.rows.some(row =>
                row.timeEntriesIds.some(rowTimeEntryId => rowTimeEntryId === timeEntryId)
            )
        ) {
            return true;
        }

        return false;
    };

    public calculateHourlyActivityTotals = (
        activity: SpotBillFormActivityGroup,
        selectedRateCard: StudioRateCardEntryFromApi[] = []
    ): number => {
        let total = 0;

        // For hourly
        if (activity.rateType === SpotBillActivityRateType.Hourly) {
            total += activity.timeEntriesIds.reduce((hourlyTotal: number, timeEntryId) => {
                const inBillTimeEntry = SpotToBillFormStore.timeEntries.find(
                    timeEntry => timeEntry.timeEntryId === timeEntryId
                );
                if (inBillTimeEntry) {
                    const rateCard = selectedRateCard.find(card => card.activityId === inBillTimeEntry.activityId);
                    if (rateCard && rateCard.rate) {
                        hourlyTotal +=
                            ((rateCard.rate * inBillTimeEntry.regularHours) / 60) * 1 +
                            ((rateCard.rate * inBillTimeEntry.overtimeHours) / 60) * 1.5 +
                            ((rateCard.rate * inBillTimeEntry.doubletimeHours) / 60) * 2.0;
                    }
                }

                return hourlyTotal;
            }, 0);
        }

        return total;
    };
}
