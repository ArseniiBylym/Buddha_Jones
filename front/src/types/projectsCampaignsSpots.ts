import { RawApiResponse } from './api';

export interface GenericResult {
    totalCountOfResults: number;
    lastFetchTimestamp: number;
    isLoading: boolean;
    page: number;
}

export interface ProjectsResult extends GenericResult {
    results: ProjectsResultsEntry[];
}

export interface CampaignsResult extends GenericResult {
    results: CampaignsResultsEntry[];
}

export interface SpotsResult extends GenericResult {
    results: SpotsResultsEntry[];
}

export interface VersionsResult extends GenericResult {
    results: VersionsResultsEntry[];
}

export interface ProjectResult extends GenericResult {
    userId: number;
    search: string;
    results: ProjectsResultsEntry[];
}

export interface CampaignResult extends GenericResult {
    userId: number;
    search: string;
    projectId: number | null;
    results: CampaignsResultsEntry[];
}

export interface SpotResult extends GenericResult {
    userId: number;
    search: string;
    projectId: number | null;
    projectCampaignId: number | null;
    results: SpotsResultsEntry[];
}

export interface VersionResult extends GenericResult {
    userId: number;
    search: string;
    projectId: number | null;
    projectCampaignId: number | null;
    spotId: number | null;
    results: VersionsResultsEntry[];
}

export interface TRTItem {
    id: number;
    runtime: string;
}

export interface ProjectsQuery {
    [userId: number]: {
        [search: string]: {
            totalCount: number;
            pages: {
                [page: string]: ProjectsResult;
            };
        };
    };
}

export interface CampaignsQuery {
    [userId: number]: {
        [projectId: string]: {
            [search: string]: {
                totalCount: number;
                pages: {
                    [page: string]: CampaignsResult;
                };
            };
        };
    };
}

export interface SpotsQuery {
    [userId: number]: {
        [projectId: string]: {
            [campaignId: string]: {
                [search: string]: {
                    totalCount: number;
                    pages: {
                        [page: string]: SpotsResult;
                    };
                };
            };
        };
    };
}

export interface VersionsQuery {
    [userId: number]: {
        [projectId: string]: {
            [campaignId: string]: {
                [spotId: string]: {
                    [search: string]: {
                        totalCount: number;
                        pages: {
                            [page: string]: VersionsResult;
                        };
                    };
                };
            };
        };
    };
}

export interface GenericResultsRawApiResponse extends RawApiResponse {
    data: GenericResultsRawApiResponseData;
}

export interface GenericResultsRawApiResponseData {
    message: string;
    object_count: number;
    total_count: number;
    status: number;
}

export interface ProjectsResultsRawApiResponseData extends GenericResultsRawApiResponseData {
    data: ProjectsResultsEntry[];
}

export interface ProjectsResultsRawApiResponse extends GenericResultsRawApiResponse {
    data: ProjectsResultsRawApiResponseData;
}

export interface CampaignsResultsRawApiResponseData extends GenericResultsRawApiResponseData {
    data: CampaignsResultsEntry[];
}

export interface CampaignsResultsRawApiResponse extends GenericResultsRawApiResponse {
    data: CampaignsResultsRawApiResponseData;
}

export interface SpotsResultsRawApiResponseData extends GenericResultsRawApiResponseData {
    data: SpotsResultsEntry[];
}

export interface SpotsResultsRawApiResponse extends GenericResultsRawApiResponse {
    data: SpotsResultsRawApiResponseData;
}

export interface VersionsResultsRawApiResponseData extends GenericResultsRawApiResponseData {
    data: VersionsResultsEntry[];
}

export interface VersionsResultsRawApiResponse extends GenericResultsRawApiResponse {
    data: VersionsResultsRawApiResponseData;
}

export interface ProjectsResultsEntry {
    id: number;
    projectCode: string | null;
    projectName: string | null;
    customerId: number | null;
    customerName: string | null;
}

export interface CampaignsResultsEntry {
    id: number;
    campaignId: number;
    campaignName: string | null;
    note: string | null;
}

export interface SpotsResultsEntry {
    id: number;
    spotName: string;
    projectId: number;
}

export interface VersionsResultsEntry {
    id: number;
    versionName: string;
    spotId: number;
}
