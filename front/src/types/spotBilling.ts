import { DateObjectFromApi } from './api';

export interface ActivityInBill {
    timeEntryId: number;
    regularHoursInMinutes: number;
    overtimeHoursInMinutes: number;
    doubletimeHoursInMinutes: number;
}

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

export interface BillTimeEntry {
    timeEntryId: number;
    projectId: number;
    projectName: string;
    projectCampaignId: number | null;
    campaignName: string | null;
    projectCampaignName: string | null;
    spotId: number | null;
    spotName: string | null;
    versionId: number | null;
    versionName: string | null;
    activityId: number;
    activityName: string;
    activityDescription: string | null;
    activityIsBillable: boolean;
    userId: number;
    userName: string;
    userFirstName: string;
    userLastName: string | null;
    userInitials: string | null;
    userImage: string | null;
    duration: string;
    startDate: DateObjectFromApi;
}

export interface SpotBillFormSpot {
    spotId: number;
    spotName: string;
    projectCampaignId: number;
    numberOfRevisions: number | null;
    firstRevisionCost: number | null;
    firstRevisionIsBilled: boolean;
    graphicsIncluded: boolean;
    timeEntries: BillTimeEntry[];
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
    unbilledProjectTimeEntries: BillTimeEntry[];
    unbilledProjectCampaignTimeEntries: BillTimeEntry[];
    spots: SpotBillFormSpot[];
    bill: SpotBillFormData;
}
