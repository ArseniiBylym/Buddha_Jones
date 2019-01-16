import { ApiResponse } from './api';

export interface SpotFromApi {
    id: number;
}

export interface SpotsListFromApi extends ApiResponse {
    total_count: number;
    data: SpotFromApi[];
}

export interface GetSpotsListQueryParams {
    offset: number;
    length: number;
    project_id?: number;
    campaign_id?: number;
    project_campaign_id?: number;
    search?: string;
}
