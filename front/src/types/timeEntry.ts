import { DateObjectFromApi } from './api';

export interface TimeEntryCalendarDay {
    date: Date;
    userId: number;
    userTypeId: number;
    userTypeName: string;
    isDayLoading: boolean;
    isDayApproved: boolean;
    isDayClosed: boolean;
    timeEntries: TimeEntryCalendarEntry[];
}

export interface TimeEntryCalendarEntry {
    id: number;
    userId: number;
    userTypeId: number;
    userTypeName: string;
    notes: string | null;
    activityId: number;
    activityName: string;
    clientId: number | null;
    projectId: number | null;
    projectName: string | null;
    projectCampaignId: number | null;
    projectCampaignName: string | null;
    spotId: number | null;
    spotName: string | null;
    versionId: number | null;
    versionName: string | null;
    hours: number;
    startDate: Date;
    status: TimeEntryStatus;
    files: TimeEntryFile[];
}

export interface TimeEntryFile {
    filename: string;
    description: string | null;
    durationInMinutes: number;
}

export interface TimeEntriesOfUserFromApi {
    [date: string]: TimeEntryFromApi[];
}

export interface TimeEntryFromApi {
    id: number;
    userId: number;
    username: string;
    userTypeId: number;
    userTypeName: string;
    firstName: string | null;
    lastName: string | null;
    initials: string | null;
    minHour: number | null;
    files: Array<{
        fileName: string;
        description: string;
        duration: string;
    }>;
    activityId: number;
    activityValue: string;
    activityDescription: string | null;
    activityType: string;
    activityTypeId: number;
    duration: string;
    startDate: DateObjectFromApi;
    projectId: number | null;
    projectName: string | null;
    projectCampaignId: number | null;
    campaignId: number | null;
    campaignName: string | null;
    spotId: number | null;
    spotName: string | null;
    versionId: number | null;
    versionName: string | null;
    customerId: number | null;
    customerName: string | null;
    status: TimeEntryStatus;
    statusName: string;
    approvedBy: number | null;
    approvedAt: DateObjectFromApi | null;
}

export interface TimeEntryUser {
    userId: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    initials: string | null;
}

export interface TimeEntryUserWithType {
    id: number;
    typeId: number;
    typeName: string;
}

export interface TimeEntryProject {
    projectId: number | null;
    projectName: string | null;
}

export enum TimeEntryStatus {
    Draft = 1,
    Final = 2,
    UnderReview = 3,
    Approved = 4,
    SentToCustomer = 5,
}

export const TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID = 22;
export const TIME_ENTRY_OVERTIME_AFTER_X_HOURS = 8;
export const TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS = 12;
