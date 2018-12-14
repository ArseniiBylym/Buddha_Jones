export interface Campaign {
    id: number;
    name: string;
    assignedToProjects: Array<{
        id: number;
        name: string;
    }>;
}

export interface CampaignFromApi {
    id: number;
    campaignName: string;
    project: Array<{
        id: number;
        projectName: string;
    }>;
}

export interface NewCampaignFromApi {
    campaign_id: string;
}
