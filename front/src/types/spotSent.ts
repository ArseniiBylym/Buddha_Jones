import { ProjectPickerGroupValues } from 'components/Buddha';

export interface SpotSentSpot {
    projectCampaign: ProjectPickerGroupValues | null;
    spot: ProjectPickerGroupValues | null;
    version: ProjectPickerGroupValues | null;
    isResend: boolean;
    selectedEditorsIds: number[];
    isFinishingRequest: boolean;
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
        id: 0 | 1 | null;
        name: string | null;
        title: string;
    };
    status: SpotSentAllSpotsSentSpotDataSingle;
    changed: {
        id: string | null;
        name: string;
        title: string;
    };
}

export interface SpotSentAllSpotsSentSpotDataSingle {
    id: number;
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

/*export interface SpotSentAllSpotsFromApi {
    id: number;
    projectId: number;
    fullLock: 0 | 1;
    sentViaMethod: string;
    finishOption: null;
    notes: string | null;
    deadline: Date | null;
    finishingHouse: number | null;
    framerate: string | null;
    framerateNote: string | null;
    rasterSize: string | null;
    rasterSizeNote: string | null;
    musicCueSheet: 0 | 1;
    gfxFinish: 0 | 1;
    audioPrep: 0 | 1;
    audio: string | null;
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
    statusId: number | null;
    createdBy: number;
    updatedBy: number;
    createdAt: SpotSentAllSpotsFromApi;
    updatedAt: SpotSentAllSpotsFromApi;
    projectSpotVersion: Array<{spot_version_id: number, editors: number[]}>;
    sentViaMethodList: SpotSentOptionsChildrenFromApi[];
}*/

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
