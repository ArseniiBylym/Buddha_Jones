import { DateObjectFromApi } from './api';

export interface ActivityHours {
    regularHoursInMinutes: number;
    overtimeHoursInMinutes: number;
    doubletimeHoursInMinutes: number;
}

export interface ActivityInBill extends ActivityHours {
    timeEntryId: number;
    hoursAreSplit: boolean;
}

export interface ActivityInBillWithBaseTime extends ActivityInBill {
    baseHoursInMinutes: number;
}

export interface SpotBillFormFirstStage {
    spotId: number;
    timeEntriesIds: number[];
}

export interface SpotBillFormActivityTimeEntry {
    timeEntryId: number;
    activityId: number;
    activityName: string;
    spotId: number | null;
    spotName: string | null;
    versionId: number | null;
    versionName: string | null;
    hoursAreSplit: boolean;
    regularHours: number;
    overtimeHours: number;
    doubletimeHours: number;
}

export interface SpotBillFormActivityGroup {
    name: string;
    note: string | null;
    spot: string;
    version: string;
    timeEntries: SpotBillFormActivityTimeEntry[];
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
    versionSequence: number | null;
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

export interface SpotBillRowRevision {
    versionId: number;
    versionName: string;
}
