import { ProjectPickerGroupValues } from 'components/Buddha';

export interface SpotSentSpot {
    projectCampaign: ProjectPickerGroupValues | null;
    spot: ProjectPickerGroupValues | null;
    version: ProjectPickerGroupValues | null;
    isResend: boolean;
    selectedEditorsIds: number[];
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
