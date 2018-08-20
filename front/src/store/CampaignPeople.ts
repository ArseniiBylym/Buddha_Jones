import { observable } from 'mobx';
import { ProjectCampaignPeople } from 'types/campaignPeople';

export class CampaignPeople {
    @observable projectCampaignPeople: ProjectCampaignPeople[] = [];
}
