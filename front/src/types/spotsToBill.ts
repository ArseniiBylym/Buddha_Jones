import { ApiResponse, DateObjectFromApi } from './api';

export interface SpotsToBillFilters {
    page: number;
    search: string;
    studio: {
        id: number;
        name: string;
    } | null;
}

export interface SpotToBillFromApi {
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    campaignId: number;
    campaignName: string;
    projectCampaignId: number;
    spotId: number;
    spotName: string;
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
