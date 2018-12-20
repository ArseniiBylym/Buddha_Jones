import { API, APIPath } from '../fetch';
import { action } from 'mobx';
import { SpotSentStore } from '../store/AllStores';
import {
    FinishingHouseOptionsFromApi,
    SpotSentAllSpotsSentFromApi,
    SpotSentAllSpotsSentSpotData,
    SpotSentAllSpotsSentSpotDataFromApi, SpotSentDetailsFromApi, SpotSentDetailsSpotDataFromApi, SpotSentFromApi,
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
                            project: {
                                name: (spot.projectName) ? spot.projectName : 'N/A',
                                title: 'Project'
                            },
                            campaign: {
                                name: (data.campaignName) ? data.campaignName : 'N/A',
                                title: 'Campaign'
                            },
                            spot: {
                                name: (data.spotName) ? data.spotName : 'N/A',
                                title: 'Spot'
                            },
                            version: {
                                name: (data.versionName) ? data.versionName : 'N/A',
                                title: 'Version'
                            },
                            finishRequest: {
                                name: data.finishRequest,
                                title: 'Finish request'
                            },
                            status: {
                                name: (data.lineStatusName) ? data.lineStatusName : 'N/A',
                                title: 'Status'
                            },
                            changed: {
                                name: (spot.updatedAt && spot.updatedAt.date) ? spot.updatedAt.date : '',
                                title: 'Changed'
                            },
                            edit: {
                                name: spot.requestId.toString(),
                                title: ''
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
    public fetchSpotSentDetails = async (id: number, forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (
                    !SpotSentStore.spotSentDetailsLoading &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                        5,
                        SpotSentStore.spotSentDetailsLastFetchTimestamp
                    )
                )
            ) {
                SpotSentStore.spotSentDetailsLoading = true;

                const response = (await API.getData(APIPath.SPOT_SENT + '/' + id)) as SpotSentDetailsFromApi;

                SpotSentStore.spotSentDetails = {
                    project_id: response.projectId,
                    project_name: response.projectName,
                    spot_version: response.spotData.map((spot: SpotSentDetailsSpotDataFromApi) => {
                        console.log('spot=', spot);
                        return {
                            campaign_id: spot.campaignId,
                            campaign_name: spot.campaignName,
                            project_campaign_id: spot.projectCampaignId,
                            spot_id: spot.spotId,
                            spot_name: spot.spotName + (spot.runtime ? ` (${spot.runtime})` : ''),
                            version_id: spot.versionId,
                            version_name: spot.versionName,
                            editors: spot.editor,
                            spot_resend: spot.spotResend,
                            finish_request: spot.finishRequest,
                            line_status_id: spot.lineStatusId,
                            finish_accept: spot.finishAccept,
                            prod_accept: spot.prodAccept,
                            sent_via_method: (spot.sentViaMethod) ? spot.sentViaMethod.split(',').map((method: string) => {
                                return parseInt(method, 0);
                            }) : null
                        };
                    }),
                    finish_option: response.finishOption,
                    notes: (response.notes) ? response.notes : '',
                    internal_note: (response.internalNote) ? response.internalNote : '',
                    studio_note: (response.studioNote) ? response.studioNote : '',
                    status: response.statusId,
                    full_lock: response.fullLock,
                    deadline: (response.deadline && response.deadline) ? new Date(response.deadline.date) : null,
                    spot_sent_date: (response.spotSentDate && response.spotSentDate.date) ? new Date(response.spotSentDate.date) : null,
                    finishing_house: response.finishingHouse,
                    finishing_house_name: response.finishingHouseName,
                    framerate: response.framerate,
                    framerate_note: (response.framerateNote) ? response.framerateNote : '',
                    raster_size: response.rasterSize,
                    raster_size_note: (response.rasterSizeNote) ? response.rasterSizeNote : '',
                    music_cue_sheet: response.musicCueSheet,
                    audio_prep: response.audioPrep,
                    video_prep: response.videoPrep,
                    spec_note: (response.specNote) ? response.specNote : '',
                    spec_sheet_file: response.specSheetFile,
                    tag_chart: (response.tagChart) ? response.tagChart : '',
                    delivery_to_client: response.deliveryToClient,
                    delivery_note: (response.deliveryNote) ? response.deliveryNote : '',
                    audio: response.audio,
                    audio_note: (response.audioNote) ? response.audioNote : '',
                    graphics_finish: response.graphicsFinish,
                    gfx_finish: response.gfxFinish,
                    customer_contact: response.customerContact,
                };

                SpotSentStore.spotSentDetailsLastFetchTimestamp = Date.now();
                SpotSentStore.spotSentDetailsLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchSpotSentDetails(id, true);
            }, 512);
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

    @action
    public updateSpotSent = async (
        id: number,
        spotSentValue: SpotSentValueForSubmit
    ): Promise<{ spot_sent_id: number }> => {
        try {
            const newSpotSent = (await API.putData(
                APIPath.SPOT_SENT + '/' + id,
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
