import { action } from 'mobx';
import { SpotToBillFormStore } from 'store/AllStores';
import { ActivityInBill, SpotBillFormData } from 'types/spotBilling';

export class SpotToBillFormActionsClass {
    @action
    public reset = () => {
        SpotToBillFormStore.typeId = null;
        SpotToBillFormStore.typeName = null;
        SpotToBillFormStore.firstStage = [];
        SpotToBillFormStore.activities = [];
        SpotToBillFormStore.spotsAddedToBill = [];

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
        timeEntryId: number,
        hours: {
            regularHoursInMinutes?: number;
            overtimeHoursInMinutes?: number;
            doubletimeHoursInMinutes?: number;
        }
    ) => {
        let object: ActivityInBill = {
            timeEntryId,
            hoursAreSplit:
                (typeof hours.overtimeHoursInMinutes === 'number' && hours.overtimeHoursInMinutes > 0) ||
                (typeof hours.doubletimeHoursInMinutes === 'number' && hours.doubletimeHoursInMinutes > 0)
                    ? true
                    : false,
            regularHoursInMinutes: typeof hours.regularHoursInMinutes === 'number' ? hours.regularHoursInMinutes : 0,
            overtimeHoursInMinutes: typeof hours.overtimeHoursInMinutes === 'number' ? hours.overtimeHoursInMinutes : 0,
            doubletimeHoursInMinutes:
                typeof hours.doubletimeHoursInMinutes === 'number' ? hours.doubletimeHoursInMinutes : 0,
        };

        const index = SpotToBillFormStore.selectedActivitiesIds.indexOf(timeEntryId);
        if (index !== -1) {
            object.regularHoursInMinutes =
                typeof hours.regularHoursInMinutes === 'number'
                    ? hours.regularHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].regularHoursInMinutes;
            object.overtimeHoursInMinutes =
                typeof hours.overtimeHoursInMinutes === 'number'
                    ? hours.overtimeHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].overtimeHoursInMinutes;
            object.doubletimeHoursInMinutes =
                typeof hours.doubletimeHoursInMinutes === 'number'
                    ? hours.doubletimeHoursInMinutes
                    : SpotToBillFormStore.selectedActivities[index].doubletimeHoursInMinutes;

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
}
