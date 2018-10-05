import { API, APIPath } from '../fetch';
import { action } from 'mobx';
import { SpotSentStore } from '../store/AllStores';
import { SpotSentOptionsFromApi } from '../types/spotSent';

export class SpotSentActionsClass {
    @action
    public fetchSpotSentOptions = async (): Promise<boolean> => {
        try {
            SpotSentStore.loadingCount++;
            const response = (await API.getData(APIPath.SPOT_SENT_OPTIONS)) as SpotSentOptionsFromApi;
            SpotSentStore.spotSentFinishingOptions = response.finishing_option;
            SpotSentStore.spotSentFramerateOptions = response.framerate_option;
            SpotSentStore.spotSentRasterSizeOptions = response.raster_size_option;
            SpotSentStore.spotSentDeliveryToClientOptions = response.delivery_to_client_option;
            SpotSentStore.spotSentAudioOptions = response.audio_option;
            SpotSentStore.loadingCount--;
            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchSpotSentOptions();
                SpotSentStore.loadingCount--;
            }, 1024);
            throw error;
        }
    };
}
