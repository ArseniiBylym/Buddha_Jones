import * as React from 'react';
import * as classNames from 'classnames';
import * as dateGetDayOfTheWeek from 'date-fns/get_day';
import * as dateGetMonthOfTheYear from 'date-fns/get_month';
import * as dateSetDayOfTheWeek from 'date-fns/set_day';
import * as dateSetDayOfTheMonth from 'date-fns/set_date';
import * as dateSetMonthOfTheYear from 'date-fns/set_month';
import * as dateAddDays from 'date-fns/add_days';
import * as dateAddWeeks from 'date-fns/add_weeks';
import * as dateAddMonths from 'date-fns/add_months';
import * as dateAddYears from 'date-fns/add_years';
import * as dateSubMonths from 'date-fns/sub_months';
import * as dateSubYears from 'date-fns/sub_years';
import * as dateIsDate from 'date-fns/is_date';
import * as dateIsSameDay from 'date-fns/is_same_day';
import * as dateIsSameMonth from 'date-fns/is_same_month';
import * as dateIsValidDate from 'date-fns/is_valid';
import * as dateFormat from 'date-fns/format';
import * as dateParse from 'date-fns/parse';
import * as dateIsAfter from 'date-fns/is_after';
import * as dateIsBefore from 'date-fns/is_before';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from '../Section';
import { Paragraph } from '../Content';
import { Button } from '../Button';
import { IconArrowLeft, IconArrowRight } from '../Icons';

// Styles
const s = require('./DayPickerCalendar.css');

// Types
interface GridRow {
    key: string;
    days: GridDay[];
    months: GridMonth[];
}

interface GridDay {
    id: string;
    date: Date;
    dateString: string;
    isSelected: boolean;
    isCurrentMonth: boolean;
    isToday: boolean;
    isDisabled: boolean;
    isDisabledBecause: 'older-than-max-date' | 'younger-than-min-date' | null;
}

interface GridMonth {
    id: string;
    month: number;
    monthString: string;
    isSelected: boolean;
}

type DayPickerCalendarDefaultValueProp = 'today' | 'tomorrow' | 'inaweek' | 'inamonth' | 'inayear' | Date | null;

// Props
interface DayPickerCalendarProps {
    onChange?: (value: Date | null) => void;
    className?: string | null;
    value: Date | null;
    defaultValue?: DayPickerCalendarDefaultValueProp;
    maxDate?: Date;
    minDate?: Date;
}

// Component
@observer
export class DayPickerCalendar extends React.Component<DayPickerCalendarProps, {}> {
    static get defaultProps(): DayPickerCalendarProps {
        return {
            onChange: undefined,
            className: null,
            value: null,
            defaultValue: null,
            maxDate: undefined,
            minDate: undefined,
        };
    }

    private weekDayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    private now: Date = new Date();

    @observable private showDays: boolean = true;
    @observable
    private displayedDate: Date =
        typeof this.props.value !== 'undefined' && this.props.value !== null && dateIsDate(this.props.value)
            ? this.props.value
            : this.now;

    @computed
    private get grid(): {
        className: string;
        rows: GridRow[];
    } {
        // Prepare grid structure
        const rows: GridRow[] = [];
        let daysCols: GridDay[] = [];
        let monthsCols: GridMonth[] = [];

        // For days grid start from the Sunday from week before the first day of the month
        //    .e.g. February 01 is Monday; startDate will be January 31 (Sunday before)
        // For months grid start from January
        const startDate: Date = this.showDays
            ? dateSetDayOfTheWeek(dateSetDayOfTheMonth(this.displayedDate, 1), 0, { weekStartsOn: 0 })
            : dateSetMonthOfTheYear(this.displayedDate, 0);

        // Clone start date
        let iteratedDate: Date | null = startDate;

        // Iterate till grid of 6 rows is filled
        while (rows.length < 6) {
            // Create first day or month object
            if (this.showDays) {
                daysCols.push(this.createDateObject(iteratedDate));
            } else {
                monthsCols.push(this.createMonthObject(iteratedDate));
            }

            // Iterate all row columns
            if (this.showDays) {
                // For days
                if (dateGetDayOfTheWeek(iteratedDate) >= 6) {
                    rows.push({
                        key: dateFormat(iteratedDate, 'YYYY-Wo'),
                        days: daysCols,
                        months: [],
                    });
                    daysCols = [];
                }

                // Move to next day
                iteratedDate = dateAddDays(iteratedDate, 1);
            } else {
                // For months
                if (monthsCols.length >= 2) {
                    rows.push({
                        key: dateFormat(iteratedDate, 'YYYY') + '-' + rows.length,
                        days: [],
                        months: monthsCols,
                    });
                    monthsCols = [];
                }

                // Move to next month
                iteratedDate = dateAddMonths(iteratedDate, 1);
            }
        }
        iteratedDate = null;

        return {
            className: this.showDays ? s.days : s.months,
            rows,
        };
    }

    @computed
    private get minDateFormatted(): string {
        return this.props.minDate ? dateFormat(this.props.minDate, 'MM/DD/YYYY') : '';
    }

    @computed
    private get maxDateFormatted(): string {
        return this.props.maxDate ? dateFormat(this.props.maxDate, 'MM/DD/YYYY') : '';
    }

    public shouldComponentUpdate(nextProps: DayPickerCalendarProps) {
        if (
            this.props.value !== nextProps.value ||
            this.props.className !== nextProps.className ||
            this.props.minDate !== nextProps.minDate ||
            this.props.maxDate !== nextProps.maxDate
        ) {
            return true;
        } else {
            return false;
        }
    }

    public componentDidMount() {
        // Set initial date value if main value is missing
        if (typeof this.props.value === 'undefined' && typeof this.props.defaultValue !== 'undefined') {
            this.prepareInitialDate(this.props.value, this.props.defaultValue);
        }
    }

    public render() {
        return (
            <div className={classNames(s.calendar, this.props.className)}>
                <Row className={s.navigation} removeGutter={true} removeMargins={true}>
                    <Col>
                        <Button
                            onClick={this.handlePeriodArrowClick('left')}
                            float="left"
                            icon={{
                                size: 'small',
                                background: 'none',
                                element: <IconArrowLeft width={15} height={11} />,
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            className={s.daysMonthsToggle}
                            onClick={this.handleDaysMonthsToggle}
                            label={{
                                color: 'blue',
                                text: this.displayedDate
                                    ? this.showDays
                                        ? dateFormat(this.displayedDate, 'MMMM YYYY')
                                        : dateFormat(this.displayedDate, 'YYYY')
                                    : '',
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            onClick={this.handlePeriodArrowClick('right')}
                            float="right"
                            icon={{
                                size: 'small',
                                background: 'none',
                                element: <IconArrowRight width={15} height={11} />,
                            }}
                        />
                    </Col>
                </Row>

                <Row className={s.weekDays} removeGutter={true} removeMargins={true}>
                    {(this.showDays &&
                        this.weekDayNames.map((dayName, dayId) => (
                            <Col key={dayId}>
                                <Paragraph>{dayName}</Paragraph>
                            </Col>
                        ))) || (
                        <Col key="monthsLine">
                            <Paragraph>Jump to any month</Paragraph>
                        </Col>
                    )}
                </Row>

                <div className={this.grid.className}>
                    {this.grid.rows.map(row => (
                        <Row key={row.key} removeGutter={true} removeMargins={true}>
                            {row.days.map(day => (
                                <Col key={day.id}>
                                    <button
                                        onClick={day.isDisabled ? undefined : this.handleDateChange(day.id)}
                                        title={
                                            day.isDisabled
                                                ? day.isDisabledBecause === 'older-than-max-date'
                                                    ? 'Days after ' + this.maxDateFormatted + ' are disabled'
                                                    : day.isDisabledBecause === 'younger-than-min-date'
                                                        ? 'Days before ' + this.minDateFormatted + ' are disabled'
                                                        : undefined
                                                : undefined
                                        }
                                        className={classNames({
                                            [s.daySelected]: day.isSelected,
                                            [s.dayNotCurrentMonth]: day.isCurrentMonth === false,
                                            [s.dayToday]: day.isToday,
                                            [s.dayDisabled]: day.isDisabled,
                                        })}
                                    >
                                        {day.dateString}
                                    </button>
                                </Col>
                            ))}
                            {row.months.map(month => (
                                <Col key={month.id}>
                                    <button
                                        onClick={this.handleDisplayedMonthChange(month.id)}
                                        className={classNames({
                                            [s.monthSelected]: month.isSelected,
                                        })}
                                    >
                                        {month.monthString}
                                    </button>
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
            </div>
        );
    }

    private prepareInitialDate = (value: Date | null, defaultValue: DayPickerCalendarDefaultValueProp) => {
        if (value !== null || defaultValue === null) {
            return;
        }

        if (typeof this.props.onChange === 'undefined' || this.props.onChange === null) {
            return;
        }

        if (typeof defaultValue === 'string') {
            const today: Date = new Date();
            if (defaultValue === 'tomorrow') {
                this.onChangeCallback(dateAddDays(today, 1));
            } else if (defaultValue === 'inaweek') {
                this.onChangeCallback(dateAddWeeks(today, 1));
            } else if (defaultValue === 'inamonth') {
                this.onChangeCallback(dateAddMonths(today, 1));
            } else if (defaultValue === 'inayear') {
                this.onChangeCallback(dateAddYears(today, 1));
            } else {
                this.onChangeCallback(today);
            }
            return;
        }

        if (dateIsDate(defaultValue)) {
            this.onChangeCallback(defaultValue);
        }
    };

    private onChangeCallback = (date: Date | null) => {
        if (this.props.onChange) {
            this.props.onChange(date);
        }
    };

    private handlePeriodArrowClick = (direction: 'left' | 'right') => (e: React.MouseEvent<HTMLButtonElement>) => {
        // Calculate next date
        let nextDisplayedDate = dateSetDayOfTheMonth(this.displayedDate, 15);
        if (this.showDays) {
            nextDisplayedDate =
                direction === 'right' ? dateAddMonths(nextDisplayedDate, 1) : dateSubMonths(nextDisplayedDate, 1);
        } else {
            nextDisplayedDate =
                direction === 'right' ? dateAddYears(nextDisplayedDate, 1) : dateSubYears(nextDisplayedDate, 1);
        }

        // Change next displayed date
        this.displayedDate = nextDisplayedDate;
    };

    private handleDaysMonthsToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.showDays = !this.showDays;
    };

    private handleDateChange = (dateString: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        const date = dateParse(dateString);
        if (dateIsValidDate(date)) {
            this.showDays = true;
            this.displayedDate = date;
            this.onChangeCallback(date);
        }
    };

    @action
    private handleDisplayedMonthChange = (dateString: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        const date = dateParse(dateString + '-15');
        if (dateIsValidDate(date)) {
            this.showDays = true;
            this.displayedDate = date;
        }
    };

    private createDateObject = (date: Date): GridDay => {
        const isOlderThanMaxDate: boolean = this.props.maxDate && dateIsAfter(date, this.props.maxDate) ? true : false;
        const isYoungerThanMinDate: boolean =
            this.props.minDate && dateIsBefore(date, this.props.minDate) ? true : false;

        return {
            id: dateFormat(date, 'YYYY-MM-DD'),
            date,
            dateString: dateFormat(date, 'DD'),
            isSelected: this.props.value !== null ? dateIsSameDay(date, this.props.value) : false,
            isCurrentMonth: dateIsSameMonth(date, this.displayedDate),
            isToday: dateIsSameDay(date, this.now),
            isDisabled: isOlderThanMaxDate || isYoungerThanMinDate,
            isDisabledBecause: isOlderThanMaxDate
                ? 'older-than-max-date'
                : isYoungerThanMinDate
                    ? 'younger-than-min-date'
                    : null,
        };
    };

    private createMonthObject = (date: Date): GridMonth => {
        return {
            id: dateFormat(date, 'YYYY-MM'),
            month: dateGetMonthOfTheYear(date),
            monthString: dateFormat(date, 'MMMM'),
            isSelected: this.props.value !== null ? dateIsSameMonth(date, this.props.value) : false,
        };
    };
}
