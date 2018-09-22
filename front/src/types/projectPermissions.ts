export interface UserPermission {
    id: number;
    key: string;
    canView: boolean;
    canEdit: boolean;
}

export interface UserPermissionFromApi {
    canEdit: 1 | 0;
    canView: 1 | 0;
    userTypeId: number;
    projectPermissionId: number;
    projectPermissionLabel: string;
    projectPermsisionKey: string;
}

export enum UserPermissionKey {
    ProjectCreate = 'project-create',
    ProjectName = 'project-name',
    ProjectCodeName = 'project-codename',
    ProjectReleaseDate = 'project-release-date',
    ProjectHistory = 'project-history',
    ProjectDescription = 'project-description',
    ProjectCampaigns = 'project-campaigns',
    CampaignDescription = 'campaign-description',
    CampaignDetails = 'campaign-details',
    CampaignContacts = 'campaign-contacts',
    CampaignPeopleCreative = 'campaign-people-creative',
    CampaignPeopleBilling = 'campaign-people-billing',
    CampaignPeopleEditorial = 'campaign-people-editorial',
    CampaignPeopleDesign = 'campaign-people-design',
    CampaignWritingTeam = 'campaign-writing-team',
    CampaignMusicTeam = 'campaign-music-team',
    DateMaterialReceived = 'date-material-received',
    CampaignBudget = 'campaign-budget',
    CampaignNotes = 'campaign-notes',
    CampaignPOR = 'campaign-por',
    CampaignClientExecutive = 'campaign-client-executive',
    CampaignInvoiceContact = 'campaign-invoice-contact',
    Spot = 'spot',
    SpotRevision = 'spot-revision',
    SpotRevisionStatus = 'version-status',
    SpotRevisionNote = 'version-note',
    SpotInternalDueDate = 'spot-internal-due-date',
    SpotClientDueDate = 'spot-client-due-date',
    SpotFirstRevisionRate = 'spot-first-revision-cost',
    SpotGraphicsRevision = 'spot-graphics-revision',
}
