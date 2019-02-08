import { computed, observable } from 'mobx';
import { SpotBillDiscount, SpotBillFormActivityGroup, SpotBillFormActivityTimeEntry } from 'types/spotBilling';

export type AddingActivityToBillStatus = 'none' | 'saving' | 'success' | 'error';

export class SpotToBillForm {
    @observable public billId: number = 0;
    @observable public billTypeId: number | null = null;

    @observable public nextRowIdCounter: number = 1;
    @observable public rows: SpotBillFormActivityGroup[] = [];
    @observable public timeEntries: SpotBillFormActivityTimeEntry[] = [];
    @observable public spotsIdsAddedToBill: number[] = [];

    @observable public addingActivityToBillStatus: AddingActivityToBillStatus = 'none';
    @observable public savingBillStatus: AddingActivityToBillStatus = 'none';

    @observable public selectedRateCardId: number | null = null;

    @observable public selectedActivities: SpotBillFormActivityTimeEntry[] = [];
    @computed public get selectedActivitiesIds(): number[] {
        return this.selectedActivities.map(a => a.timeEntryId);
    }

    @observable public discount: SpotBillDiscount = {
        isFixed: true,
        value: 0,
    };
}
