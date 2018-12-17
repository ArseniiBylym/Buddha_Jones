import { ApiResponse, DateObjectFromApi } from './api';

export interface SpotsToBillFilters {
    page: number;
    search: string;
    studio: {
        id: number;
        name: string;
    } | null;
}

export interface SpotToBillProducer {
    userId: number;
    firstName: string;
    lastName: string | null;
    creativeRoleId: number;
    creativeRoleName: string;
}

export interface SpotToBillFromApi {
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    campaignId: number;
    campaignName: string;
    projectCampaignId: number;
    projectCampaignName: string | null;
    spotId: number;
    spotName: string;
    producers: SpotToBillProducer[];
    updatedAt: DateObjectFromApi;
}

export interface SpotBillingApiResponse extends ApiResponse {
    total_count: number;
    data: SpotToBillFromApi[];
}

export interface SpotBillingApiQueryParams {
    offset: number;
    length: number;
    search?: string;
    studio_id?: number;
}
