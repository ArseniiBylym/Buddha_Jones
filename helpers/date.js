const { padWithCharacter } = require('./text');

const parseStringAsDateObject = exports.parseStringAsDateObject = (dateString) => {
    return new Date(dateString);
};

const printDateAsFullYear = exports.printDateAsFullYear = (date) => {
    return date.getUTCMonth() + 1 + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
};

const printDateAsDateString = exports.printDateAsDateString = (date, locale) => {
    if (typeof date !== 'undefined') {
        return typeof locale !== 'undefined' && locale === true
            ? date.toLocaleDateString()
            : date.toDateString();
    } else {
        return '';
    }
};

const printDateAsDateStringWithTime = exports.printDateAsDateStringWithTime = (date, locale) => {
    locale = typeof locale ? locale : false;
    let r = printDateAsDateString(date, locale);
    return r + ', '
        + padWithCharacter(date.getHours().toString(), 2, '0', true)
        + ':' + padWithCharacter(date.getMinutes().toString(), 2, '0', true);
};

const printDateAsYeardMonthDateTime = exports.printDateAsYeardMonthDateTime = (date, isAmerican) => {
    isAmerican = typeof isAmerican !== 'undefined' ? isAmerican : true;
    if (typeof date !== 'undefined') {
        let r = PrintDateAsYearMonthDay(date, isAmerican);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const totalMinutes = (hours * 60) + minutes;
        r += ' ' + ConvertTotalMinutesToTimeLabel(totalMinutes, isAmerican).label;
        return r;
    } else {
        return '';
    }
};

const printDateAsTimeAgo = exports.printDateAsTimeAgo = (date, oldAsFullDate, newDateAsJustNow) => {
    oldAsFullDate = typeof oldAsFullDate !== 'undefined' ? oldAsFullDate : false;
    newDateAsJustNow = typeof newDateAsJustNow !== 'undefined' ? newDateAsJustNow : false;
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        if (oldAsFullDate === true) {
            return PrintDateAsDateStringWithTime(date);
        } else {
            return interval + ' years ago';
        }
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        if (oldAsFullDate === true) {
            return printDateAsDateStringWithTime(date);
        } else {
            return interval + ' months ago';
        }
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days ago';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes ago';
    }

    if (newDateAsJustNow === true) {
        return 'Just now';
    } else {
        return Math.floor(seconds) + ' seconds ago';
    }
};

const getMonthNames = exports.getMonthNames = (short) => {
    // Parameter
    short = typeof short !== 'undefined' ? short : false;

    // Get month names
    if (short === true) {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
};

const getWeekDaysNames = exports.getWeekDaysNames = (short) => {
    // Parameter
    short = typeof short !== 'undefined' ? short : false;

    // Get week day names
    if (short === true) {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    } else {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
};

const printMonthName = exports.printMonthName = (date, short) => {
    // Prepare date
    short = typeof short !== 'undefined' ? short : false;
    const monthIndex = date.getUTCMonth();

    // Get month names
    const months = GetMonthNames(short);

    // Return month name
    return months[monthIndex];
};

const printWeekDayName = exports.printWeekDayName = (date, short) => {
    // Prepare date
    short = typeof short !== 'undefined' ? short : false;
    const weekDay = date.getUTCDay();

    // Get week days
    const weekDays = GetWeekDaysNames(short);

    // Return week day name
    return weekDays[weekDay];
};

const printDateAsYearOnlyNumber = exports.printDateAsYearOnlyNumber = (date) => {
    if (typeof date !== 'undefined') {
        return date.getUTCFullYear().toString();
    } else {
        return '';
    }
};

const printDateAsYearMonthDay = exports.printDateAsYearMonthDay = (date, isAmerican) => {
    isAmerican = typeof isAmerican !== 'undefined' ? isAmerican : true;
    if (typeof date !== 'undefined') {
        let r = '';
        if (isAmerican === true) {
            r += PrintDateAsHumanReadableMonthNumber(date);
            r += '/';
            r += padWithCharacter(date.getUTCDate().toString(), 2, '0', true);
            r += '/';
            r += PrintDateAsYearOnlyNumber(date);
        } else {
            r += padWithCharacter(date.getUTCDate().toString(), 2, '0', true);
            r += '.';
            r += PrintDateAsHumanReadableMonthNumber(date);
            r += '.';
            r += PrintDateAsYearOnlyNumber(date);
        }
        return r;
    } else {
        return '';
    }
};

const printDateAsHumanReadableMonthNumber = exports.printDateAsHumanReadableMonthNumber = (date) => {
    if (typeof date !== 'undefined') {
        let d = date.getUTCMonth() + 1;
        let r = d.toString();
        if (r.length < 2) {
            return '0' + r;
        } else {
            return r;
        }
    } else {
        return '';
    }
};

const printDateAsHumanReadableFullDateString = exports.printDateAsHumanReadableFullDateString = (date) => {
    if (typeof date !== 'undefined') {
        const monthNames = GetMonthNames(false);
        let r = monthNames[date.getUTCMonth()];
        r += ' ' + padWithCharacter(date.getUTCDate(), 2, '0', true);
        r += ', ' + date.getUTCFullYear();
        return r;
    } else {
        return '';
    }
};

const printDateTimeAsHoursMinutesString = exports.printDateTimeAsHoursMinutesString = (date) => {
    if (typeof date !== 'undefined') {
        let r = '';
        r += date.getUTCHours() + 'h';
        r += date.getUTCMinutes() + 'm';
        return r;
    } else {
        return '';
    }
};

const printHoursNumberAsHoursMinutesString = exports.printHoursNumberAsHoursMinutesString = (hours) => {
    if (typeof hours !== 'undefined') {
        const h = Math.floor(hours);
        const m = (hours - h) * 60;
        let r = '';
        r += h + 'h';
        r += m > 0 ? m + 'm' : '';
        return r;
    } else {
        return '';
    }
};

const checkIfTwoDatesAreTheSameDay = exports.checkIfTwoDatesAreTheSameDay = (date1, date2) => {
    // Check if dates are provided
    if (typeof date1 !== 'undefined' && date2 !== 'undefined') {
        if (date1.toDateString() === date2.toDateString()) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const checkIfTwoDatesAreTheSameMonthAndYear = exports.checkIfTwoDatesAreTheSameMonthAndYear = (date, date2) => {
    // Check if dates are provided
    if (typeof date1 !== 'undefined' && typeof date2 !== 'undefined') {
        const year1 = date1.getUTCFullYear();
        const year2 = date2.getUTCFullYear();
        if (year1 === year2) {
            const month1 = date1.getUTCMonth();
            const month2 = date2.getUTCMonth();
            if (month1 === month2) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const checkIfYearDashMonthStringIsTheSameAsDate = exports.checkIfYearDashMonthStringIsTheSameAsDate = (yearDashMonth, date) => {
    // Check if dates are provided
    if (typeof yearDashMonth !== 'undefined' && typeof date !== 'undefined') {
        const dateYearDashMonth = date.getUTCFullYear().toString() + '-' + date.getUTCMonth().toString();
        if (yearDashMonth === dateYearDashMonth) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const getAllMonthsBetweenTwoDates = exports.getAllMonthsBetweenTwoDates = (date1, date2, showYear, fromOldest) => {
    // Parameters
    showYear = typeof showYear !== 'undefined' ? showYear : true;
    fromOldest = typeof fromOldest !== 'undefined' ? fromOldest : true;

    // Get years and months
    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    let months = [];

    // Iterate
    let nextDate = new Date(date1);
    while (nextDate.getUTCFullYear() <= year2) {
        // Push date object
        months.push(ConstructMonthYearObject(nextDate, showYear));

        // Check if we have reached the year and month to stop
        if (nextDate.getUTCFullYear() === year2 && nextDate.getUTCMonth() === month2) {
            break;
        }

        // Iterate month
        nextDate.setMonth(nextDate.getUTCMonth() + 1);
    }

    // Check order
    if (fromOldest === false && months.length > 0) {
        months.reverse();
    }

    // Return array
    return months;
};

const convertYearDashMonthStringIntoDate = exports.convertYearDashMonthStringIntoDate = (yearDashMonth) => {
    if (typeof yearDashMonth !== 'undefined' && yearDashMonth.length === 7) {
        return new Date(yearDashMonth + '-01T00:00:00Z');
    } else {
        return null;
    }
};

const convertDateTimeToTimeNumber = exports.convertDateTimeToTimeNumber = (date) => {
    if (typeof date !== 'undefined') {
        const hours = date.getHours();
        const minutes = date.getMinutes() / 60;
        return hours + minutes;
    }
};

const convertTotalMinutesToTimeLabel = exports.convertTotalMinutesToTimeLabel = (totalMinutesValue, isAmerican) => {
    isAmerican = typeof isAmerican !== 'undefined' ? isAmerican : this.props.isAmerican;
    if (typeof totalMinutesValue !== 'undefined') {
        // Remove additional days
        let totalMinutes = totalMinutesValue;
        let removedDays = 0;
        while (totalMinutes >= 1440) {
            removedDays++;
            totalMinutes -= 1440;
        }

        // Turn minutes into hour
        const value = totalMinutes / 60;

        // Construct label
        let label = '';
        if (isAmerican === true) {
            // Get hour
            let hour = Math.floor(value);
            if (hour === 0) {
                hour = 12;
            } else if (hour > 12) {
                hour = hour - 12;
            }
            label += padWithCharacter(hour.toFixed(0), 2, '0', true);
            label += ':';

            // Get minutes
            let minute = 0;
            if (totalMinutes < 60) {
                minute = totalMinutes;
            } else if (totalMinutes > 720) {
                minute = ((totalMinutes / 60) - Math.floor(value)) * 60;
            } else {
                minute = (value - hour) * 60;
            }
            label += padWithCharacter(minute.toFixed(0), 2, '0', true);

            // Add AM/PM
            if (value >= 0 && value < 12) {
                label += 'AM';
            } else if (value >= 12) {
                label += 'PM';
            }
        } else {
            // Get hour
            const hour = Math.floor(value);
            label += padWithCharacter(hour.toFixed(0), 2, '0', true);
            label += ':';

            // Get minutes
            const minute = (value - hour) * 60;
            label += padWithCharacter(minute.toFixed(0), 2, '0', true);
        }

        return {
            label: label,
            value: value
        };
    } else {
        return {
            label: isAmerican === true ? '12:00AM' : '00:00',
            value: 0
        };
    }
};

const convertDateTimeToTimeLabel = exports.convertDateTimeToTimeLabel = (date, isAmerican) => {
    isAmerican = typeof isAmerican !== 'undefined' ? isAmerican : this.props.isAmerican;
    if (typeof date !== 'undefined') {
        const minutes = (date.getHours() * 60) + date.getMinutes();
        return ConvertTotalMinutesToTimeLabel(minutes, isAmerican);
    } else {
        return {
            label: isAmerican === true ? '12:00AM' : '00:00',
            value: 0
        };
    }
};

const constructMonthYearObject = exports.constructMonthYearObject = (date, showYear, short) => {
    showYear = typeof showYear !== 'undefined' ? showYear : true;
    short = typeof short !== 'undefined' ? short : false;
    const monthNames = GetMonthNames(short);
    if (typeof date !== 'undefined') {
        if (showYear === true) {
            return {
                date: date,
                value: PrintDateAsYearOnlyNumber(date) + '-' + PrintDateAsHumanReadableMonthNumber(date),
                label: monthNames[date.getUTCMonth()] + ' ' + PrintDateAsYearOnlyNumber(date)
            };
        } else {
            return {
                date: date,
                value: PrintDateAsYearOnlyNumber(date) + '-' + PrintDateAsHumanReadableMonthNumber(date),
                label: monthNames[date.getUTCMonth()]
            };
        }
    }
};
