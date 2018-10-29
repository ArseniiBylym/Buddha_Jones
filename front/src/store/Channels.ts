import { computed, observable } from 'mobx';
import { ChannelsList } from '../types/channels';

export class Channels {
    @observable public allChannels: ChannelsList[] = [];

    @computed
    public get allChannelsFetchedByCampaignIds(): number[] {
        return this.allChannels.map(record => record.campaignId);
    }
}
