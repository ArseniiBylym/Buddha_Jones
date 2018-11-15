export interface ChannelsList {
    campaignId: number;
    loading: boolean;
    channels: ChannelsListItem[];
}

export interface ChannelsListItem {
    id: number;
    name: string;
}

export interface ChannelsListFromApi {
    channelId: number;
    channelName: string;
}
