import { action } from 'mobx';
import { FormattedInBillTimeEntry } from 'routes/SpotBilling/BillSpotForm';
import { AddingActivityToBillStatus } from 'store';
import { SpotToBillFormStore } from 'store/AllStores';
import { SpotBillFormActivityTimeEntry, SpotBillFormData } from 'types/spotBilling';

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

    @action
    public addTimeEntryToActivitiesSelection = (
        timeEntry: FormattedInBillTimeEntry,
        hours: {
            regularHoursInMinutes?: number;
            overtimeHoursInMinutes?: number;
            doubletimeHoursInMinutes?: number;
        }
    ) => {
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
            object.regularHours =
                typeof hours.regularHoursInMinutes === 'number'
                    ? hours.regularHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].regularHours;
            object.overtimeHours =
                typeof hours.overtimeHoursInMinutes === 'number'
                    ? hours.overtimeHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].overtimeHours;
            object.doubletimeHours =
                typeof hours.doubletimeHoursInMinutes === 'number'
                    ? hours.doubletimeHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].doubletimeHours;
            object.hoursAreSplit = object.overtimeHours > 0 || object.doubletimeHours > 0;

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
            }

            if (timeEntry.spotId !== null && includedSpotIds.indexOf(timeEntry.spotId) === -1) {
                spotName += (spotName.length > 0 ? ', ' : '') + timeEntry.spotName;
            }

            if (timeEntry.versionId !== null && includedVersionIds.indexOf(timeEntry.versionId) === -1) {
                versionName += (versionName.length > 0 ? ', ' : '') + timeEntry.versionName;
            }
        });

        SpotToBillFormStore.activities.push({
            name: activityName,
            note: null,
            spot: spotName,
            version: versionName,
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
}
