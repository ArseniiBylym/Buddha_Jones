import { RawApiResponse, ApiResponse, DateObjectFromApi } from './api';

export interface ProjectDataApiResponse {
    id: number;
    customerId: number;
    customerName: string;
    projectName?: string;
    projectCode?: string;
    notes: string | null;
    comment: {
        count: 0;
        unread: 0;
    };
    campaign: ProjectCampaignDataApiResponse[];
    lastUpdatedAt: DateObjectFromApi;
    lastUpdateUser: {
        userId: number;
        name: string;
        image: string | null;
    };
}

export interface RawProjectApiResponse extends RawApiResponse {
    data: ProjectApiResponse;
}

export interface ProjectApiResponse extends ApiResponse {
    data: ProjectDataApiResponse[];
    object_count: number;
    total_count: number;
}

export interface ProjectCampaignDataApiResponse {
    projectCampaignId: number;
    campaignId: number;
    campaignName: string;
    note: string | null;
    firstPointOfContactId: number;
    requestWritingTeam: boolean;
    writingTeamNotes: string | null;
    requestMusicTeam: boolean;
    musicTeamNotes: string | null;
}

export interface Project {
    id: number;
    name: string;
    clientId: number;
    clientName: string;
    notes: string | null;
    commentsCount: number;
    commentsUnread: number;
    campaigns: ProjectCampaignDataApiResponse[];
    lastUpdatedAt: Date;
    lastUpdatedByUserId: number;
    lastUpdatedByUserName: string;
    lastUpdatedByUserImage: string | null;
}
