import { observable, computed } from 'mobx';
import { RateCard, RateCardType } from 'types/studioRateCard';

export class StudioRateCard {
    @observable id: number | null = null;
    @observable selectedRateCardId: number | null;

    @computed
    public get selectedRateCardLabel() {
        if (this.selectedRateCardId && this.rateCardTypes.data[this.selectedRateCardId]) {
            return this.rateCardTypes.data[this.selectedRateCardId].ratecardName;
        }
        return '';
    }

    @computed
    public get selectedRateCardNote() {
        if (this.selectedRateCardId && this.rateCardTypes.data[this.selectedRateCardId]) {
            return this.rateCardTypes.data[this.selectedRateCardId].ratecardNote;
        }
        return '';
    }

    @observable name: string = '';
    @observable loading: boolean = false;

    @observable rateCard: {
        loading: boolean,
        data: { [key: number]: RateCard }
    } = {
        loading: false,
        data: {},
    };

    @observable rateCardTypes: {
        loading: boolean,
        data: {
            [key: number]: RateCardType
        },
        saving: boolean,
        adding: boolean,
        deleting: boolean,
    } = {
        loading: false,
        data: {},
        saving: false,
        adding: false,
        deleting: false,
    };
}
