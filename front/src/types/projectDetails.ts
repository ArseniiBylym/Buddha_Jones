import { DateObjectFromApi } from './api';
import { SpotBillingType } from './projectDetailsEnums';
import { ClientContact } from './clients';

export interface ProjectCreateData {
    id: number;
    name: string;
    prefix?: string;
    codeName: string;
    releaseDate: string | null;
    studioId: number | null;
    studioName: string | null;
    notes: string;
}

export interface ProjectDetails {
    loading: boolean;
    projectId: number;
    projectName: string | null;
    projectPrefix?: string | null; 
    projectCodeName: string | null;
    clientId: number;
    clientName: string;
    studioId: number;
    studioName: string;
    projectReleaseDate: Date | null;
    projectDoesNotExist: boolean;
    projectCouldNotBeFetched: boolean;
    notes: string | null;
    campaigns: CampaignDetails[];
    history: ProjectHistory[];
}

export interface ProjectCampaignUserFromApi {
    userId: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    email: string | null;
    image: string | null;
    type: string;
    typeId: number;
}

export interface ProjectCampaignCreativeUserFromApi extends ProjectCampaignUserFromApi {
    roleId: number | null;
    role: string | null;
}

export interface ProjectCampaignBillingUserFromApi extends ProjectCampaignUserFromApi {
    billingRole: string | null;
}

export interface ProjectCampaignUser {
    userId: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    email: string | null;
    image: string | null;
    type: string;
    typeId: number;
}

export interface ProjectCampaignCreativeUser extends ProjectCampaignUser {
    roleId: number | null;
    role: string | null;
}

export interface ProjectCampaignBillingUser extends ProjectCampaignUser {
    billingRole: string | null;
}

export interface CampaignDetails {
    projectCampaignId: number;
    campaignId: number;
    name: string | null;
    notes: string | null;
    firstPointOfContactId: number | null;
    writingTeam: boolean;
    writingTeamNotes: string | null;
    musicTeam: boolean;
    musicTeamNotes: string | null;
    budget: number | null;
    budgetNotes: string | null;
    dateMaterialsWillBeReceived: Date | null;
    spots: SpotDetails[];
    creativeTeam: ProjectCampaignCreativeUser[];
    billingTeam: ProjectCampaignBillingUser[];
    designTeam: ProjectCampaignUser[];
    editorialTeam: ProjectCampaignUser[];
    clientSelected: {
        id: number | null;
        name: string | null;
    };
    hidden?: boolean;
    approvedByBilling: boolean;
    channelId: number | null;
    channelName: string | null;
    customerContact: ClientContact[];
}

export interface SpotDetails {
    id: number;
    name: string | null;
    notes: string | null;
    numberOfRevisions: number | null;
    firstRevisionCost: number | null;
    billingNotes: string | null;
    billingType: SpotBillingType;
    graphicsIncluded: boolean;
    v1InternalDeadline: Date | null;
    v1ClientDeadline: Date | null;
    justAdded: boolean;
    versions: VersionDetails[];
    hidden?: boolean;
    trtId: number | null;
}

export interface VersionDetails {
    value: number;
    label: string;
    note: string | null;
    status: VersionStatus | null;
    isCustom: boolean;
    editors?: VersionEditors[];
    hidden?: boolean;
}

export interface VersionEditors {
    id: number;
    name: string;
}

export interface VersionStatus {
    id: number;
    name: string;
}

export interface ProjectHistory {
    id: number;
    username: string;
    userFullName: string;
    userImage: string | null;
    message: string;
    createdAt: Date;
}

export interface ProjectDetailsFromApi {
    projectPrefix?: string;
    id: number;
    customerId: number;
    customerName: string;
    studioId: number;
    studioName: string;
    cardcode: string;
    notes: string | null;
    projectRelease: DateObjectFromApi | null;
    lastUpdatedAt: DateObjectFromApi;
    lastUpdateUser: {
        userId: number;
        name: string;
        image: string | null;
    };
    campaign: ProjectDetailsCampaignFromApi[];
    comment: {
        count: number;
        unread: number;
    };
    history: ProjectDetailsHistoryFromApi[];
    projectName: string | null;
    projectCode: string | null;
}

interface ProjectDetailsCampaignFromApi {
    projectCampaignId: number;
    campaignId: number;
    campaignName: string;
    customerId: number | null;
    customerName: string | null;
    note: string | null;
    budget: number | null;
    budgetNote: string | null;
    firstPointOfContactId: number | null;
    requestMusicTeam: boolean;
    musicTeamNotes: string | null;
    requestWritingTeam: boolean;
    writingTeamNotes: string | null;
    spot: ProjectDetailsSpotFromApi[];
    user: ProjectCampaignCreativeUserFromApi[];
    designer: ProjectCampaignUserFromApi[];
    editor: ProjectCampaignUserFromApi[];
    billingUser: ProjectCampaignBillingUserFromApi[];
    approvedByBilling: boolean;
    channelId: number | null;
    channelName: string | null;
    customerContact: ProjectDetailsCustomerContactFromApi[];
}

export interface ProjectSpotCreateFromApi {
    spot_id: string;
}

export interface ProjectDetailsCustomerContactFromApi {
    id: number;
    customerId: number;
    name: string;
    title: string | null;
    email: string | null;
    mobilePhone: string | null;
}

export interface ProjectDetailsSpotFromApi {
    id: string;
    spotName: string;
    notes: string | null;
    revisions: number | null;
    graphicsRevisions: boolean | null;
    firstRevisionCost: string | null;
    billingNote: string | null;
    billingType: SpotBillingType;
    revisionNotCounted: boolean | null;
    internalDeadline: DateObjectFromApi | null;
    clientDeadline: DateObjectFromApi | null;
    version: ProjectDetailsVersionFromApi[];
    trtId: number | null;
}

interface ProjectDetailsVersionFromApi {
    id: number;
    versionName: string;
    versionNote: string | null;
    versionStatusId: number | null;
    versionStatusName: string | null;
    custom: 1 | 0 | null;
    editor: ProjectDetailsVersionEditorsFromApi[];
}

interface ProjectDetailsVersionEditorsFromApi {
    id: number;
    name: string;
}

interface ProjectDetailsHistoryFromApi {
    id: string;
    userId: number;
    username: string;
    fullName: string;
    image: string | null;
    message: string;
    createdAt: DateObjectFromApi;
}

export interface ProjectDetailsVersionModalData {
    projectId: number;
    projectCampaignId: number;
    spotId: number;
    versionId: number;
    versionName: string;
    versionStatus: VersionStatus | null;
    versionNote: string | null;
}

export interface ProjectDetailsVersionModal extends ProjectDetailsVersionModalData {
    show: boolean;
    uploadStatus: ProjectDetailsVersionModalUploadStatus;
}

export type ProjectDetailsVersionModalUploadStatus =
    | 'none'
    | 'remove-prompt'
    | 'removing'
    | 'removing-succes'
    | 'removing-error'
    | 'saving'
    | 'saving-success'
    | 'saving-error';
