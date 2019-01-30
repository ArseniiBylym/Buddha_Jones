import { SpotBillFormActivityTimeEntry } from 'types/spotBilling';

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
}
