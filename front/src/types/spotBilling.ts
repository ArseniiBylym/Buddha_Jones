import { DateObjectFromApi } from './api';

interface SpotBillFormFirstStage {
    spotId: number;
    versionIds: number[];
}

interface SpotBillFormActivityGroup {
    name: string;
    note: string | null;
    timeEntries: {
        activityId: number;
        activityName: string;
        versionId: number;
        versionName: string;
        regularHours: number;
        overtimeHours: number;
        doubletimeHours: number;
    }[];
}

export interface SpotBillFormData {
    typeId: number | null;
    typeName: string | null;
    firstStage: SpotBillFormFirstStage[];
    activities: SpotBillFormActivityGroup[];
}

export interface SpotBillFormSpot {
    spotId: number;
    spotName: string;
    timeEntries: number[];
}

export interface ProjectBillsHistoryEntry {
    billId: number;
    billStatusId: number;
    billStatusName: string;
    billTotal: number;
    createdByUserId: number;
    createdByUsername: string;
    createdByUserFirstName: string;
    createdByUserLastName: string | null;
    createdByUserImage: string | null;
    createdAt: DateObjectFromApi;
}

export interface SpotBillFormSummary {
    billId: number;
    billStatusId: number;
    billStatusName: string;
    projectId: number;
    projectName: string;
    projectCampaignId: number;
    projectCampaignName: string;
    campaignId: number;
    campaignName: string;
    studioId: number;
    studioName: string;
    projectBillsHistory: ProjectBillsHistoryEntry[];
    spots: SpotBillFormSpot[];
    bill: SpotBillFormData;
}
