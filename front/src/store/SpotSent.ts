import { observable } from 'mobx';
import {
    FinishingHouseOptionsFromApi,
    SpotSentAllSpotsSentSpotData,
    SpotSentAudioOptionsFromApi, SpotSentOptionsChildrenFromApi,
    SpotSentOptionsStdSectionFromApi
} from '../types/spotSent';
import { SpotSentValueForSubmit } from '../types/spotSentForm';

export class SpotSent {
    @observable public spotSentAllSpots: SpotSentAllSpotsSentSpotData[] | null = null;
    @observable public spotSentAllSpotsLoading: boolean = false;

    @observable public spotSentFinishingOptions: SpotSentOptionsStdSectionFromApi[] | null = null;
    @observable public spotSentFramerateOptions: string[] | null = null;
    @observable public spotSentRasterSizeOptions: string[] | null = null;
    @observable public spotSentDeliveryToClientOptions: SpotSentOptionsStdSectionFromApi[] | null = null;
    @observable public spotSentAudioOptions: SpotSentAudioOptionsFromApi[] | null = null;
    @observable public spotSentSentViaMethodOptions: SpotSentOptionsChildrenFromApi[] | null = null;
    @observable public spotSentGraphicsSentViaMethodOptions: SpotSentOptionsChildrenFromApi[] | null = null;

    @observable public spotSentFinishingHouseLastFetchTimeStamp: number = 0;
    @observable public spotSentFinishingHouseOptions: FinishingHouseOptionsFromApi[] | null = null;
    @observable public spotSentFinishingHouseAreBeingFetched: boolean = false;
    @observable public viaMethodsModalToggle: boolean = false;
    @observable public viaMethodsModalToggleMessage: string = '';
    @observable public spotVersionModalToggle: boolean = false;
    @observable public existedSpot: {name: string, id: number | null} = {name: '', id: null};

    @observable public spotSentDetails: SpotSentValueForSubmit = {
        project_id: null,
        project_name: null,
        spot_version: [],
        finish_option: {
            parent: 1,
            child: 1
        },
        notes: '',
        internal_note: '',
        studio_note: '',
        status: 1,
        full_lock: 0,
        deadline: null,
        spot_sent_date: null,
        finishing_house: null,
        finishing_house_name: null,
        framerate: null,
        framerate_note: '',
        raster_size: null,
        raster_size_note: '',
        music_cue_sheet: 0,
        audio_prep: 0,
        video_prep: 0,
        spec_note: '',
        spec_sheet_file: null,
        tag_chart: '',
        delivery_to_client: null,
        delivery_note: '',
        audio: [],
        audio_note: '',
        graphics_finish: 0,
        gfx_finish: 0,
        customer_contact: [],
        customer_name: '',
        graphics_note: '',
        music_note: '',
        final_narr: '',
        qc_link: '',
    };

    @observable public spotSentDetailsLastFetchTimestamp: number = 0;
    @observable public spotSentDetailsLoading: boolean = false;
}
