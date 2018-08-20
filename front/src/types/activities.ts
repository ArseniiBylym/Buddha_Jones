import { ActivityTypeId } from 'routes/Configuration/ActivitiesDefinition/Form/ActivityDefinitionForm';

export interface ActivityFromApi {
    id: number;
    name: string | null;
    type: ActivityTypeFromApi[];
    userType: ActivityUserTypeFromApi[];
    billable: 1 | 0 | null;
    descriptionRequired: 1 | 0 | null;
    projectCampaignRequired: 1 | 0 | null;
    projectCampaignSpotVersionRequired: 1 | 0 | null;
    filesIncluded: 1 | 0 | null;
    status: 1 | 0 | null;
}

export interface ActivityTypeFromApi {
    id: number;
    activityType: string;
}

export interface ActivityUserTypeFromApi {
    id: number;
    typeName: string;
}

export interface ActivityData {
    id: number | null;
    name: string;
    activityType: number;
    isProjectCampaignRequired: boolean;
    isSpotVersionRequired: boolean;
    isDescriptionRequired: boolean;
    areFilesRequired: boolean;
    selectedUserTypesIds: number[];
    isActive: boolean;
    isModified: boolean;
    uploadStatus: 'none' | 'saving' | 'success' | 'error' | 'error-nameisrequired';
}

export interface Activity {
    id: number;
    name: string;
    typeId: ActivityTypeId;
    typeName: string;
    userTypes: ActivityUserType[];
    isBillable: boolean;
    isDescriptionRequired: boolean;
    isProjectCampaignRequired: boolean;
    isSpotVersionRequired: boolean;
    areFilesRequired: boolean;
    isActive: boolean;
}

export interface ActivityUserType {
    id: number;
    name: string;
}

export interface ActivityType {
    id: number;
    name: string;
}
