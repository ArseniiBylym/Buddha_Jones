import { unformat } from 'accounting';
import * as addMinutes from 'date-fns/add_minutes';
import * as datesDifferenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import * as datesDistanceInWords from 'date-fns/distance_in_words';
import * as formatDate from 'date-fns/format';
import * as getHoursFromDate from 'date-fns/get_hours';
import * as getMinutesFromDate from 'date-fns/get_minutes';
import * as isDateAfterAnotherDate from 'date-fns/is_after';
import * as isDateTheSameDay from 'date-fns/is_same_day';
import * as parseDate from 'date-fns/parse';
import * as setHoursOnDate from 'date-fns/set_hours';
import * as setMinutesOnDate from 'date-fns/set_minutes';
import padStart from 'lodash-es/padStart';
import { DateObjectFromApi } from 'types/api';

export class DateHandler {
    static printDateObjectAsString = (date: Date, format: string = 'MM/DD/YYYY'): string => {
        return formatDate(date, format);
    };

    static printAsTimeAgoFromNow = (
        date: Date,
        olderThanDayAsFullDate: boolean = false,
        newerThanMinuteAsJustNow: boolean = false
    ) => {
        const now: Date = new Date();
        const differenceInMilliseconds = datesDifferenceInMilliseconds(now, date);
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

        if (newerThanMinuteAsJustNow && differenceInSeconds <= 60) {
            return 'Just now';
        }

        if (olderThanDayAsFullDate && differenceInSeconds > 86400) {
            return formatDate(date, 'MM/DD/YYYY hh:mm a');
        }

        return datesDistanceInWords(date, now, { includeSeconds: false });
    };

    static printPeriodBetweenTwoDatesAsHoursString = (
        dateFrom: Date,
        dateTil: Date,
        padLeftWithZero: boolean = false
    ): string => {
        const format = padLeftWithZero ? 'hh:mm a' : 'h:mm a';
        return formatDate(dateFrom, format) + ' – ' + formatDate(dateTil, format);
    };

    static printPeriodBetweenDateAndDuration = (
        startDate: Date,
        durationInMinutes: number,
        padLeftWithZero: boolean = false
    ): string => {
        const endDate = addMinutes(startDate, durationInMinutes);
        return DateHandler.printPeriodBetweenTwoDatesAsHoursString(startDate, endDate, padLeftWithZero);
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

    static checkIfDateIsOlderThanOtherDate = (date1: Date, date2: Date): boolean => {
        return isDateAfterAnotherDate(date1, date2);
    };

    static checkIfDatesAreSameDay = (date1: Date, date2: Date): boolean => {
        return isDateTheSameDay(date1, date2);
    };

    static getHoursFromDateTime = (date: Date): number => {
        return getHoursFromDate(date);
    };

    static getMinutesFromDateTime = (date: Date): number => {
        return getMinutesFromDate(date);
    };

    static getTotalMinutesFromDateTime = (date: Date): number => {
        return getHoursFromDate(date) * 60 + getMinutesFromDate(date);
    };

    static setTotalMinutesOnDate = (date: Date, totalMinutes: number): Date => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes - hours * 60;
        return setHoursOnDate(setMinutesOnDate(date, minutes), hours);
    };

    static convertHoursNumberToHM = (hours: number): string => {
        return DateHandler.convertTotalMinutesToHM(hours * 60);
    };

    static convertHoursNumberToTotalMinutes = (hours: number): number => {
        return hours * 60;
    };

    static convertTotalMinutesToHM = (totalMinutes: number, padLeftWithZero: boolean = false): string => {
        const hoursDotMinutes = DateHandler.convertTotalMinutesToHoursDotMinutes(totalMinutes);
        const split = hoursDotMinutes.split('.');
        return (
            (padLeftWithZero ? padStart(split[0], 2, '0') : split[0]) +
            'h' +
            ' ' +
            (padLeftWithZero ? padStart(split[1], 2, '0') : split[1]) +
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

    static parseDateStringAsDateObject = (dateObj: DateObjectFromApi | string): Date => {
        if (typeof dateObj === 'string') {
            return parseDate(dateObj);
        } else if (typeof dateObj === 'object' && typeof dateObj.date !== 'undefined') {
            if (dateObj.timezone === 'US/Eastern' && dateObj.timezone_type === 3) {
                return parseDate(dateObj.date.replace(' ', 'T') + '-09:00');
            } else {
                return parseDate(dateObj.date);
            }
        } else {
            return new Date();
        }
    };
}
