import { DateObjectFromApi } from './api';

export interface SpotBillFormFirstStage {
    spotId: number;
    versionIds: number[];
}

export interface SpotBillFormActivityGroup {
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
    selectedSpots: number[];
    typeId: number | null;
    typeName: string | null;
    firstStage: SpotBillFormFirstStage[];
    activities: SpotBillFormActivityGroup[];
}

export interface SpotBillTimeEntry {
    id: number;
    userId: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    initials: string | null;
    activityId: number;
    activityValue: string;
    activityDescription: string | null;
    activityType: string;
    activityTypeId: number;
    duration: string;
    startDate: DateObjectFromApi;
    spotId: number | null;
    spotName: string | null;
    versionId: number | null;
    versionName: string | null;
}

export interface SpotBillFormSpot {
    spotId: number;
    spotName: string;
    projectCampaignId: number;
    numberOfRevisions: number | null;
    firstRevisionCost: number | null;
    firstRevisionIsBilled: boolean;
    graphicsIncluded: boolean;
    timeEntries: SpotBillTimeEntry[];
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

export interface BillTimeEntry {
    activityId: number;
    activityValue: string;
    activityDescription: string | null;
    duration: string;
    userId: number;
    userName: string;
    userFirstName: string;
    userLastName: string | null;
    userImage: string | null;
    startDate: DateObjectFromApi;
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
    unbilledProjectTimeEntries: BillTimeEntry[];
    unbilledProjectCampaignTimeEntries: BillTimeEntry[];
    spots: SpotBillFormSpot[];
    bill: SpotBillFormData;
}
