import { computed, observable } from 'mobx';
import { ActivityInBill, SpotBillFormActivityGroup, SpotBillFormFirstStage } from 'types/spotBilling';

export class SpotToBillForm {
    @observable public typeId: number | null = null;
    @observable public typeName: string | null = null;
    @observable public firstStage: SpotBillFormFirstStage[] = [];
    @observable public activities: SpotBillFormActivityGroup[] = [];
    @observable public spotsAddedToBill: number[] = [];

    @observable public selectedActivities: ActivityInBill[] = [];
    @computed public get selectedActivitiesIds(): number[] {
        return this.selectedActivities.map(a => a.timeEntryId);
    }
}
