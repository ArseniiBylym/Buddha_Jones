export interface SpotPostItem {
    projectId: number;
    projectName: string;
    studioId: number;
    studioName: string;
    campaignId: number;
    campaignName: string;
    customerId: number;
    customerName: string;
    projectCampaignId: number;
    spotId: number;
    spotName: string;
    versionId: number;
    versionName: string;
    spotSentId: string;
    spotSentRequestId: string;
    spotSentDate: null;
    spotLineStatusId: number;
    graphicsStatusId: number;
    trtId: number;
    runtime: string;
    noGraphics: number;
    allGraphicsResend: number;
    finishRequest: number;
    finishOption: string;
    finishingHouse: null;
    isPdf: number;
    spotSentType: number;
    internalNote: string;
    spotResend: number;
    createdAt: {
        date: string,
        timezone_type: number,
        timezone: string,
    };
    updatedAt: {
        date: string,
        timezone_type: number,
        timezone: string,
    };
    spotLineStatus: string;
    graphicsStatus: string;
    editors: any[];
    customerContacts: [
        {
            id: number,
            customerId: number,
            name: string,
            title: string,
            email: null,
            mobilePhone: null
        }
    ];
}

export interface SpotsPostApiResponse {
    status: number;
    message: string;
    total_count: number;
    object_count: number;
    // data: SpotPostItem[];
    data: any;
}
