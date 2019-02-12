import { ApiResponse, DateObjectFromApi } from './api';
import { SpotBillingType } from './projectDetailsEnums';
import { SpotBillActivityRateType } from './spotBillingEnums';

export interface ActivityHours {
    totalHoursInMinutes: number;
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
    note: string | null;
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
    durationInMinutes: number;
    totalAdjustedMinutes: number;
    regularBillableMinutes: number;
    overtimeBillableMinutes: number;
    doubletimeBillableMinutes: number;
}

export interface SpotBillFormActivityGroup {
    id: number;
    sort: number;
    name: string;
    note: string | null;
    discount: SpotBillDiscount;
    rateType: SpotBillActivityRateType;
    rateFlatOrFirstStageId: number | null;
    rateAmount: number | null;
    timeEntriesIds: number[];
}

export interface SpotBillFormData {
    billId: number;
    billStatusId: number;
    billStatusName: string;
    billTypeId: number | null;
    billTypeName: string | null;
    selectedSpotsIds: number[];
    selectedRateCardId: number | null;
    discount: SpotBillDiscount;
    rows: SpotBillFormActivityGroup[];
    timeEntries: SpotBillFormActivityTimeEntry[];
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

export interface SpotBillFirstRevisionRate {
    spotId: number;
    spotName: string;
    firstRevisionCost: number | null;
}

export interface SpotBillFormSpot {
    spotId: number;
    spotName: string;
    projectCampaignId: number;
    numberOfRevisions: number | null;
    firstRevisionCost: number | null;
    firstRevisionIsBilled: boolean;
    graphicsIncluded: boolean;
    billingType: SpotBillingType | null;
    billingNote: string | null;
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
    projectId: number;
    projectName: string;
    projectCampaignId: number;
    projectCampaignName: string;
    campaignId: number;
    campaignName: string;
    studioId: number;
    studioName: string;
    projectBillsHistory: ProjectBillsHistoryEntry[];
    timeEntries: BillTimeEntry[];
    spots: SpotBillFormSpot[];
    bill: SpotBillFormData;
}

export interface SpotBillRowRevision {
    versionId: number;
    versionName: string;
}

export interface SpotBillDiscount {
    isFixed: boolean;
    value: number;
}

export interface SpotTimeEntryDuration {
    totalUnbilledMinutes: number;
    selectedBaseMinutes: number;
    selectedAdjustedMinutes: number;
}

export interface BillTypeFromApi {
    id: number;
    name: string;
    note: string | null;
}

export interface BillTypesFromApi extends ApiResponse {
    data: BillTypeFromApi[];
}

export interface BillTypesFromApiQuery {
    offset?: number;
    length?: number;
}

export interface BillTotalsCalculation {
    subTotal: number;
    total: number;
    hasDiscount: boolean;
}
