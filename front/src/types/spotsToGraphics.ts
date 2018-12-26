// import { DateObjectFromApi } from './api';

export interface SpotToGraphicsProducer {
    userId: number;
    firstName: string;
    lastName: string | null;
    creativeRoleId: number;
    creativeRoleName: string;
}

export interface Producer {
    creativeRoleId: number;
    creativeRoleName: string;
    firstName: string;
    lastName: string;
    userId: number;
}

export interface SpotToGraphicsSpot {
    graphicsStatus: string;
    graphicsStatusId: number;
    runtime: string;
    spotId: number;
    spotLineStatus: number;
    spotLineStatusId: number;
    spotName: string;
    spotSentDate: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    spotSentRequestId: number;
    trtId: number;
    versionId: number;
    versionName: string;
    producers: SpotToGraphicsProducer[];
}

export interface SpotToGraphicsCampaing {
    campaignId: number;
    campaignName: string;
    customerId: number;
    customerName: string;
    projectCampaignId: number;
    spot: SpotToGraphicsSpot[];
}

export interface SpotToGraphicsFromApi {
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    campaign: SpotToGraphicsCampaing[];
}

export interface SpotGraphicsApiResponse {
    status: number;
    message: string;
    data: [
        {
            projectId: number,
            projectName: string | null;
            studioId: number;
            studioName: string | null;
            campaign: any[

            ]
        }
    ];
}

export interface SpotGraphicsApiQueryParams {
    offset?: number;
    length?: number;
    search?: string;
    studio_id?: number;
}