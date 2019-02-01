import { SpotBillFormActivityTimeEntry, SpotBillFormActivityGroup, SpotBillFormSpot } from 'types/spotBilling';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { SpotToBillFormStore } from 'store/AllStores';

export class ActivityHandler {
    public static constructActivityKey = (activityId: number, spotId: number | null, versionId: number | null): string => {
        return (
            (activityId ? activityId : '') +
            (spotId ? '-' + spotId : '') +
            (versionId ? '-' + versionId : '')
        ) || 'none';
    }

    public static constructActivityName = (timeEntries: SpotBillFormActivityTimeEntry[]): string => {
        const includedActivityIds: number[] = [];
        let activityName: string = '';

        const includedSpotIds: number[] = [];
        let spotName: string = '';

        const includedVersionIds: number[] = [];
        let versionName: string = '';

        timeEntries.forEach(timeEntry => {
            if (includedActivityIds.indexOf(timeEntry.activityId) === -1) {
                activityName += (activityName.length > 0 ? ', ' : '') + timeEntry.activityName;
                includedActivityIds.push(timeEntry.activityId);
            }

            if (timeEntry.spotId !== null && includedSpotIds.indexOf(timeEntry.spotId) === -1) {
                spotName += (spotName.length > 0 ? ', ' : '') + timeEntry.spotName;
                includedSpotIds.push(timeEntry.spotId);
            }

            if (timeEntry.versionId !== null && includedVersionIds.indexOf(timeEntry.versionId) === -1) {
                versionName += (versionName.length > 0 ? ', ' : '') + timeEntry.versionName;
                includedVersionIds.push(timeEntry.versionId);
            }
        });

        return activityName + (spotName ? ', Spot: ' + spotName : '') + (versionName ? ' , Ver. ' + versionName : '');
    }

    public static calculateActivityTotals = (
        activity: SpotBillFormActivityGroup,
        spotsInBill: SpotBillFormSpot[],
        studioFlatRates: StudioRateCardEntryFromApi[],
        studioRateCardValues: StudioRateCardEntryFromApi[],
    ): number => {
        return activity.rateType === SpotBillActivityRateType.FirstStage
            ? ActivityHandler.calculateFirstRateActivityTotals(activity, spotsInBill)
            : activity.rateType === SpotBillActivityRateType.Flat
                ? ActivityHandler.calculateFlatActivityTotals(activity, studioFlatRates)
                : ActivityHandler.calculateHourlyActivityTotals(activity, studioRateCardValues);
    }

    public static calculateFirstRateActivityTotals = (
        activity: SpotBillFormActivityGroup,
        spotsInBill: SpotBillFormSpot[],
    ): number => {

                // For first stage
                if (activity.rateType === SpotBillActivityRateType.FirstStage) {
                    let firstStageRate: number | null = null;
                    if (activity.rateFlatOrFirstStageId) {
                        const spot = spotsInBill.find(
                            spotInBill => spotInBill.spotId === activity.rateFlatOrFirstStageId
                        );
                        firstStageRate = spot && spot.firstRevisionCost !== null ? spot.firstRevisionCost : null;
                    }

                    return activity.rateAmount !== null
                            ? activity.rateAmount
                            : firstStageRate !== null
                            ? firstStageRate
                            : 0;
                }

        return 0;
    }

    public static calculateFlatActivityTotals = (
        activity: SpotBillFormActivityGroup,
        studioFlatRates: StudioRateCardEntryFromApi[],
    ): number => {
            // For flat rate
            if (activity.rateType === SpotBillActivityRateType.Flat) {
                const flatRate = activity.rateFlatOrFirstStageId
                    ? studioFlatRates.find(rate => rate.id === activity.rateFlatOrFirstStageId)
                    : undefined;

                return activity.rateAmount !== null
                        ? activity.rateAmount
                        : flatRate && flatRate.rate
                        ? flatRate.rate
                        : 0;
            }

        return 0;
    }

    public static calculateHourlyActivityTotals = (
        activity: SpotBillFormActivityGroup,
        studioRateCardValues: StudioRateCardEntryFromApi[] = []
    ): number => {
        // For hourly
        if (activity.rateType === SpotBillActivityRateType.Hourly) {
            return activity.timeEntriesIds.reduce((hourlyTotal: number, timeEntryId) => {
                const inBillTimeEntry = SpotToBillFormStore.timeEntries.find(
                    timeEntry => timeEntry.timeEntryId === timeEntryId
                );
                if (inBillTimeEntry) {
                    const rateCard = studioRateCardValues.find(card => card.activityId === inBillTimeEntry.activityId);
                    if (rateCard && rateCard.rate) {
                        hourlyTotal +=
                            ((rateCard.rate * inBillTimeEntry.regularHours) / 60) * 1 +
                            ((rateCard.rate * inBillTimeEntry.overtimeHours) / 60) * 1.5 +
                            ((rateCard.rate * inBillTimeEntry.doubletimeHours) / 60) * 2.0;
                    }
                }

                return hourlyTotal;
            }, 0);
        }

        return 0;
    };
}
