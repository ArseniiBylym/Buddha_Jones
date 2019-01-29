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

export interface SpotToBillSentFromApi {
    spotId: number;
    versionId: number | null;
    versionName: string | null;
    versionSeq: number | null;
    spotSentId: number;
    spotSentRequestId: number;
    spotLineStatusId: number;
    spotLineStatus: string;
    graphicsStatusId: number | null;
    graphicsStatus: string | null;
    spotSentDate: DateObjectFromApi | null;
}

export interface SpotToBillFromApi {
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    customerId: number | null;
    customerName: string | null;
    customerTitle: string | null;
    campaignId: number;
    campaignName: string;
    projectCampaignId: number;
    projectCampaignName: string | null;
    spotId: number;
    spotName: string;
    numberOfRevisions: number | null;
    firstRevisionCost: number | null;
    firstRevisionIsBilled: boolean;
    graphicsIncluded: boolean;
    producers: SpotToBillProducer[];
    spotSent: SpotToBillSentFromApi[];
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
    project_campaign_id?: number;
}
