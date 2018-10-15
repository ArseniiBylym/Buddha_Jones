import { API, APIPath } from '../fetch';
import { action } from 'mobx';
import { SpotSentStore } from '../store/AllStores';
import {
    FinishingHouseOptionsFromApi,
    SpotSentAllSpotsSentFromApi,
    SpotSentAllSpotsSentSpotData,
    SpotSentAllSpotsSentSpotDataFromApi, SpotSentFromApi,
    SpotSentOptionsFromApi
} from '../types/spotSent';
import { DateHandler } from '../helpers/DateHandler';
import { SpotSentValueForSubmit } from '../routes/SpotSent/Producer/Form/ProducerSpotSentForm';

export class SpotSentActionsClass {

    @action
    public fetchAllSpots = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (forceFetch) {

                SpotSentStore.spotSentAllSpotsLoading = true;
                const response = (await API.getData(APIPath.SPOT_SENT, {
                    length: 99999,
                    offset: 0,
                })) as SpotSentAllSpotsSentFromApi[];

                let spotSentAllSpots: SpotSentAllSpotsSentSpotData[] = [];

                response.forEach((spot: SpotSentAllSpotsSentFromApi) => {
                    spot.spotData.forEach((data: SpotSentAllSpotsSentSpotDataFromApi) => {
                        let spotItem: SpotSentAllSpotsSentSpotData = {
                            project : {
                                name : (spot.projectName) ? spot.projectName : 'N/A',
                                title : 'Project'
                            },
                            campaign : {
                                name : (data.campaignName) ? data.campaignName : 'N/A',
                                title : 'Campaign'
                            },
                            spot : {
                                name : (data.spotName) ? data.spotName : 'N/A',
                                title : 'Spot'
                            },
                            version : {
                                name : (data.versionName) ? data.versionName : 'N/A',
                                title : 'Version'
                            },
                            finishRequest : {
                                name : data.finishRequest,
                                title : 'Finish request'
                            },
                            status : {
                                name : (data.lineStatusName) ? data.lineStatusName : 'N/A',
                                title : 'Status'
                            },
                            changed : {
                                name : (spot.updatedAt && spot.updatedAt.date) ? spot.updatedAt.date : '',
                                title : 'Changed'
                            }
                        };
                        spotSentAllSpots.push(spotItem);
                    });
                });
                SpotSentStore.spotSentAllSpots = spotSentAllSpots;
                SpotSentStore.spotSentAllSpotsLoading = false;
            }
            return true;
        } catch (error) {
            SpotSentStore.spotSentAllSpotsLoading = false;
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
                    length : 99999,
                    offset : 0,
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
                name : finishingHouseName,
            })) as FinishingHouseOptionsFromApi[];

            return {
                id : newFinishingHouse.filter((option: FinishingHouseOptionsFromApi) => {
                    return (option.name === finishingHouseName);
                })[0].id,
                name : finishingHouseName
            };
        } catch (error) {
            throw error;
        }
    };

    @action
    public createNewSpotSent = async (
        spotSentValue: SpotSentValueForSubmit
    ): Promise<{ spot_sent_id: number }> => {
        try {
            const newSpotSent = (await API.postData(
                APIPath.SPOT_SENT,
                spotSentValue,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )) as SpotSentFromApi;
            return newSpotSent;
        } catch (error) {
            throw error;
        }
    };

}
