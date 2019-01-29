import { ApiResponse } from './api';

export interface StudioRateCardApiQuery {
    studio_id: number;
    ratecard_id?: number;
}

export interface RateCard {
    id: number;
    ratecardId: number;
    activityId: number;
    activityName: string;
    activityTypeId: number;
    activityType: string;
    trtId: null | string;
    runtime: null | string;
    revisionInc: null | string;
    note: null | string;
    rate: null | number;
}

export interface RateCardType {
    ratecardId: number;
    studioId: number;
    ratecardName: string;
    ratecardNote: string;
    file: string | null;
}

export interface StudioRateCard {
    id: number | null;
    selectedRateCardId: number | null;
    selectedRateCardLabel: string;
    selectedRateCardNote: string;
    selectedRateCardFile: string | null;
    name: string;
    loading: boolean;
    rateCard: {
        loading: boolean;
        data: {
            [key: number]: RateCard;
        };
    };
    rateCardTypes: {
        loading: boolean;
        data: {
            [key: number]: RateCardType;
        };
        saving: boolean;
        adding: boolean;
        deleting: boolean;
    };
}

export interface StudioRateCardTypeFromApi {
    ratecardId: number;
    ratecardName: string;
    ratecardNote: string | null;
    file: string | null;
    studioId: number;
}

export interface StudioRateCardEntryFromApi {
    id: number;
    ratecardId: number;
    activityId: number;
    activityName: string;
    activityTypeId: number;
    activityType: string;
    trtId: number | null;
    runtime: number | null;
    revisionInc: 1 | 0 | null;
    note: string | null;
    type: string;
    rate: number | null;
}

export interface StudioRateCardFromApi extends ApiResponse {
    data: {
        selectedRateCardId: number;
        studio: {
            cardcode: string | null;
            id: number;
            studioName: string;
        };
        ratecardType: StudioRateCardTypeFromApi[];
        studioRateCard: StudioRateCardEntryFromApi[];
    };
}
