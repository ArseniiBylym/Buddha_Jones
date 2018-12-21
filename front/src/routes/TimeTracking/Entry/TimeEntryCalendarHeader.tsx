import * as React from 'react';
import * as dateFormat from 'date-fns/format';
import * as dateAddDays from 'date-fns/add_days';
import * as dateSubDays from 'date-fns/sub_days';
import * as dateIsSameDay from 'date-fns/is_same_day';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'components/Section';
import { computed } from 'mobx';
import { Button } from 'components/Button';
import { IconArrowRightYellow, IconArrowLeftYellow } from 'components/Icons';
import { AppOnlyStoreState } from 'store/AllStores';
import { TimeEntryActions } from 'actions';

// Styles
const s = require('./TimeEntryCalendarHeader.css');

// Props
interface TimeEntryCalendarHeaderProps {
}

// Types
type TimeEntryCalendarHeaderPropsTypes = TimeEntryCalendarHeaderProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class TimeEntryCalendarHeader extends React.Component<TimeEntryCalendarHeaderPropsTypes, {}> {
    @computed
    private get dayNames(): {
        nameOfTheFirstDayInMonth: string;
        nameOfTheFullYearOfFirstDayInMonth: string;
        nameOfTheLastDayInMonth: string;
        nameOfTheFullYearOfLastDayInMonth: string;
        currentFirstDate: string;
        currentLastDate: string;
    } {
        let nameOfTheFirstDayInMonth = '';
        let nameOfTheFullYearOfFirstDayInMonth = '';
        let nameOfTheLastDayInMonth = '';
        let nameOfTheFullYearOfLastDayInMonth = '';
        let currentFirstDate = '';
        let currentLastDate = '';

        if (this.props.store && this.props.store.timeEntry.viewDays && this.props.store.timeEntry.viewDays.length > 0) {
            const { timeEntry } = this.props.store;

            const firstDate = timeEntry.viewDays[0].date;
            const lastDate = timeEntry.viewDays[timeEntry.viewDays.length - 1].date;

            currentFirstDate = new Date(firstDate).getDate() + '';
            currentLastDate = new Date(lastDate).getDate() + '';
            nameOfTheFirstDayInMonth = dateFormat(firstDate, 'MMMM');
            nameOfTheFullYearOfFirstDayInMonth = dateFormat(firstDate, 'YYYY');
            nameOfTheLastDayInMonth = dateFormat(lastDate, 'MMMM');
            nameOfTheFullYearOfLastDayInMonth = dateFormat(lastDate, 'YYYY');
        }

        return {
            currentFirstDate,
            currentLastDate,
            nameOfTheFirstDayInMonth,
            nameOfTheFullYearOfFirstDayInMonth,
            nameOfTheLastDayInMonth,
            nameOfTheFullYearOfLastDayInMonth,
        };
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        const { viewDays, viewSingleDayOnly } = this.props.store.timeEntry;

        if (viewDays === null || viewDays.length <= 0) {
            return null;
        }

        return (
            <Row removeGutter={true}>
                <Col className={s.month} size={6}>
                    <p>
                        {'Date: '}
                        <span>{this.dayNames.currentFirstDate}</span> <strong>{this.dayNames.nameOfTheFirstDayInMonth}</strong>
                        {(this.dayNames.nameOfTheFirstDayInMonth === this.dayNames.nameOfTheLastDayInMonth && (
                            <span key={0}> {this.dayNames.nameOfTheFullYearOfFirstDayInMonth}</span>
                        )) ||
                        (this.dayNames.nameOfTheFullYearOfFirstDayInMonth ===
                            this.dayNames.nameOfTheFullYearOfLastDayInMonth && (
                                <>
                                    <i> / </i>
                                    <span>{this.dayNames.currentLastDate}</span> <strong>{this.dayNames.nameOfTheLastDayInMonth}</strong>
                                    <span>{' ' + this.dayNames.nameOfTheFullYearOfLastDayInMonth}</span>
                                </>
                            )) || (
                            <>
                                <span>{this.dayNames.nameOfTheFullYearOfFirstDayInMonth}</span>
                                <i> / </i>
                                <span>{this.dayNames.currentLastDate}</span> <strong>{this.dayNames.nameOfTheLastDayInMonth}</strong>
                                <span>{' ' + this.dayNames.nameOfTheFullYearOfLastDayInMonth}</span>
                            </>
                        )}
                    </p>
                </Col>

                <Col className={s.arrows} size={6}>
                    {!viewSingleDayOnly && (
                        <Button
                            onClick={this.handlePeriodSwitch(true)}
                            float="right"
                            icon={{
                                background: 'none',
                                size: 'nopadding',
                                element: <IconArrowRightYellow width={15} height={11}/>,
                            }}
                            label={{
                                text: 'NEXT',
                                size: 'small',
                                color: 'yellow',
                                onLeft: true,
                            }}
                        />
                    )}

                    {!viewSingleDayOnly && (
                        <Button
                            onClick={this.handlePeriodSwitch(false)}
                            float="right"
                            icon={{
                                background: 'none',
                                size: 'nopadding',
                                element: <IconArrowLeftYellow width={15} height={11}/>,
                            }}
                            label={{
                                text: 'PREV',
                                size: 'small',
                                color: 'yellow',
                                onLeft: false,
                            }}
                        />
                    )}

                    {viewSingleDayOnly && (
                        <Button
                            onClick={this.handleDailyWeeklyViewSwitch(false)}
                            float="right"
                            icon={{
                                background: 'none',
                                size: 'nopadding',
                                element: <IconArrowLeftYellow width={15} height={11}/>,
                            }}
                            label={{
                                text: 'Back to week view',
                                color: 'yellow',
                                onLeft: false,
                            }}
                        />
                    )}
                </Col>
            </Row>
        );
    }

    private handleDailyWeeklyViewSwitch = (toDaily: boolean) => () => {
        if (!this.props.store || this.props.store.timeEntry.viewEntriesOfUser === null) {
            return;
        }

        if (toDaily && !this.props.store.timeEntry.viewSingleDayOnly) {
            let day = this.props.store.timeEntry.viewDays[0].date;

            const findCurrentlyBeingEdited = this.props.store.timeEntry.viewDays.find(viewDay => {
                return !!(this.props.store &&
                    this.props.store.timeEntry.values &&
                    dateIsSameDay(this.props.store.timeEntry.values.startDate, viewDay.date));
            });

            if (findCurrentlyBeingEdited) {
                day = findCurrentlyBeingEdited.date;
            } else {
                const findIfWeekIsToday = this.props.store.timeEntry.viewDays.find(() => {
                    return !!(this.props.store &&
                        this.props.store.timeEntry.values &&
                        dateIsSameDay(this.props.store.timeEntry.values.startDate, new Date()));
                });

                if (findIfWeekIsToday) {
                    day = findIfWeekIsToday.date;
                }
            }

            TimeEntryActions.setCurrentViewToDay(this.props.store.timeEntry.viewEntriesOfUser, day);
        } else if (this.props.store.timeEntry.viewSingleDayOnly) {
            TimeEntryActions.setCurrentViewToWeek(
                this.props.store.timeEntry.viewEntriesOfUser,
                this.props.store.timeEntry.viewDays[0].date
            );
        }
    };

    private handlePeriodSwitch = (toNext: boolean) => () => {
        if (!this.props.store || this.props.store.timeEntry.viewEntriesOfUser === null) {
            return;
        }

        const firstViewDate = this.props.store.timeEntry.viewDays[0].date;

        if (this.props.store.timeEntry.viewSingleDayOnly) {
            TimeEntryActions.setCurrentViewToDay(
                this.props.store.timeEntry.viewEntriesOfUser,
                toNext ? dateAddDays(firstViewDate, 1) : dateSubDays(firstViewDate, 1)
            );
        } else {
            TimeEntryActions.setCurrentViewToWeek(
                this.props.store.timeEntry.viewEntriesOfUser,
                toNext ? dateAddDays(firstViewDate, 7) : dateSubDays(firstViewDate, 7)
            );
        }

        TimeEntryActions.resetTimeEntry();
    };
}
