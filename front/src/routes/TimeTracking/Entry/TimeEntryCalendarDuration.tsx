import * as React from 'react';
import * as classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'components/Section';
import { DatePicker, TimePicker, DurationPicker } from 'components/Calendar';
import { AppOnlyStoreState } from 'store/AllStores';
import { TimeEntryActions } from 'actions';
import { DateHandler } from 'helpers/DateHandler';
import { TimeEntryUserWithType } from 'types/timeEntry';

// Styles
const s = require('./TimeEntryCalendarDuration.css');

// Props
interface TimeEntryCalendarDurationProps {
}

// Types
type TimeEntryCalendarDurationPropsTypes = TimeEntryCalendarDurationProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class TimeEntryCalendarDuration extends React.Component<TimeEntryCalendarDurationPropsTypes, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }

        const { timeEntry, time } = this.props.store;

        return (
            <AnimateHeight className={s.durationWrapper} height={timeEntry.values !== null ? 'auto' : 0}>
                <Row className={s.timeRow} removeGutter={true}>
                    <Col size={0}>
                        <DatePicker
                            className={s.dateTimePicker}
                            onChange={this.handleDateChange}
                            value={timeEntry.values ? timeEntry.values.startDate : time.now}
                            label="Date"
                        />
                    </Col>

                    <Col size={0}>
                        <TimePicker
                            onChange={this.handleStartTimeChange}
                            className={s.dateTimePicker}
                            label="Start time"
                            increments={timeEntry.durationIncrements}
                            totalMinutesValue={timeEntry.startTimeInMinutes}
                            isOneLine={true}
                            isWhite={false}
                        />
                    </Col>

                    <Col size={0}>
                        <DurationPicker
                            className={s.durationPicker}
                            onChange={this.handleDurationChange}
                            totalMinutesValue={timeEntry.durationInMinutes}
                            increments={timeEntry.durationIncrements}
                            label="Duration"
                        />
                    </Col>

                    <Col size={0}>
                        <TimePicker
                            onChange={this.handleEndTimeChange}
                            className={s.dateTimePicker}
                            label="End time"
                            increments={timeEntry.durationIncrements}
                            totalMinutesValue={timeEntry.endTimeInMinutes}
                            isOneLine={true}
                            isWhite={false}
                        />
                    </Col>
                </Row>

                <Row removeGutter={true} className={s.timelineRow}>
                    <Col>
                        <Row removeGutter={true}>
                            {timeEntry.viewTimeline.map((entry, index) => {
                                return (
                                    <Col key={index} size={1}>
                                        <hr/>
                                    </Col>
                                );
                            })}

                            {timeEntry.selectedDay &&
                            timeEntry.selectedDay.timeEntries.map(entry => {
                                const startMinutesTotal = DateHandler.getTotalMinutesFromDateTime(entry.startDate);
                                return (
                                    <div
                                        key={'timeline-entry-' + entry.id}
                                        className={s.timelineBox}
                                        style={this.calculateTimelineEntryStyle(
                                            startMinutesTotal,
                                            startMinutesTotal + entry.hours * 60,
                                            false
                                        )}
                                    />
                                );
                            })}

                            {timeEntry.values !== null && (
                                <div
                                    key="timeline-entry-current"
                                    className={classNames(s.timelineBox, s.timelineBoxEditable, {
                                        [s.timelineBoxOverlapping]: false, // TODO
                                    })}
                                    style={this.calculateTimelineEntryStyle(
                                        timeEntry.startTimeInMinutes,
                                        timeEntry.endTimeInMinutes,
                                        true
                                    )}
                                />
                            )}
                        </Row>
                    </Col>
                </Row>

                <Row className={s.hoursRow} removeGutter={true}>
                    {timeEntry.viewTimeline.map((entry, index) => {
                        return (
                            <Col key={index}>
                                <p>
                                    {entry.hour}
                                    <span>{entry.minutes}</span>
                                </p>
                            </Col>
                        );
                    })}
                </Row>
            </AnimateHeight>
        );
    }

    private handleDateChange = (date: Date | null) => {
        if (!this.props.store || !this.props.store.user.data) {
            return;
        }

        if (date !== null) {
            const forUser: TimeEntryUserWithType = {
                id: this.props.store.user.data.id,
                typeId: this.props.store.user.data.typeId,
                typeName: this.props.store.user.data.typeName,
            };

            TimeEntryActions.setEntryStartDate(forUser, date);

            if (this.props.store.timeEntry.viewSingleDayOnly) {
                TimeEntryActions.setCurrentViewToDay(forUser, date);
            } else {
                TimeEntryActions.setCurrentViewToWeek(forUser, date);
            }
        }
    };

    private handleStartTimeChange = (totalMinutes: number, formatted: { value: number; label: string }) => {
        TimeEntryActions.setEntryStartTime(totalMinutes);
    };

    private handleDurationChange = (totalMinutes: number) => {
        TimeEntryActions.setEntryDuration(totalMinutes);
    };

    private handleEndTimeChange = (totalMinutes: number, formatted: { value: number; label: string }) => {
        TimeEntryActions.setEntryEndTime(totalMinutes);
    };

    private calculateTimelineEntryStyle = (startTimeInMinutes: number, endTimeInMinutes: number, isActive: boolean) => {
        // Calculate timeline box dimensions
        const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
        const startRatio = startTimeInMinutes / 1440;
        const durationRatio = durationInMinutes / 1440;
        const boxLeft = 100 * startRatio;
        const boxWidth = 100 * durationRatio;

        // Timeline box size
        let boxStyle = {
            left: boxLeft + '%',
            width: boxWidth + '%',
            opacity: 0.8,
        };

        // Add borders if it's active
        if (isActive) {
            boxStyle = Object.assign({}, boxStyle, {
                borderLeftWidth: boxWidth === 0 ? '0px' : null,
                borderRightWidth: boxWidth === 0 ? '0px' : null,
                opacity: 1,
            });
        }

        // Return timeline's style
        return boxStyle;
    };
}
