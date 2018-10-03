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
            SpotSentStore.spotSentOptions = response;

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
