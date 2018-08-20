import { ProjectPickerGroupValues } from 'components/Buddha';

export interface SpotSentSpot {
    projectCampaign: ProjectPickerGroupValues | null;
    spot: ProjectPickerGroupValues | null;
    version: ProjectPickerGroupValues | null;
    isResend: boolean;
    selectedEditorsIds: number[];
}

export enum SpotSentVia {
    FiberFlex = 'FF',
    Post = 'P',
    EmailLink = 'EL',
    InternalLink = 'IL',
    InHousePresentation = 'IHP',
}
