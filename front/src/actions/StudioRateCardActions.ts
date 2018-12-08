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
    public setStudioRateCard = (value): void => {
        StudioRateCardStore.selectedRateCardId = value;
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
}
