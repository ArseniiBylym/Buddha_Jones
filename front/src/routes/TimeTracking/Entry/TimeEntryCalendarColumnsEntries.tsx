import * as React from 'react';
import * as classNames from 'classnames';
import * as dateFormat from 'date-fns/format';
import { observer, inject } from 'mobx-react';
import { TimeEntryCalendarDay, TimeEntryStatus, TimeEntryCalendarEntry, TimeEntryUserWithType } from 'types/timeEntry';
import { DateHandler } from 'helpers/DateHandler';
import { AppOnlyStoreState } from 'store/AllStores';
import { TimeEntryActions } from 'actions';
import { Tooltip } from 'components/Content';

// Styles
const s = require('./TimeEntryCalendarColumns.css');

// Props
interface TimeEntryCalendarColumnsEntriesProps {
    day: TimeEntryCalendarDay;
    dayIndex: number;
}

// Types
type TimeEntryCalendarColumnsEntriesPropsTypes = TimeEntryCalendarColumnsEntriesProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class TimeEntryCalendarColumnsEntries extends React.Component<TimeEntryCalendarColumnsEntriesPropsTypes, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }

        const { day, dayIndex } = this.props;
        const { timeEntry } = this.props.store;

        if (day.timeEntries.length > 0) {
            // Counters
            let hoursCount = 0;

            // Render entries list
            return (
                <dl
                    className={classNames({
                        [s.hoverable]: day.isDayClosed === false,
                    })}
                >
                    {day.timeEntries.map((entry, entryIndex) => {
                        // Add hours
                        hoursCount += entry.hours;

                        // Project selection title
                        const projectSelection: string[] = [];
                        if (entry.projectName) {
                            projectSelection.push(entry.projectName);
                        }
                        if (entry.projectCampaignName) {
                            projectSelection.push(entry.projectCampaignName);
                        }
                        if (entry.spotName) {
                            projectSelection.push(entry.spotName);
                        }
                        if (entry.versionName) {
                            projectSelection.push(entry.versionName);
                        }
                        const projectSelectionTitle = projectSelection.length > 0 ? projectSelection.join(' - ') : null;

                        // Render
                        return (
                            <Tooltip
                                key={entry.id}
                                isSmall={true}
                                text={
                                    projectSelectionTitle
                                        ? entry.activityName +
                                        (projectSelectionTitle ? ' - ' + projectSelectionTitle : '')
                                        : ''
                                }
                            >
                                <dt
                                    onClick={
                                        day.isDayClosed === false ? this.handleExistingEntryEditClick(entry) : undefined
                                    }
                                    className={classNames({
                                        [s.closed]: day.isDayClosed,
                                        [s.editable]: day.isDayClosed === false,
                                        [s.editing]: timeEntry.values && timeEntry.values.editingEntryId === entry.id,
                                        [s.pendingApproval]: entry.status === TimeEntryStatus.UnderReview,
                                    })}
                                >
                                    <div>
                                        <i/>
                                        {projectSelectionTitle && (
                                            <p>
                                                <strong>{projectSelectionTitle}</strong>
                                            </p>
                                        )}
                                    </div>
                                    <p className={s.activityName}>
                                        <strong>{entry.activityName}</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            {dateFormat(entry.startDate, 'h:mm a') +
                                            ' - ' +
                                            DateHandler.convertHoursNumberToHM(entry.hours)}
                                        </strong>
                                    </p>
                                </dt>
                            </Tooltip>
                        );
                    })}

                    {day.isDayClosed === false && (
                        <dt
                            className={s.creatable}
                            onClick={this.handleChangingTimeEntryDateFromCalendarView(day.date, dayIndex)}
                        >
                            <i/>
                            <p>Create new entry</p>
                        </dt>
                    )}

                    <dt className={s.totalHours}>
                        <p>
                            <strong>{`${DateHandler.convertHoursNumberToHM(hoursCount)} total`}</strong>
                        </p>
                    </dt>
                </dl>
            );
        } else {
            return (
                <dl
                    onClick={
                        day.isDayClosed === false
                            ? this.handleChangingTimeEntryDateFromCalendarView(day.date, dayIndex)
                            : undefined
                    }
                    className={classNames({
                        [s.fullSizeEntriesList]: day.isDayClosed === false,
                        [s.hoverable]: day.isDayClosed === false,
                    })}
                >
                    <dt
                        className={classNames({
                            [s.creatable]: day.isDayClosed === false,
                        })}
                    >
                        <i/>
                        {day.isDayClosed === false && <p>Create new entry</p>}
                    </dt>
                </dl>
            );
        }
    }

    private handleExistingEntryEditClick = (entry: TimeEntryCalendarEntry) => (e: React.MouseEvent<HTMLElement>) => {
        TimeEntryActions.editExistingEntry(entry);
    };

    private handleChangingTimeEntryDateFromCalendarView = (date: Date, dayIndex: number) => (
        e: React.MouseEvent<HTMLElement>
    ) => {
        if (!this.props.store || !this.props.store.user.data) {
            return;
        }

        const forUser: TimeEntryUserWithType = {
            id: this.props.store.user.data.id,
            typeId: this.props.store.user.data.typeId,
            typeName: this.props.store.user.data.typeName,
        };

        if (
            this.props.store.timeEntry.values &&
            this.props.store.timeEntry.values.isModified &&
            this.props.store.timeEntry.values.editingEntryId
        ) {
            this.props.store.timeEntry.editsWillGetLostModal.show = true;
            this.props.store.timeEntry.editsWillGetLostModal.forUser = forUser;
            this.props.store.timeEntry.editsWillGetLostModal.dayIndex = dayIndex;
            return;
        }

        TimeEntryActions.setEntryStartDate(forUser, date, true);
    };
}
