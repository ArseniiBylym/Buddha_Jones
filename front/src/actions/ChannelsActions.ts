import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { ChannelsListFromApi } from '../types/channels';
import { ChannelsStore } from '../store/AllStores';

export class ChannelsActionsClass {
    @action
    public fetchChannels = async (campaignId: number): Promise<boolean> => {
        try {
            const response = (await API.getData(APIPath.CHANNEL, {
                campaign_id: campaignId
            })) as ChannelsListFromApi[];

            ChannelsStore.allChannelsByCampaign = response;

            return true;
        } catch (error) {
            throw error;
        }
    };
}
