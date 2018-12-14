import { observable } from 'mobx';
import { Campaign } from 'types/campaign';

export class Campaigns {
    @observable public allCampaignsLastFetchTimeStamp: number = 0;
    @observable public allCampaignsAreBeingFetched: boolean = false;
    @observable public allCampaigns: Campaign[] = [];
}
