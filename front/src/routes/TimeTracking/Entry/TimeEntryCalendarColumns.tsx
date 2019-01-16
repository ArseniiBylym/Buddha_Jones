import * as React from 'react';
import * as classNames from 'classnames';
import * as dateFormat from 'date-fns/format';
import * as dateGetDayOfWeek from 'date-fns/get_day';
// import * as dateGetDayOfTheMonth from 'date-fns/get_date';
import * as dateAreTwoDatesTheSameDay from 'date-fns/is_same_day';
import * as dateIsAfter from 'date-fns/is_after';
// import padStart from 'lodash-es/padStart';
import { observer, inject } from 'mobx-react';
import { TimeEntryCalendarColumnsEntries } from '.';
import { AppOnlyStoreState } from 'store/AllStores';
import { LoadingSpinner } from 'components/Loaders';
import { TimeEntryActions } from 'actions';
import { TimeEntryCalendarReview } from './TimeEntryCalendarReview';
import { DateHandler } from 'helpers/DateHandler';

// Styles
const s = require('./TimeEntryCalendarColumns.css');

// Props
interface TimeEntryCalendarColumnsProps {
    innerRef?: (ref: HTMLTableElement) => void;
}

// Types
type TimeEntryCalendarColumnsPropsTypes = TimeEntryCalendarColumnsProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class TimeEntryCalendarColumns extends React.Component<TimeEntryCalendarColumnsPropsTypes, {}> {
    public render() {
        if (!this.props.store || !this.props.store.user.data) {
            return null;
        }

        const { timeEntry } = this.props.store;

        if (timeEntry.viewDays === null || timeEntry.viewDays.length <= 0) {
            return null;
        }

        return (
            <table ref={this.referenceContainerTable} className={s.days}>
                <thead>
                <tr>
                    <td>
                        <hr/>
                    </td>
                    {timeEntry.viewDays.map((day) => {
                        // Get day of the week
                        const dateDayOfWeek = dateGetDayOfWeek(day.date);

                        if (!this.props.store) {
                            return null;
                        }

                        // Render
                        return (
                            <td
                                key={'dayOfWeek-' + dateFormat(day.date, 'YYYY-MM-DD')}
                                className={classNames({
                                    [s.today]: dateAreTwoDatesTheSameDay(day.date, this.props.store.time.now),
                                    [s.weekend]: dateDayOfWeek <= 0 || dateDayOfWeek >= 6,
                                    [s.creatable]: day.isDayClosed === false,
                                })}
                            >
                                {/* <p>{dateFormat(day.date, 'D')}</p> */}
                                <p><span className={s.dayDate}>{dateFormat(day.date, 'D')}</span> {dateFormat(day.date, 'dddd')}</p>
                                {/* <span>{padStart(dateGetDayOfTheMonth(day.date).toString(), 2, '0')}</span> */}
                                <hr/>

                                {day.isDayLoading && (
                                    <LoadingSpinner className={s.dayLoading} color="#FFFFFF" size={16}/>
                                )}
                            </td>
                        );
                    })}
                    <td>
                        <hr/>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td/>
                    {timeEntry.viewDays.map((day, dayIndex) => {
                        if (!this.props.store || !this.props.store.user.data) {
                            return null;
                        }

                        // Check if day is selected
                        const isDaySelected =
                            timeEntry.selectedDay !== null
                                ? dateAreTwoDatesTheSameDay(timeEntry.selectedDay.date, day.date)
                                : false;

                        // Render
                        return (
                            <td
                                key={'dayCalendar' + dateFormat(day.date, 'YYYY-MM-DD')}
                                className={classNames({
                                    [s.entering]: isDaySelected,
                                })}
                            >
                                {(timeEntry.viewSingleDayOnly && (
                                    <TimeEntryCalendarReview
                                        forUser={{
                                            id: this.props.store.user.data.id,
                                            typeId: this.props.store.user.data.typeId,
                                            typeName: this.props.store.user.data.typeName,
                                        }}
                                        now={this.props.store.time.now}
                                        entries={day.timeEntries.map(entry => ({
                                            entryId: entry.id,
                                            userId: entry.userId,
                                            userTypeId: entry.userTypeId,
                                            userTypeName: entry.userTypeName,
                                            activityId: entry.activityId,
                                            activityName: entry.activityName,
                                            activityTypeId: 0, // TODO
                                            selectedProject: {
                                                project: entry.projectId
                                                    ? {
                                                        id: entry.projectId,
                                                        name: entry.projectName || entry.projectId.toString(),
                                                    }
                                                    : null,
                                                projectCampaign: entry.projectCampaignId
                                                    ? {
                                                        id: entry.projectCampaignId,
                                                        name:
                                                            entry.projectCampaignName ||
                                                            entry.projectCampaignId.toString(),
                                                    }
                                                    : null,
                                                spot: entry.spotId
                                                    ? {
                                                        id: entry.spotId,
                                                        name: entry.spotName || entry.spotId.toString(),
                                                    }
                                                    : null,
                                                version: entry.versionId
                                                    ? {
                                                        id: entry.versionId,
                                                        name: entry.versionName || entry.versionId.toString(),
                                                    }
                                                    : null,
                                                customerId: entry.clientId,
                                            },
                                            notes: entry.notes,
                                            files: entry.files,
                                            startDate: entry.startDate,
                                            durationInMinutes: DateHandler.convertHoursNumberToTotalMinutes(
                                                entry.hours
                                            ),
                                        }))}
                                    />
                                )) || <TimeEntryCalendarColumnsEntries day={day} dayIndex={dayIndex}/>}
                            </td>
                        );
                    })}
                    <td/>
                </tr>
                </tbody>

                {timeEntry.viewSingleDayOnly === false && (
                    <tfoot>
                    <tr>
                        <td/>
                        {timeEntry.viewDays.map((day, dayIndex) => {
                            if (!this.props.store) {
                                return null;
                            }

                            // Check if day is in the future
                            const isDayInTheFuture = dateIsAfter(day.date, this.props.store.time.now);

                            // Render
                            return (
                                <td key={'daySummary' + dateFormat(day.date, 'YYYY-MM-DD')}>
                                    <p>
                                            <span
                                                className={classNames({
                                                    [s.dayApproved]:
                                                    day.timeEntries.length > 0 &&
                                                    day.isDayClosed &&
                                                    day.isDayApproved,
                                                    [s.dayPending]:
                                                    day.timeEntries.length > 0 &&
                                                    day.isDayClosed &&
                                                    day.isDayApproved === false,
                                                    [s.dayOpen]:
                                                    day.timeEntries.length > 0 && day.isDayClosed === false,
                                                    [s.dayNoTimeTracked]: day.timeEntries.length <= 0,
                                                })}
                                                onClick={
                                                    day.timeEntries.length > 0 && day.isDayClosed === false
                                                        ? this.handleConfirmationModalForEntriesSubmitForReview(
                                                        day.date,
                                                        dayIndex
                                                        )
                                                        : undefined
                                                }
                                            >
                                                {/* {day.timeEntries.length > 0
                                                    ? day.isDayClosed
                                                        ? day.isDayApproved
                                                            ? 'Day approved'
                                                            : 'Day pending approval'
                                                        : day.isDayLoading
                                                            ? 'Submitting'
                                                            : 'Submit'
                                                    : isDayInTheFuture
                                                        ? 'Future date'
                                                        : 'No time tracked'} */}
                                                {day.timeEntries.length > 0
                                                    ? this.getTimeTrackingLabel(day.timeEntries[0])
                                                        // ? this.getTimeTrackingLabel(day.timeEntries[0])
                                                        // : this.getTimeTrackingLabel(day.timeEntries[0])
                                                    : isDayInTheFuture
                                                        ? 'Future date'
                                                        : 'No time tracked'}
                                            </span>
                                    </p>
                                </td>
                            );
                        })}
                        <td/>
                    </tr>
                    </tfoot>
                )}
            </table>
        );
    }

    private getTimeTrackingLabel = (timeEntries) => {
        const status = timeEntries.status;
        switch (status) {
            case 2: 
                return 'Under review';
            case 3:
                return 'Approved';
            default: 
                return 'Draft';
        }
    }

    private referenceContainerTable = (ref: HTMLTableElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private handleConfirmationModalForEntriesSubmitForReview = (_date: Date, dayIndex: number) => () => {
        if (!this.props.store || !this.props.store.user.data) {
            return;
        }

        TimeEntryActions.viewDaySummary(
            {
                id: this.props.store.user.data.id,
                typeId: this.props.store.user.data.typeId,
                typeName: this.props.store.user.data.typeName,
            },
            this.props.store.user.data.minHour || 0,
            dayIndex
        );
    };
}
