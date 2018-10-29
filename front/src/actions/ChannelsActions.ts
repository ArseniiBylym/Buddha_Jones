import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { ChannelsList, ChannelsListFromApi } from '../types/channels';
import { ChannelsStore } from '../store/AllStores';

export class ChannelsActionsClass {

    @action
    public fetchChannelsByCampaignId = async (campaignId: number): Promise<ChannelsList> => {
        try {

            let allChannelsIndexMatch = ChannelsStore.allChannelsFetchedByCampaignIds.indexOf(campaignId);
            if (allChannelsIndexMatch !== -1) {
                return ChannelsStore.allChannels[allChannelsIndexMatch];
            } else {
                ChannelsStore.allChannels.push({
                    campaignId: campaignId,
                    loading: true,
                    channels: []
                });
                const response = (await API.getData(APIPath.CHANNEL, {
                    campaign_id: campaignId
                })) as ChannelsListFromApi[];

                ChannelsStore.allChannels[ChannelsStore.allChannels.length - 1].channels = response.map((channel: ChannelsListFromApi) => {
                    return {
                        id: channel.channelId,
                        name: channel.channelName
                    };
                });
                ChannelsStore.allChannels[ChannelsStore.allChannels.length - 1].loading = false;
                return ChannelsStore.allChannels[ChannelsStore.allChannels.length - 1];
            }

        } catch (error) {
            throw error;
        }
    };

    @action
    public changeProjectCampaignChannel = async (
        projectCampaignId: number,
        customerId: number,
        channelId: number,
        approvedByBilling: boolean
    ): Promise<boolean> => {
        try {
            await API.putData(APIPath.PROJECT_CAMPAIGN + '/' + projectCampaignId, {
                customer_id: customerId,
                channel_id: channelId,
                approved_by_billing: approvedByBilling ? 1 : 0
            });

            return true;
        } catch (error) {
            throw error;
        }
    };

}
