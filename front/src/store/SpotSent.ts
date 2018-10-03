import { observable } from 'mobx';
import { SpotSentOptionsFromApi } from '../types/spotSent';

export class SpotSent {
    @observable spotSentOptions: SpotSentOptionsFromApi | null = null;
    @observable loadingCount: number = 0;
}
