import { ProjectCampaignUserFromApi } from './projectDetails';

export interface ProjectCampaignPeople {
    projectCampaignId: number;
    creativeTeam: ProjectCampaignPeopleGroup;
    billingTeam: ProjectCampaignPeopleGroup;
    editorialTeam: ProjectCampaignPeopleGroup;
    graphicsTeam: ProjectCampaignPeopleGroup;
}

export interface ProjectCampaignPeopleGroup {
    isLoading: boolean;
    users: ProjectCampaignUserFromApi[];
}
