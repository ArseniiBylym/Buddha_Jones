import { observable } from 'mobx';
import { SpotSentOptionsFromApi, SpotSentOptionsStdSectionFromApi } from '../types/spotSent';

export class SpotSent {
    @observable spotSentOptions: SpotSentOptionsFromApi | null = null;
    @observable spotSentFinishingOptions: SpotSentOptionsStdSectionFromApi[] | null = null;
    @observable spotSentFramerateOptions: string[] | null = null;
    @observable spotSentRasterSizeOptions: string[] | null = null;
    @observable spotSentDeliveryToClientOptions: SpotSentOptionsStdSectionFromApi[] | null = null;
    @observable loadingCount: number = 0;
}
