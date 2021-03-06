import * as dateDifferenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import * as dateDistanceInWords from 'date-fns/distance_in_words';
import * as dateFormat from 'date-fns/format';
import * as dateGetHours from 'date-fns/get_hours';
import * as dateGeMinutes from 'date-fns/get_minutes';
import padStart from 'lodash-es/padStart';
import { unformat } from 'accounting';

export class DateHandler {
    static printAsTimeAgoFromNow = (
        date: Date,
        olderThanDayAsFullDate: boolean = false,
        newerThanMinuteAsJustNow: boolean = false
    ) => {
        const now: Date = new Date();
        const differenceInMilliseconds = dateDifferenceInMilliseconds(now, date);
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

        if (newerThanMinuteAsJustNow && differenceInSeconds <= 60) {
            return 'Just now';
        }

        if (olderThanDayAsFullDate && differenceInSeconds > 86400) {
            return dateFormat(date, 'MM/DD/YYYY hh:mm a');
        }

        return dateDistanceInWords(date, now, { includeSeconds: false });
    };

    static convertTotalMinutesToTimeLabel = (totalMinutes: number = 0): { value: number; label: string } => {
        // Remove additional days
        while (totalMinutes >= 1440) {
            totalMinutes -= 1440;
        }

        // Turn minutes into hour
        const value = totalMinutes / 60;

        // Construct label
        let label = '';

        // Get hour
        let hour = Math.floor(value);
        if (hour === 0) {
            hour = 12;
        } else if (hour > 12) {
            hour = hour - 12;
        }
        label += padStart(hour.toFixed(0), 2, '0');
        label += ':';

        // Get minutes
        let minute = 0;
        if (totalMinutes < 60) {
            minute = totalMinutes;
        } else if (totalMinutes > 720) {
            minute = (totalMinutes / 60 - Math.floor(value)) * 60;
        } else {
            minute = (value - hour) * 60;
        }
        label += padStart(minute.toFixed(0), 2, '0');

        // Add AM/PM
        if (value >= 0 && value < 12) {
            label += 'AM';
        } else if (value >= 12) {
            label += 'PM';
        }

        return {
            label: label,
            value: value,
        };
    };

    static convertDateTimeToTimeLabel = (date: Date): { value: number; label: string } => {
        return DateHandler.convertTotalMinutesToTimeLabel(date.getHours() * 60 + date.getMinutes());
    };

    static checkIfTimeStampIsOlderThanXMinutes = (minutes: number, timestamp: number, comparedTo?: number) => {
        comparedTo = typeof comparedTo !== 'undefined' ? comparedTo : Date.now();
        return comparedTo - timestamp > 1000 * 60 * minutes;
    };

    static getTotalMinutesFromDateTime = (date: Date): number => {
        return dateGetHours(date) * 60 + dateGeMinutes(date);
    };

    static convertHoursNumberToHM = (hours: number): string => {
        return DateHandler.convertTotalMinutesToHM(hours * 60);
    };

    static convertHoursNumberToTotalMinutes = (hours: number): number => {
        return hours * 60;
    }

    static convertTotalMinutesToHM = (totalMinutes: number, ensureTimesHaveTwoCharacters: boolean = false): string => {
        const hoursDotMinutes = DateHandler.convertTotalMinutesToHoursDotMinutes(totalMinutes);
        const split = hoursDotMinutes.split('.');
        return (
            (ensureTimesHaveTwoCharacters ? padStart(split[0], 2, '0') : split[0]) +
            'h' +
            ' ' +
            (ensureTimesHaveTwoCharacters ? padStart(split[1], 2, '0') : split[1]) +
            'min'
        );
    };

    static convertTotalMinutesToHoursDotMinutes = (totalMinutes: number): string => {
        const hoursDecimal = totalMinutes / 60;
        const hours = Math.floor(hoursDecimal);
        const minutes = (hoursDecimal - hours) * 60;

        return hours + '.' + minutes;
    };

    static convertHoursDotMinutesToTotalMinutes = (hoursDotMinutes: string): number => {
        const splitDuration = hoursDotMinutes.split('.');
        const durationHours = unformat(splitDuration[0]);
        const durationMinutes = splitDuration.length >= 2 ? unformat(splitDuration[1]) : 0;
        return durationHours * 60 + durationMinutes;
    };
}
