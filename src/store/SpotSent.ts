import { observable } from 'mobx';
import {
    FinishingHouseOptionsFromApi,
    SpotSentAllSpotsSentSpotData,
    SpotSentAudioOptionsFromApi,
    SpotSentOptionsChildrenFromApi,
    SpotSentOptionsStdSectionFromApi
} from '../types/spotSent';
import { SpotSentValueForSubmit } from '../routes/SpotSent/Producer/Form/ProducerSpotSentForm';

export class SpotSent {
    @observable public spotSentAllSpots: SpotSentAllSpotsSentSpotData[] | null = null;
    @observable public spotSentAllSpotsLoading: boolean = false;

    @observable public spotSentFinishingOptions: SpotSentOptionsStdSectionFromApi[] | null = null;
    @observable public spotSentFramerateOptions: string[] | null = null;
    @observable public spotSentRasterSizeOptions: string[] | null = null;
    @observable public spotSentDeliveryToClientOptions: SpotSentOptionsStdSectionFromApi[] | null = null;
    @observable public spotSentAudioOptions: SpotSentAudioOptionsFromApi[] | null = null;
    @observable public spotSentSentViaMethodOptions: SpotSentOptionsChildrenFromApi[] | null = null;

    @observable public spotSentFinishingHouseLastFetchTimeStamp: number = 0;
    @observable public spotSentFinishingHouseOptions: FinishingHouseOptionsFromApi[] | null = null;
    @observable public spotSentFinishingHouseAreBeingFetched: boolean = false;

    @observable public spotSentDetails: SpotSentValueForSubmit | null = null;
    @observable public spotSentDetailsLastFetchTimestamp: number = 0;
    @observable public spotSentDetailsLoading: boolean = false;
}
