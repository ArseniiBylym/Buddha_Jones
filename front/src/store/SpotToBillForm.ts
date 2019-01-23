import { computed, observable } from 'mobx';
import { SpotBillFormActivityGroup, SpotBillFormActivityTimeEntry, SpotBillFormFirstStage } from 'types/spotBilling';

export type AddingActivityToBillStatus = 'none' | 'saving' | 'success' | 'error';

export class SpotToBillForm {
    @observable public typeId: number | null = null;
    @observable public typeName: string | null = null;
    @observable public firstStage: SpotBillFormFirstStage[] = [];
    @observable public activities: SpotBillFormActivityGroup[] = [];
    @observable public spotsAddedToBill: number[] = [];

    @observable public addingActivityToBillStatus: AddingActivityToBillStatus = 'none';
    @observable public showBillPreview: boolean = false;

    @observable public selectedRateCard: number | null = null;

    @observable public selectedActivities: SpotBillFormActivityTimeEntry[] = [];
    @computed public get selectedActivitiesIds(): number[] {
        return this.selectedActivities.map(a => a.timeEntryId);
    }
}
