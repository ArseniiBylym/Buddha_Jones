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
        SpotToBillFormStore.firstStage = [];
        SpotToBillFormStore.activities = [];
        SpotToBillFormStore.spotsAddedToBill = [];

        SpotToBillFormStore.addingActivityToBillStatus = 'none';
        SpotToBillFormStore.showBillPreview = false;

        SpotToBillFormStore.selectedActivities = [];
    };

    @action
    public initialize = (billData: SpotBillFormData) => {
        this.reset();

        SpotToBillFormStore.typeId = billData.typeId;
        SpotToBillFormStore.typeName = billData.typeName;
        SpotToBillFormStore.firstStage = billData.firstStage;
        SpotToBillFormStore.activities = billData.activities;
        SpotToBillFormStore.spotsAddedToBill = billData.selectedSpots;
    };

    @action
    public addSpotToBill = (spotId: number) => {
        SpotToBillFormStore.spotsAddedToBill.push(spotId);
    };

    @action
    public removeSpotFromBill = (spotId: number) => {
        const index = SpotToBillFormStore.spotsAddedToBill.indexOf(spotId);
        if (index !== -1) {
            SpotToBillFormStore.spotsAddedToBill = [
                ...SpotToBillFormStore.spotsAddedToBill.slice(0, index),
                ...SpotToBillFormStore.spotsAddedToBill.slice(index + 1),
            ];
        }
    };

    private hoursOnlyPositive = (hours: ActivityHours): ActivityHours => ({
        regularHoursInMinutes: hours.regularHoursInMinutes > 0 ? hours.regularHoursInMinutes : 0,
        overtimeHoursInMinutes: hours.overtimeHoursInMinutes > 0 ? hours.overtimeHoursInMinutes : 0,
        doubletimeHoursInMinutes: hours.doubletimeHoursInMinutes > 0 ? hours.doubletimeHoursInMinutes : 0,
    });

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
            regularHours: typeof hours.regularHoursInMinutes === 'number' ? hours.regularHoursInMinutes : 0,
            overtimeHours: typeof hours.overtimeHoursInMinutes === 'number' ? hours.overtimeHoursInMinutes : 0,
            doubletimeHours: typeof hours.doubletimeHoursInMinutes === 'number' ? hours.doubletimeHoursInMinutes : 0,
        };

        const index = SpotToBillFormStore.selectedActivitiesIds.indexOf(timeEntry.timeEntryId);
        if (index !== -1) {
            const time = this.calculateAdjustedHours(
                timeEntry.durationInMinutes,
                {
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
    public addSelectedActivitiesToBillAsFirstStageRate = (spotId: number, timeEntriesIds: number[]) => {
        this.changeAddingActivityToBillStatus('saving');

        const spotIndex = SpotToBillFormStore.firstStage.findIndex(firstStage => firstStage.spotId === spotId);
        if (spotIndex !== -1) {
            const filteredTimeEntriesIds: number[] = timeEntriesIds.filter(
                timeEntryId => SpotToBillFormStore.firstStage[spotIndex].timeEntriesIds.indexOf(timeEntryId) === -1
            );
            SpotToBillFormStore.firstStage[spotIndex].timeEntriesIds.push(...filteredTimeEntriesIds);
        } else {
            SpotToBillFormStore.firstStage.push({
                spotId: spotId,
                note: null,
                timeEntriesIds: timeEntriesIds,
            });
        }

        this.changeAddingActivityToBillStatus('success');

        SpotToBillFormStore.selectedActivities = [];

        setTimeout(() => {
            if (SpotToBillFormStore.addingActivityToBillStatus === 'success') {
                this.changeAddingActivityToBillStatus('none');
            }
        }, 3000);
    };

    @action
    public addSelectedActivitiesToBillAsNewRow = (timeEntries: SpotBillFormActivityTimeEntry[]) => {
        this.changeAddingActivityToBillStatus('saving');

        const includedActivityIds: number[] = [];
        let activityName: string = '';

        const includedSpotIds: number[] = [];
        let spotName: string = '';

        const includedVersionIds: number[] = [];
        let versionName: string = '';

        timeEntries.forEach(timeEntry => {
            if (includedActivityIds.indexOf(timeEntry.activityId) === -1) {
                activityName += (activityName.length > 0 ? ', ' : '') + timeEntry.activityName;
                includedActivityIds.push(timeEntry.activityId);
            }

            if (timeEntry.spotId !== null && includedSpotIds.indexOf(timeEntry.spotId) === -1) {
                spotName += (spotName.length > 0 ? ', ' : '') + timeEntry.spotName;
                includedSpotIds.push(timeEntry.spotId);
            }

            if (timeEntry.versionId !== null && includedVersionIds.indexOf(timeEntry.versionId) === -1) {
                versionName += (versionName.length > 0 ? ', ' : '') + timeEntry.versionName;
                includedVersionIds.push(timeEntry.versionId);
            }
        });

        SpotToBillFormStore.activities.push({
            name: activityName,
            note: null,
            spot: spotName,
            version: versionName,
            rateType: SpotBillActivityRateType.Hourly,
            rateFlatId: null,
            timeEntries: timeEntries,
        });

        this.changeAddingActivityToBillStatus('success');

        SpotToBillFormStore.selectedActivities = [];

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
    public changeActivitiesRateType = (
        activityIndex: number,
        rateType: SpotBillActivityRateType,
        rateFlatId: number | null = null
    ) => {
        if (SpotToBillFormStore.activities[activityIndex]) {
            SpotToBillFormStore.activities[activityIndex].rateType = rateType;
            SpotToBillFormStore.activities[activityIndex].rateFlatId = rateFlatId;
        }
    };

    @action
    public changeFirstStageActivityNote = (index: number, note: string | null) => {
        if (SpotToBillFormStore.firstStage[index]) {
            SpotToBillFormStore.firstStage[index].note = note;
        }
    };

    @action
    public changeActivityNote = (index: number, note: string | null) => {
        if (SpotToBillFormStore.activities[index]) {
            SpotToBillFormStore.activities[index].note =
                note !== null && SpotToBillFormStore.activities[index].name === note ? null : note;
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
        if (SpotToBillFormStore.spotsAddedToBill.some(spot => spot === spotId)) {
            return true;
        }

        return false;
    };

    public checkIfTimeEntryIsInBill = (timeEntryId: number): boolean => {
        if (
            SpotToBillFormStore.firstStage.some(firstStageSpot =>
                firstStageSpot.timeEntriesIds.some(id => id === timeEntryId)
            )
        ) {
            return true;
        }

        if (
            SpotToBillFormStore.activities.some(activity =>
                activity.timeEntries.some(timeEntry => timeEntry.timeEntryId === timeEntryId)
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
            total += activity.timeEntries.reduce((hourlyTotal: number, timeEntry) => {
                const rateCard = selectedRateCard.find(card => card.activityId === timeEntry.activityId);
                if (rateCard && rateCard.rate) {
                    hourlyTotal +=
                        ((rateCard.rate * timeEntry.regularHours) / 60) * 1 +
                        ((rateCard.rate * timeEntry.overtimeHours) / 60) * 1.5 +
                        ((rateCard.rate * timeEntry.doubletimeHours) / 60) * 2.0;
                }

                return hourlyTotal;
            }, 0);
        }

        return total;
    };
}
