import { action } from 'mobx';
import { unformat } from 'accounting';
import { API, APIPath } from 'fetch';
import { CampaignsStore } from 'store/AllStores';
import { DateHandler } from 'helpers/DateHandler';
import { CampaignFromApi, NewCampaignFromApi } from 'types/campaign';
import { ProjectsDetailsActions } from '.';

export class CampaignsActionsClass {
    @action
    public fetchAllCampaigns = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (CampaignsStore.allCampaignsAreBeingFetched === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, CampaignsStore.allCampaignsLastFetchTimeStamp))
            ) {
                CampaignsStore.allCampaignsAreBeingFetched = true;

                const response = (await API.getData(APIPath.CAMPAIGN, {
                    length: 99999,
                    offset: 0,
                })) as CampaignFromApi[];

                CampaignsStore.allCampaignsAreBeingFetched = false;
                CampaignsStore.allCampaignsLastFetchTimeStamp = Date.now();
                CampaignsStore.allCampaigns = response.map(campaign => ({
                    id: campaign.id,
                    name: campaign.campaignName,
                    assignedToProjects: campaign.project.map(project => ({
                        id: project.id,
                        name: project.projectName,
                    })),
                }));
            }

            return true;
        } catch (error) {
            CampaignsStore.allCampaignsAreBeingFetched = false;
            throw error;
        }
    };

    @action
    public assignExistingCampaignToProject = async (projectId: number, campaignId: number): Promise<boolean> => {
        try {
            await API.postData(APIPath.ASSIGN_CAMPAIGN_TO_PROJECT, {
                project_id: projectId,
                campaign_id: campaignId,
            });

            ProjectsDetailsActions.fetchProjectDetails(projectId);

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public createNewCampaign = async (
        campaignName: string,
        projectsToAssignToIds: number[] | null = null
    ): Promise<{ campaignName: string; campaignId: number }> => {
        try {
            const newCampaign = (await API.postData(APIPath.CAMPAIGN, {
                ...(projectsToAssignToIds !== null
                    ? {
                          project: projectsToAssignToIds.map(projectId => ({
                              project_id: projectId,
                          })),
                      }
                    : {}),
                name: campaignName,
            })) as NewCampaignFromApi;

            return {
                campaignId: unformat(newCampaign.campaign_id),
                campaignName: campaignName,
            };
        } catch (error) {
            throw error;
        }
    };
}
