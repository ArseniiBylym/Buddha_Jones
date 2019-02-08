import { SpotToBillFormStore } from 'store/AllStores';
import { SpotBillFormActivityGroup, SpotBillFormActivityTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { SpotBillActivityRateType } from 'types/spotBillingEnums';
import { StudioRateCardEntryFromApi } from 'types/studioRateCard';

export class ActivityHandler {
    public static constructActivityKey = (
        activityId: number,
        spotId: number | null,
        versionId: number | null
    ): string => {
        return (
            (activityId ? activityId : '') + (spotId ? '-' + spotId : '') + (versionId ? '-' + versionId : '') || 'none'
        );
    };

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
    };

    public static calculateActivityTotals = (
        activity: SpotBillFormActivityGroup,
        spotsInBill: SpotBillFormSpot[],
        studioFlatRates: StudioRateCardEntryFromApi[],
        studioRateCardValues: StudioRateCardEntryFromApi[]
    ): number => {
        return activity.rateType === SpotBillActivityRateType.FirstStage
            ? ActivityHandler.calculateFirstRateActivityTotals(activity, spotsInBill)
            : activity.rateType === SpotBillActivityRateType.Flat
            ? ActivityHandler.calculateFlatActivityTotals(activity, studioFlatRates)
            : ActivityHandler.calculateHourlyActivityTotals(activity, studioRateCardValues);
    };

    public static calculateFirstRateActivityTotals = (
        activity: SpotBillFormActivityGroup,
        spotsInBill: SpotBillFormSpot[]
    ): number => {
        // For first stage
        if (activity.rateType === SpotBillActivityRateType.FirstStage) {
            let firstStageRate: number | null = null;
            if (activity.rateFlatOrFirstStageId) {
                const spot = spotsInBill.find(spotInBill => spotInBill.spotId === activity.rateFlatOrFirstStageId);
                firstStageRate = spot && spot.firstRevisionCost !== null ? spot.firstRevisionCost : null;
            }

            return activity.rateAmount !== null ? activity.rateAmount : firstStageRate !== null ? firstStageRate : 0;
        }

        return 0;
    };

    public static calculateFlatActivityTotals = (
        activity: SpotBillFormActivityGroup,
        studioFlatRates: StudioRateCardEntryFromApi[]
    ): number => {
        // For flat rate
        if (activity.rateType === SpotBillActivityRateType.Flat) {
            const flatRate = activity.rateFlatOrFirstStageId
                ? studioFlatRates.find(rate => rate.id === activity.rateFlatOrFirstStageId)
                : undefined;

            return activity.rateAmount !== null ? activity.rateAmount : flatRate && flatRate.rate ? flatRate.rate : 0;
        }

        return 0;
    };

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
                    const timeEntryTotals = ActivityHandler.calculateHourlyTimeEntryTotals(
                        inBillTimeEntry,
                        studioRateCardValues
                    );
                    hourlyTotal += timeEntryTotals.totalAmount;
                }

                return hourlyTotal;
            }, 0);
        }

        return 0;
    };

    public static calculateBaseActivityRate = (
        activityId: number,
        studioRateCardValues: StudioRateCardEntryFromApi[] = []
    ): number => {
        const rateCard = studioRateCardValues.find(card => card.activityId === activityId);
        if (rateCard) {
            return rateCard.rate || 0;
        }

        return 0;
    };

    public static calculateRegularRate = (baseRate: number = 0): number => {
        return baseRate * 1.0;
    };

    public static calculateOvertimeRate = (baseRate: number = 0): number => {
        return baseRate * 1.5;
    };

    public static calculateDoubletimeRate = (baseRate: number = 0): number => {
        return baseRate * 2.0;
    };

    public static calculateRegularHoursAmount = (timeInMinutes: number, baseRate: number = 0): number => {
        return (timeInMinutes / 60) * ActivityHandler.calculateRegularRate(baseRate);
    };

    public static calculateOvertimeHoursAmount = (timeInMinutes: number, baseRate: number = 0): number => {
        return (timeInMinutes / 60) * ActivityHandler.calculateOvertimeRate(baseRate);
    };

    public static calculateDoubletimeHoursAmount = (timeInMinutes: number, baseRate: number = 0): number => {
        return (timeInMinutes / 60) * ActivityHandler.calculateDoubletimeRate(baseRate);
    };

    public static calculateHourlyTimeEntryTotals = (
        inBillTimeEntry: SpotBillFormActivityTimeEntry,
        studioRateCardValues: StudioRateCardEntryFromApi[] = []
    ): {
        totalHours: number;
        totalAmount: number;
        regularHours: number;
        regularRate: number;
        regularAmount: number;
        overtimeHours: number;
        overtimeRate: number;
        overtimeAmount: number;
        doubletimeHours: number;
        doubletimeRate: number;
        doubletimeAmount: number;
    } => {
        const totalHours: number =
            inBillTimeEntry.regularBillableMinutes +
            inBillTimeEntry.overtimeBillableMinutes +
            inBillTimeEntry.doubletimeBillableMinutes;
        let totalAmount: number = 0;
        let regularRate: number = 0;
        let regularAmount: number = 0;
        let overtimeRate: number = 0;
        let overtimeAmount: number = 0;
        let doubletimeRate: number = 0;
        let doubletimeAmount: number = 0;

        const rate = ActivityHandler.calculateBaseActivityRate(inBillTimeEntry.activityId, studioRateCardValues);
        if (rate) {
            regularRate = ActivityHandler.calculateRegularRate(rate);
            overtimeRate = ActivityHandler.calculateOvertimeRate(rate);
            doubletimeRate = ActivityHandler.calculateDoubletimeRate(rate);

            regularAmount = ActivityHandler.calculateRegularHoursAmount(inBillTimeEntry.regularBillableMinutes, rate);
            overtimeAmount = ActivityHandler.calculateOvertimeHoursAmount(
                inBillTimeEntry.overtimeBillableMinutes,
                rate
            );
            doubletimeAmount = ActivityHandler.calculateDoubletimeHoursAmount(
                inBillTimeEntry.doubletimeBillableMinutes,
                rate
            );

            totalAmount = regularAmount + overtimeAmount + doubletimeAmount;
        }

        return {
            totalHours: totalHours,
            totalAmount: totalAmount,
            regularHours: inBillTimeEntry.regularBillableMinutes,
            regularRate: regularRate,
            regularAmount: regularAmount,
            overtimeHours: inBillTimeEntry.overtimeBillableMinutes,
            overtimeRate: overtimeRate,
            overtimeAmount: overtimeAmount,
            doubletimeHours: inBillTimeEntry.doubletimeBillableMinutes,
            doubletimeRate: doubletimeRate,
            doubletimeAmount: doubletimeAmount,
        };
    };
}
