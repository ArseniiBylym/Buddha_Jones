import { observable } from 'mobx';
import { SpotBillFormActivityGroup, SpotBillFormFirstStage } from 'types/spotBilling';

export class SpotToBillForm {
    @observable public typeId: number | null = null;
    @observable public typeName: string | null = null;
    @observable public firstStage: SpotBillFormFirstStage[] = [];
    @observable public activities: SpotBillFormActivityGroup[] = [];
    @observable public spotsAddedToBill: number[] = [];
}
