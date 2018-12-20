import { action } from 'mobx';
import { CampaignPeopleStore } from 'store/AllStores';
import { ProjectCampaignPeople } from 'types/campaignPeople';
import { API, APIPath } from 'fetch';
import { ProjectCampaignUserFromApi } from 'types/projectDetails';

export class CampaignPeopleActionsClass {
    @action
    public fetchEditorsFromProjectCampaign = async (projectCampaignId: number): Promise<boolean> => {
        try {
            // Find existing project campaign data set or create new one
            let projectCampaign = CampaignPeopleStore.projectCampaignPeople.find(
                pc => pc.projectCampaignId === projectCampaignId
            );
            if (typeof projectCampaign === 'undefined') {
                const lastIndex = CampaignPeopleStore.projectCampaignPeople.length;
                CampaignPeopleStore.projectCampaignPeople.push({
                    ...this.defaultProjectCampaignPeopleObject,
                    projectCampaignId: projectCampaignId,
                });
                projectCampaign = CampaignPeopleStore.projectCampaignPeople[lastIndex];
            }

            // Load and populate users data
            if (projectCampaign) {
                projectCampaign.editorialTeam.isLoading = true;

                const response = (await API.getData(
                    APIPath.PROJECT_CAMPAIGN_EDITOR + '/' + projectCampaignId
                )) as ProjectCampaignUserFromApi[];

                projectCampaign.editorialTeam.users = response;
                projectCampaign.editorialTeam.isLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                // TODO fix this kind of error handlings all over the project
                this.fetchEditorsFromProjectCampaign(projectCampaignId);
            }, 1024);

            throw error;
        }
    };

    private get defaultProjectCampaignPeopleObject(): ProjectCampaignPeople {
        return {
            projectCampaignId: 0,
            creativeTeam: {
                isLoading: false,
                users: [],
            },
            billingTeam: {
                isLoading: false,
                users: [],
            },
            editorialTeam: {
                isLoading: false,
                users: [],
            },
            graphicsTeam: {
                isLoading: false,
                users: [],
            },
        };
    }
}
