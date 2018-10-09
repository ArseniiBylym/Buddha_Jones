import { API, APIPath } from '../fetch';
import { action } from 'mobx';
import { SpotSentStore } from '../store/AllStores';
import { FinishingHouseOptionsFromApi, SpotSentAllSpotsFromApi, SpotSentOptionsFromApi } from '../types/spotSent';
import { DateHandler } from '../helpers/DateHandler';
import { CampaignFromApi } from '../types/campaign';

export class SpotSentActionsClass {

    @action
    public fetchAllSpots = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (forceFetch) {

                const response = (await API.getData(APIPath.SPOT_SENT, {
                    length: 99999,
                    offset: 0,
                })) as SpotSentAllSpotsFromApi[];

                SpotSentStore.spotSentAllSpots = response.map(campaign => ({
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
    public fetchSpotSentOptions = async (): Promise<boolean> => {
        try {
            const response = (await API.getData(APIPath.SPOT_SENT_OPTIONS)) as SpotSentOptionsFromApi;
            SpotSentStore.spotSentFinishingOptions = response.finishing_option;
            SpotSentStore.spotSentFramerateOptions = response.framerate_option;
            SpotSentStore.spotSentRasterSizeOptions = response.raster_size_option;
            SpotSentStore.spotSentDeliveryToClientOptions = response.delivery_to_client_option;
            SpotSentStore.spotSentAudioOptions = response.audio_option;
            SpotSentStore.spotSentSentViaMethodOptions = response.sent_via_method;
            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchFinishingHousesOptions = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (forceFetch ||
                (SpotSentStore.spotSentFinishingHouseAreBeingFetched === false &&
                DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, SpotSentStore.spotSentFinishingHouseLastFetchTimeStamp))
            ) {
                SpotSentStore.spotSentFinishingHouseAreBeingFetched = true;

                const response = (await API.getData(APIPath.FINISHING_HOUSE, {
                    length: 99999,
                    offset: 0,
                })) as FinishingHouseOptionsFromApi[];

                SpotSentStore.spotSentFinishingHouseAreBeingFetched = false;
                SpotSentStore.spotSentFinishingHouseLastFetchTimeStamp = Date.now();
                SpotSentStore.spotSentFinishingHouseOptions = response;
            }
            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public createNewFinishingHouse = async (
        finishingHouseName: string
    ): Promise<{ id: number; name: string; }> => {
        try {
            const newFinishingHouse = (await API.postData(APIPath.FINISHING_HOUSE, {
                name: finishingHouseName,
            })) as FinishingHouseOptionsFromApi[];

            return {
                id: newFinishingHouse.filter((option: FinishingHouseOptionsFromApi) => {
                    return (option.name === finishingHouseName);
                })[0].id,
                name: finishingHouseName
            };
        } catch (error) {
            throw error;
        }
    };

}
