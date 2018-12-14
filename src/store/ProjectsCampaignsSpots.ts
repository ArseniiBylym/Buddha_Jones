import { observable } from 'mobx';
import { ProjectResult, CampaignResult, SpotResult, VersionResult, TRTItem } from 'types/projectsCampaignsSpots';

export class ProjectsCampaignsSpots {
    @observable public projects: ProjectResult[] = [];
    @observable public campaigns: CampaignResult[] = [];
    @observable public spots: SpotResult[] = [];
    @observable public versions: VersionResult[] = [];
    @observable public trtList: TRTItem[] = [];
}
