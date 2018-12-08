export interface RateCard {
    ratecardId: number;
    activityId: number;
    activityName: string;
    activityTypeId: number;
    activityType: string;
    trtId: null | string;
    runtime: null | string;
    revisionInc: null | string;
    note: null | string;
    type: null | string;
    rate: null | number;
}

export interface RateCardType {
    ratecardId: number;
    studioId: number;
    ratecardName: string;
    ratecardNote: string;
}

export interface StudioRateCard {
    id: number | null;
    selectedRateCardId: number | null;
    selectedRateCardLabel: string;
    name: string;
    loading: boolean;
    rateCard: {
        loading: boolean;
        data: {
            [key: number]: RateCard
        },
    };
    rateCardTypes: {
        loading: boolean,
        data: {
            [key: number]: RateCardType
        },
    };
}
