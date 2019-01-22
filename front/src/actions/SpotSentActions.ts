import { API, APIPath } from '../fetch';
import { action } from 'mobx';
import { SpotSentStore } from '../store/AllStores';
import { CampaignPeopleActions } from 'actions';
import {
    FinishingHouseOptionsFromApi,
    SpotSentAllSpotsSentFromApi,
    SpotSentAllSpotsSentSpotData,
    SpotSentAllSpotsSentSpotDataFromApi,
    // SpotSentDetailsFromApi,
    SpotSentDetailsSpotDataFromApi,
    SpotSentFromApi,
    SpotSentOptionsFromApi,
} from '../types/spotSent';
import { DateHandler } from '../helpers/DateHandler';
import { ProjectPickerSections } from '../components/Buddha';
import { ClientContact } from '../types/clients';
import {
    SpotSentValueForSubmit,
    SpotSentValueParentChildForSubmit,
    SpotSentVersionForSubmit
} from '../types/spotSentForm';
import { ToggleSideContent } from '../components/Form';
import { FileHandler } from  '../helpers/FileHandler';
// import { stringify } from 'querystring';

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
            SpotSentStore.spotSentGraphicsSentViaMethodOptions = response.graphics_sent_via_method;
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

                // const response = (await API.getData(APIPath.SPOT_SENT + '/' + id)) as SpotSentDetailsFromApi;
                const response = (await API.getData(APIPath.SPOT_SENT + '/' + id)) as any;

                SpotSentStore.spotSentDetails = {
                    project_id: response.projectId,
                    project_name: response.projectName,
                    spot_version: response.spotData.map((spot: SpotSentDetailsSpotDataFromApi) => {
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
                            }) : [],
                            graphics_sent_via_method: (spot.sentGraphicsViaMethod) ? spot.sentGraphicsViaMethod.split(',').map((method: string) => {
                                return parseInt(method, 0);
                            }) : [],
                            spot_sent_id: spot.spotSentId,
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
                    graphics_note: response.graphicsNote,
                    music_note: response.musicNote,
                    final_narr: response.finalNarr,
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

    @action 
    public deleteSpotSent = async (
        id: any
    ) => {
        try {
            const deletedSpotData = (await API.deleteData(
                APIPath.SPOTS_TO_GRAPHICS + '/' + id,
            )) as SpotSentFromApi;
            return deletedSpotData;
        } catch (error) {
            throw error;
        }
    }

    @action
    public handleDateChange = (date: Date | null) => {
        if (date !== null) {
            SpotSentStore.spotSentDetails.deadline = date;
        }
    };

    @action
    public handleProjectChange = (values, isEditMode: boolean) => {
        if (values && values.project && values.project.id && values.project.name) {
            SpotSentStore.spotSentDetails.project_id = values.project.id;
            SpotSentStore.spotSentDetails.project_name = values.project.name;
            if (!isEditMode) {
                SpotSentStore.spotSentDetails.spot_version = [this.defaultSpotElement];
            }
        } else {
            SpotSentStore.spotSentDetails.project_id = null;
            SpotSentStore.spotSentDetails.project_name = null;
        }
    };

    @action
    public handleSpotResendToggle = (spotIndex: number, checked: boolean) => {
        (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_resend = checked ? 1 : 0;
    };

    @action
    public handleSpotPDFToggle = (spotIndex: number, checked: boolean) => {
        (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).is_pdf = checked ? 1 : 0;
    };

    @action
    public handleFinishingRequestToggle = (spotIndex: number, checked: boolean) => {
        (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).finish_request = checked ? 1 : 0;
    };

    @action
    public handleSentToAdd = (customer: ClientContact): void => {
        if (customer && customer.id && SpotSentStore.spotSentDetails.customer_contact) {
            (SpotSentStore.spotSentDetails.customer_contact as ClientContact[]).push(customer);
        }
    };

    @action
    public handleSentToRemove = (index: number): void => {
        if (index > -1 && SpotSentStore.spotSentDetails.customer_contact && SpotSentStore.spotSentDetails.customer_contact[index]) {
            (SpotSentStore.spotSentDetails.customer_contact as ClientContact[]).splice(index, 1);
        }
    };

    @action
    public handleSpotRemove = (currentSpotIndex: number, deletingSpotId: any) => {
        this.deleteSpotSent(deletingSpotId);
        SpotSentStore.spotSentDetails.spot_version = [
            ...(SpotSentStore.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).slice(0, currentSpotIndex),
            ...(SpotSentStore.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).slice(currentSpotIndex + 1)
        ];
    };

    @action
    public handleCreateSpot = () => {
        (SpotSentStore.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).push(this.defaultSpotElement);
    };

    @action
    public handleSpotChange = (spotIndex: number, values, type?: ProjectPickerSections) => {
        if (type) {
            switch (type) {
                case ProjectPickerSections.projectCampaign:
                    if (values && values.projectCampaign) {
                        if (values.projectCampaign.campaignId) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).campaign_id = values.projectCampaign.campaignId;
                        }
                        if (values.projectCampaign.id) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).project_campaign_id = values.projectCampaign.id;
                        }
                        if (values.projectCampaign.name) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).campaign_name = values.projectCampaign.name;
                        }
                        CampaignPeopleActions.fetchEditorsFromProjectCampaign(values.projectCampaign.id);
                    }
                    (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_id = null;
                    (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_name = '';
                    (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).version_id = null;
                    (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).version_name = '';
                    break;
                case ProjectPickerSections.spot:
                    if (values && values.spot) {
                        if (values.spot.id) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_id = values.spot.id;
                        }
                        if (values.spot.name) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).spot_name = values.spot.name;
                        }
                    }
                    (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).version_id = null;
                    (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).version_name = '';
                    break;
                case ProjectPickerSections.version:
                    if (values && values.version) {
                        if (values.version.id) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).version_id = values.version.id;
                        }
                        if (values.version.name) {
                            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).version_name = values.version.name;
                        }
                    }
                    break;
                case ProjectPickerSections.clear:
                    this.dropSpotVersion(spotIndex);
                    break;
                default:
                    break;
            }
        }
    };

    @action
    public dropSpotVersion = (ind: number) => {
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).project_campaign_id = null;
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).campaign_id = null;
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).campaign_name = '';
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).spot_id = null;
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).spot_name = '';
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).version_id = null;
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).version_name = '';
        (SpotSentStore.spotSentDetails.spot_version[ind] as SpotSentVersionForSubmit).editors = [];
    };

    @action
    public handleSentViaMethodsChange = (spotIndex: number, method: number) => {
        const sentViaMethod: number[] = ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method as number[]);
        if (sentViaMethod.includes(method)) {
            const i: number = sentViaMethod.indexOf(method);
            if (i !== -1) {
                ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method as number[]).splice(i, 1);
            }
        } else if (!sentViaMethod.includes(method)) {
            ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).sent_via_method as number[]).push(method);
        }
    };

    @action
    public handleGraphicsSentViaMethodsChange = (spotIndex: number, method: number) => {
        const sentGraphicsViaMethod: number[] = ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).graphics_sent_via_method as number[]);
        if (sentGraphicsViaMethod.includes(method)) {
            const i: number = sentGraphicsViaMethod.indexOf(method);
            if (i !== -1) {
                ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).graphics_sent_via_method as number[]).splice(i, 1);
            }
        } else if (!sentGraphicsViaMethod.includes(method)) {
            ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).graphics_sent_via_method as number[]).push(method);
        }
    };

    @action
    public handleSpotAddingEditor = (spotIndex: number, userId: number) => {
        if ((SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).editors.indexOf(userId) === -1) {
            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).editors.push(userId);
        }
    };

    @action
    public handleSpotRemovingEditor = (spotIndex: number, editorIndex: number) => {
        if (editorIndex > -1 && (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).editors[editorIndex]) {
            (SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit).editors.splice(editorIndex, 1);
        }
    };

    @action
    public handleFinishAccept = (spotIndex: number, checked: boolean) => {
        const currentVersion = SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit;
        currentVersion.finish_accept = checked ? 1 : 0;
        (SpotSentStore.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).splice(spotIndex, 1, currentVersion);
    };

    @action
    public handleProdAccept = (spotIndex: number, checked: boolean) => {
        const currentVersion = SpotSentStore.spotSentDetails.spot_version[spotIndex] as SpotSentVersionForSubmit;
        currentVersion.prod_accept = checked ? 1 : 0;
        (SpotSentStore.spotSentDetails.spot_version as SpotSentVersionForSubmit[]).splice(spotIndex, 1, currentVersion);
    };

    @action
    public handleFinalToggle = (checked: boolean) => {
        SpotSentStore.spotSentDetails.status = (checked) ? 2 : 1;
    };

    @action
    public handleTextChange = (param: string, e) => {
        SpotSentStore.spotSentDetails[param] = e.target.value;
    };

    @action
    public inputLinkHandler = (value: string | null) => {
        SpotSentStore.spotSentDetails.qc_link = value;
    };

    @action
    public toggleModalViaMethods = () => {
        SpotSentStore.viaMethodsModalToggle = !SpotSentStore.viaMethodsModalToggle;
    };

    @action
    public resetFinishRequestForm = (): void => {
        SpotSentStore.spotSentDetails.full_lock = 0;
        SpotSentStore.spotSentDetails.notes = '';
        SpotSentStore.spotSentDetails.finishing_house = null;
        SpotSentStore.spotSentDetails.finishing_house_name = null;
        SpotSentStore.spotSentDetails.deadline = null;
        SpotSentStore.spotSentDetails.gfx_finish = 0;
        SpotSentStore.spotSentDetails.music_cue_sheet = 0;
        SpotSentStore.spotSentDetails.audio_prep = 0;
        SpotSentStore.spotSentDetails.video_prep = 0;
        SpotSentStore.spotSentDetails.graphics_finish = 0;
        SpotSentStore.spotSentDetails.framerate = null;
        SpotSentStore.spotSentDetails.framerate_note = '';
        SpotSentStore.spotSentDetails.raster_size = null;
        SpotSentStore.spotSentDetails.raster_size_note = '';
        SpotSentStore.spotSentDetails.spec_note = '';
        SpotSentStore.spotSentDetails.spec_sheet_file = null;
        SpotSentStore.spotSentDetails.tag_chart = '';
        SpotSentStore.spotSentDetails.delivery_to_client = null;
        SpotSentStore.spotSentDetails.delivery_note = '';
        SpotSentStore.spotSentDetails.audio = [];
        SpotSentStore.spotSentDetails.audio_note = '';
        SpotSentStore.spotSentDetails.customer_contact = [];
    };

    @action
    public handleTogglingRequest = (_isSetToRight: boolean, selectedSideContent: ToggleSideContent) => {
        SpotSentStore.spotSentDetails.finish_option = {
            parent: (selectedSideContent.value as number),
            child: 1
        };
        this.resetFinishRequestForm();
    };

    @action
    public handleExistingFinishingHouseSelected = (finishingHouse: { id: number; name: string }) => {
        SpotSentStore.spotSentDetails.finishing_house = finishingHouse.id;
        SpotSentStore.spotSentDetails.finishing_house_name = finishingHouse.name;
    };

    @action
    public handleFinishingTypeCheckmarkSelect = (param: string): void => {
        if (SpotSentStore.spotSentDetails[param] === 0) {
            SpotSentStore.spotSentDetails[param] = 1;
        } else {
            SpotSentStore.spotSentDetails[param] = 0;
        }
    };

    @action
    public handleGraphicsNoteChange = (value: string): void => {
            SpotSentStore.spotSentDetails.graphics_note = value;
    };

    @action
    public handleMusicNoteChange = (value: string): void => {
            SpotSentStore.spotSentDetails.music_note = value;
    };

    @action
    public finalNarrOptionsChange = (value: string): void => {
            SpotSentStore.spotSentDetails.final_narr = value;
    };

    @action
    public handleFinishingTypeChildSelect = (finishingOptionChildId: number | null): void => {
        if (SpotSentStore.spotSentDetails.finish_option) {
            (SpotSentStore.spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).child = finishingOptionChildId as number;
        }
    };

    @action
    public handleAudioCheck = (audio) => {
        if (SpotSentStore.spotSentDetails.audio && SpotSentStore.spotSentDetails.audio.includes(audio.id)) {
            let i: number = SpotSentStore.spotSentDetails.audio.indexOf(audio.id);
            if (i !== -1) {
                SpotSentStore.spotSentDetails.audio.splice(i, 1);
            }
        } else if (SpotSentStore.spotSentDetails.audio && !SpotSentStore.spotSentDetails.audio.includes(audio.id)) {
            SpotSentStore.spotSentDetails.audio.push(audio.id);
        }
    }

    @action
    public framrateClickHandler = (framRate) => {
        if (SpotSentStore.spotSentDetails.framerate && SpotSentStore.spotSentDetails.framerate.includes(framRate)) {
            let i: number = SpotSentStore.spotSentDetails.framerate.indexOf(framRate);
            if (i !== -1) {
                SpotSentStore.spotSentDetails.framerate.splice(i, 1);
            }
        } else if (SpotSentStore.spotSentDetails.framerate && !SpotSentStore.spotSentDetails.framerate.includes(framRate)) {
            SpotSentStore.spotSentDetails.framerate.push(framRate);
        } else if (!SpotSentStore.spotSentDetails.framerate) {
            SpotSentStore.spotSentDetails.framerate = [];
            SpotSentStore.spotSentDetails.framerate.push(framRate);
        }
    
    }
    @action
    public restersizeClickHandler = (resterSize) => {
        if (SpotSentStore.spotSentDetails.raster_size && SpotSentStore.spotSentDetails.raster_size.includes(resterSize)) {
            let i: number = SpotSentStore.spotSentDetails.raster_size.indexOf(resterSize);
            if (i !== -1) {
                SpotSentStore.spotSentDetails.raster_size.splice(i, 1);
            }
        } else if (SpotSentStore.spotSentDetails.raster_size && !SpotSentStore.spotSentDetails.raster_size.includes(resterSize)) {
            SpotSentStore.spotSentDetails.raster_size.push(resterSize);
        } else if (!SpotSentStore.spotSentDetails.raster_size) {
            SpotSentStore.spotSentDetails.raster_size = [];
            SpotSentStore.spotSentDetails.raster_size.push(resterSize);
        }
    }
    @action    
    public handleInputFiles = files => {
        let filesArray: any[] = [];
        for (let file of files) {
            FileHandler.readFileAsDataUri(file).then((result) => {
                filesArray.push(result.target.result);
                SpotSentStore.spotSentDetails.spec_sheet_file = filesArray;
            });
        }

    }

    private get defaultSpotElement(): SpotSentVersionForSubmit {
        return {
            campaign_id: null,
            project_campaign_id: null,
            spot_id: null,
            version_id: null,
            editors: [],
            spot_resend: 0,
            is_pdf: 0,
            finish_request: 0,
            line_status_id: null,
            sent_via_method: [],
            finish_accept: 0,
            prod_accept: 0,
            graphics_sent_via_method: [],
            graphics_file: [{file_name: '', file_description: ''}],
        };
    }
}
