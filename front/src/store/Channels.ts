import { observable } from 'mobx';
import { ChannelsListFromApi } from '../types/channels';

export class Channels {
    @observable public allChannelsByCampaign: ChannelsListFromApi[] = [];
}
