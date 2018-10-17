import { ProjectPickerGroupValues } from 'components/Buddha';

export interface SpotSentSpot {
    projectCampaign: ProjectPickerGroupValues | null;
    spot: ProjectPickerGroupValues | null;
    version: ProjectPickerGroupValues | null;
    isResend: boolean;
    selectedEditorsIds: number[];
    isFinishingRequest: boolean;
    sentViaMethod: number[];
}

export interface SentViaOption {
    key: SpotSentVia;
    name: string;
    isSelected: boolean;
}

export enum SpotSentVia {
    FiberFlex = 'FF',
    Post = 'P',
    EmailLink = 'EL',
    InternalLink = 'IL',
    InHousePresentation = 'IHP',
}

export enum SpotSentForm {
    Method = 'sent_via_method',
    FinishOption = 'finish_option',
    EmailLink = 'EL',
    InternalLink = 'IL',
    InHousePresentation = 'IHP',
}

export interface SpotSentAllSpotsSentSpotData {
    project: SpotSentAllSpotsSentSpotDataSingle;
    campaign: SpotSentAllSpotsSentSpotDataSingle;
    spot: SpotSentAllSpotsSentSpotDataSingle;
    version: SpotSentAllSpotsSentSpotDataSingle;
    finishRequest: {
        name: 0 | 1 | null;
        title: string;
    };
    status: SpotSentAllSpotsSentSpotDataSingle;
    changed: SpotSentAllSpotsSentSpotDataSingle;
    edit: SpotSentAllSpotsSentSpotDataSingle;
}

export interface SpotSentAllSpotsSentSpotDataSingle {
    name: string;
    title: string;
}

export interface SpotSentAllSpotsSentFromApi {
    requestId: number;
    projectId: number;
    statusId: number;
    createdBy: number;
    createdAt: SpotSentAllSpotsSentTimeFromApi;
    updatedBy: null;
    updatedAt: SpotSentAllSpotsSentTimeFromApi | null;
    statusName: string;
    createdByUser: string;
    updatedByUser: string;
    spotData: SpotSentAllSpotsSentSpotDataFromApi[];
    projectName: string;
}

export interface SpotSentDetailsFromApi {
    requestId: number;
    projectId: number;
    fullLock: 0 | 1;
    sentViaMethod: string;
    finishOption: {
        parent: number,
        child: number
    };
    notes: string | null;
    internalNote: string | null;
    studioNote: string | null;
    deadline: SpotSentAllSpotsSentTimeFromApi | null;
    spotSentDate: SpotSentAllSpotsSentTimeFromApi | null;
    finishingHouse: number | null;
    framerate: string | null;
    framerateNote: string | null;
    rasterSize: string | null;
    rasterSizeNote: string | null;
    musicCueSheet: 0 | 1;
    gfxFinish: 0 | 1;
    audioPrep: 0 | 1;
    audio: number[];
    audioNote: string | null;
    videoPrep: 0 | 1;
    graphicsFinish: 0 | 1;
    specNote: string | null;
    specSheetFile: null;
    tagChart: string | null;
    deliveryToClient: {
        parent: number,
        child: number
    };
    deliveryNote: string | null;
    spotResend: 0 | 1;
    statusId: 1 | 2;
    editor: string | null;
    customerContact: number[];
    createdBy: number;
    updatedBy: number;
    createdAt: SpotSentAllSpotsFromApi;
    updatedAt: SpotSentAllSpotsFromApi;
    createdByUser: string;
    updatedByUser: string;
    statusName: string;
    spotData: SpotSentDetailsSpotDataFromApi[];
    finishOptionList: SpotSentOptionsStdSectionFromApi;
    audioList: SpotSentAudioOptionsFromApi[];
    deliveryToClientList: SpotSentOptionsStdSectionFromApi;
    projectName: string;
}

export interface SpotSentDetailsSpotDataFromApi {
    campaignId: number;
    campaignName: string;
    projectCampaignId: number;
    spotId: number;
    spotName: string;
    versionId: number;
    versionName: string;
    spotVersionId: number;
    sentViaMethod: string | null;
    finishRequest: 0 | 1;
    spotResend: 0 | 1;
    lineStatusId: number;
    lineStatusName: string;
}

export interface SpotSentAllSpotsSentSpotDataFromApi {
    campaignId: number;
    campaignName: string;
    projectCampaignId: number;
    spotId: number;
    spotName: string;
    versionId: number;
    versionName: string;
    spotVersionId: number;
    finishRequest: null;
    spotResend: null;
    lineStatusId: number;
    lineStatusName: string;
}

export interface SpotSentAllSpotsSentTimeFromApi {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface SpotSentAllSpotsFromApi {
    date: string;
    timezone_type: number;
    timezone: string;
}

export interface SpotSentOptionsFromApi {
    audio_option: SpotSentAudioOptionsFromApi[];
    delivery_to_client_option: SpotSentOptionsStdSectionFromApi[];
    finishing_option: SpotSentOptionsStdSectionFromApi[];
    framerate_option: string[];
    raster_size_option: string[];
    sent_via_method: SpotSentOptionsStdSectionFromApi[];
    status: SpotSentOptionsStdSectionFromApi[];
}

export interface SpotSentOptionsStdSectionFromApi {
    id: number;
    name: string;
    sort: number;
    children: SpotSentOptionsChildrenFromApi[];
}

export interface SpotSentOptionsChildrenFromApi {
    id: number;
    name: string;
    sort: number;
}

export interface SpotSentAudioOptionsFromApi {
    id: number;
    name: string;
}

export interface FinishingHouseOptionsFromApi {
    id: number;
    name: string;
}

export interface SpotSentFromApi {
    spot_sent_id: number;
}
