import { action } from 'mobx';
import { StudioRateCardStore } from '../store/AllStores';
import { API, APIPath } from 'fetch';
import { RateCardType } from 'types/studioRateCard';
import { RateCard } from '../types/studioRateCard';

export class StudioRateCardActionsClass {
    @action setStudioId = (id: number): void => {
        StudioRateCardStore.id = id;
    };

    @action setSelectedRateCardId = (id: number): void => {
        StudioRateCardStore.selectedRateCardId = id;
    };

    @action
    public getStudioRateCard = async (): Promise<boolean> => {
        try {
            StudioRateCardStore.rateCard.loading = true;
            const response = (await API.getData(`${APIPath.STUDIO_RATE_CARD}`, {
                studio_id: StudioRateCardStore.id,
                ratecard_id: StudioRateCardStore.selectedRateCardId,
            }, false, true)) as {
                data: {
                    studio: {
                        id: number,
                        studioName: string,
                    }
                    studioRateCard: RateCard[];
                }
            };

            StudioRateCardStore.name = response.data.studio.studioName;
            const data: {
                [key: number]: RateCard
            } = {};

            response.data.studioRateCard.forEach((value) => {
                data[value.activityId] = value;
            });

            StudioRateCardStore.rateCard.data = data;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCard.loading = false;
        }
    };

    @action
    public saveStudioRateCard = async (id: number, ratecardId: number, activityId: number, rate: number, trtId: number, revisionInc: number, note: string): Promise<boolean> => {
        try {
            const response = (await API.putData(`${APIPath.STUDIO_RATE_CARD}/${id}`, {
                ratecard_id: ratecardId,
                activity_id: activityId,
                rate: rate,
                trt_id: trtId,
                revision_inc: revisionInc,
                note: note,
            })) as RateCard[];
            
            const data: {
                [key: number]: RateCard
            } = {};

            response.forEach((value) => {
                data[value.activityId] = value;
            });

            StudioRateCardStore.rateCard.data = data;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCard.loading = false;
        }
    };

    @action
    public addStudioRateCard = async (ratecardId: number, activityId: number, rate: number, trtId: number, revisionInc: number, note: string): Promise<boolean> => {
        try {
            const response = (await API.postData(`${APIPath.STUDIO_RATE_CARD}`, {
                ratecard_id: ratecardId,
                activity_id: activityId,
                rate: rate,
                trt_id: trtId,
                revision_inc: revisionInc,
                note: note,
            })) as RateCard[];

            const data: {
                [key: number]: RateCard
            } = {};

            response.forEach((value) => {
                data[value.activityId] = value;
            });

            StudioRateCardStore.rateCard.data = data;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCard.loading = false;
        }
    };

    @action
    public removeStudioRateCard = async (activityId: number): Promise<boolean> => {
        try {
            const response = (await API.deleteData(`${APIPath.STUDIO_RATE_CARD}/${activityId}`)) as RateCard[];

            const data: {
                [key: number]: RateCard
            } = {};

            response.forEach((value) => {
                data[value.activityId] = value;
            });

            StudioRateCardStore.rateCard.data = data;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCard.loading = false;
        }
    };

    @action
    public getStudioRateCardTypes = async (): Promise<boolean> => {
        try {
            StudioRateCardStore.rateCardTypes.loading = true;
            const response = (await API.getData(`${APIPath.STUDIO_RATE_CARD_TYPE}`, {
                studio_id: StudioRateCardStore.id,
            }, false, true)) as {
                data: RateCardType[];
            };
            const data: {
                [key: number]: RateCardType
            } = {};
            response.data.forEach((value) => {
                data[value.ratecardId] = value;
            });
            StudioRateCardStore.rateCardTypes.data = data;
            if (!StudioRateCardStore.selectedRateCardId && Object.keys(data).length > 0) {
                StudioRateCardStore.selectedRateCardId = Number(Object.keys(data)[0]);
            }

            if (Object.keys(data).length === 0) {
                StudioRateCardStore.selectedRateCardId = null;
            }

            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCardTypes.loading = false;
        }
    };

    @action
    public addRateCardType = async (name: string): Promise<boolean> => {
        try {
            StudioRateCardStore.rateCardTypes.adding = true;
            const response = (await API.postData(`${APIPath.STUDIO_RATE_CARD_TYPE}`, {
                studio_id: StudioRateCardStore.id,
                ratecard_name: name,
            })) as RateCardType[];

            const data: {
                [key: number]: RateCardType
            } = {};

            response.forEach((value) => {
                data[value.ratecardId] = value;
            });
            StudioRateCardStore.rateCardTypes.data = data;
            if (!StudioRateCardStore.selectedRateCardId && Object.keys(data).length > 0) {
                StudioRateCardStore.selectedRateCardId = Number(Object.keys(data)[0]);
            }

            if (Object.keys(data).length === 0) {
                StudioRateCardStore.selectedRateCardId = null;
            } else {
                StudioRateCardStore.selectedRateCardId = Math.max(...this.getKeys(data));
            }

            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCardTypes.adding = false;
        }
    }

    @action
    public saveRateCardType = async (name: string): Promise<boolean> => {
        try {
            StudioRateCardStore.rateCardTypes.saving = true;
            const response = (await API.putData(`${APIPath.STUDIO_RATE_CARD_TYPE}/${StudioRateCardStore.selectedRateCardId}`, {
                studio_id: StudioRateCardStore.id,
                ratecard_name: name,
            })) as RateCardType[];

            const data: {
                [key: number]: RateCardType
            } = {};

            response.forEach((value) => {
                data[value.ratecardId] = value;
            });
            StudioRateCardStore.rateCardTypes.data = data;
            if (!StudioRateCardStore.selectedRateCardId && Object.keys(data).length > 0) {
                StudioRateCardStore.selectedRateCardId = Number(Object.keys(data)[0]);
            }

            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCardTypes.saving = false;
        }
    }

    @action
    public deleteRateCardType = async (): Promise<boolean> => {
        try {
            StudioRateCardStore.rateCardTypes.deleting = true;
            const response = (await API.deleteData(`${APIPath.STUDIO_RATE_CARD_TYPE}/${StudioRateCardStore.selectedRateCardId}`)) as RateCardType[];

            const data: {
                [key: number]: RateCardType
            } = {};

            response.forEach((value) => {
                data[value.ratecardId] = value;
            });
            StudioRateCardStore.rateCardTypes.data = data;

            if (Object.keys(data).length === 0) {
                StudioRateCardStore.selectedRateCardId = null;
            } else {
                StudioRateCardStore.selectedRateCardId = Math.min(...this.getKeys(data));
            }

            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            StudioRateCardStore.rateCardTypes.deleting = false;
        }
    }

    private getKeys = (data: { [key: number]: RateCardType }): number[] => Object.keys(data).map(i => Number(i));
}
