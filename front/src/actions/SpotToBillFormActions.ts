import { action } from 'mobx';
import { SpotToBillFormStore } from 'store/AllStores';
import { SpotBillFormData } from 'types/spotBilling';

export class SpotToBillFormActionsClass {
    @action
    public reset = () => {
        SpotToBillFormStore.typeId = null;
        SpotToBillFormStore.typeName = null;
        SpotToBillFormStore.firstStage = [];
        SpotToBillFormStore.activities = [];
        SpotToBillFormStore.spotsAddedToBill = [];
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
}
