import { ProjectPickerValues } from 'components/Buddha';
import { ActivityTypeId } from 'routes/Configuration/ActivitiesDefinition/Form/ActivityDefinitionForm';

export interface TimeApprovalDay {
    date: Date;
    users: TimeApprovalDayUser[];
}

export interface TimeApprovalDayUser {
    userId: number;
    userTypeId: number;
    userTypeName: string;
    userName: string;
    userInitials: string;
    userFullName: string;
    userMinHours: number;
    summary: TimeApprovalDayHoursSummary;
    entries: TimeApprovalEntry[];
}

export interface TimeApprovalDayHoursSummary {
    breakTimeInMinutes: number;
    regularTimeInMinutes: number;
    overTimeInMinutes: number;
    doubleTimeInMinutes: number;
}

export interface TimeApprovalEntry {
    entryId: number;
    userId: number;
    userTypeId: number;
    userTypeName: string;
    activityId: number;
    activityName: string;
    activityTypeId: ActivityTypeId;
    selectedProject: ProjectPickerValues | null;
    notes: string | null;
    files: Array<{
        filename: string;
        description: string | null;
        durationInMinutes: number;
    }> | null;
    startDate: Date;
    durationInMinutes: number;
}

export type TimeApprovalFilterType = 'daysAgo' | 'project' | 'userId';
