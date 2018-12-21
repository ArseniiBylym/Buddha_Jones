import * as React from 'react';
import * as classNames from 'classnames';
import * as dateFormat from 'date-fns/format';
import * as dateAddMinutes from 'date-fns/add_minutes';
// import capitalize from 'lodash-es/capitalize';
import { observer } from 'mobx-react';
import { DateHandler } from 'helpers/DateHandler';
import { TimeApprovalEntry } from 'types/timeApproval';
import { ProjectPickerGroupValues } from 'components/Buddha';
import { computed } from 'mobx';
import {
    TIME_ENTRY_OVERTIME_AFTER_X_HOURS,
    TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS,
    TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID,
    TimeEntryStatus,
    TimeEntryUserWithType,
} from 'types/timeEntry';
import { Tag } from 'components/Content';
import { Button } from 'components/Button';
import { TimeEntryActions } from 'actions';

// Types
interface EntryTimeOverviewGroup {
    fromDate: Date;
    tilDate: Date;
    durationInMinutes: number;
    type: 'regular' | 'overtime' | 'doubletime';
}

// Styles
const s = require('./TimeApprovalDayEntry.css');

// Props
interface TimeApprovalDayEntryProps {
    entry: TimeApprovalEntry;
    now: Date;
    forUser: TimeEntryUserWithType;
    isEditable: boolean;
    totalDayMinutesAfterEntry: number;
}

// Component
@observer
export class TimeApprovalDayEntry extends React.Component<TimeApprovalDayEntryProps, {}> {
    private TIME_FORMAT = 'h:mm a';
    private OVERTIME_AFTER_X_MINUTES = TIME_ENTRY_OVERTIME_AFTER_X_HOURS * 60;
    private DOUBLETIME_AFTER_X_MINUTES = TIME_ENTRY_DOUBLETIME_AFTER_X_HOURS * 60;
    private PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES =
        this.DOUBLETIME_AFTER_X_MINUTES - this.OVERTIME_AFTER_X_MINUTES;

    @computed
    private get totalDayMinutesBeforeEntry(): number {
        return this.props.totalDayMinutesAfterEntry - this.props.entry.durationInMinutes;
    }

    @computed
    private get endDate(): Date {
        return dateAddMinutes(this.props.entry.startDate, this.props.entry.durationInMinutes);
    }

    @computed
    private get entryTimeOverview(): EntryTimeOverviewGroup[] {
        const overviewGroups: EntryTimeOverviewGroup[] = [];
        const overview: EntryTimeOverviewGroup = {
            fromDate: this.props.entry.startDate,
            tilDate: this.endDate,
            durationInMinutes: this.props.entry.durationInMinutes,
            type: 'regular',
        };

        // If entry is lunch break
        if (this.props.entry.activityTypeId === TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID) {
            overviewGroups.push(overview);
            return overviewGroups;
        }

        // If whole entry is double time
        if (this.totalDayMinutesBeforeEntry >= this.DOUBLETIME_AFTER_X_MINUTES) {
            overview.type = 'doubletime';
            overviewGroups.push(overview);
            return overviewGroups;
        }

        // If whole entry is over time
        if (
            this.totalDayMinutesBeforeEntry >= this.OVERTIME_AFTER_X_MINUTES &&
            this.props.totalDayMinutesAfterEntry <= this.DOUBLETIME_AFTER_X_MINUTES
        ) {
            overview.type = 'overtime';
            overviewGroups.push(overview);
            return overviewGroups;
        }

        // If entry ends as overtime or double time split hours
        if (this.props.totalDayMinutesAfterEntry > this.OVERTIME_AFTER_X_MINUTES) {
            const regularTimeMinutes = (this.totalDayMinutesBeforeEntry - this.OVERTIME_AFTER_X_MINUTES) * -1;

            let overTimeMinutes =
                this.props.entry.durationInMinutes - (regularTimeMinutes > 0 ? regularTimeMinutes : 0);
            if (overTimeMinutes > this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES) {
                overTimeMinutes = this.PERIOD_BETWEEN_OVERTIME_AND_DOUBLETIME_X_MINUTES;
            }

            const doubleTimeMinutes =
                this.props.entry.durationInMinutes -
                (regularTimeMinutes > 0 ? regularTimeMinutes : 0) -
                (overTimeMinutes > 0 ? overTimeMinutes : 0);

            if (regularTimeMinutes > 0) {
                overviewGroups.push({
                    fromDate: this.props.entry.startDate,
                    tilDate: dateAddMinutes(this.props.entry.startDate, regularTimeMinutes),
                    durationInMinutes: regularTimeMinutes,
                    type: 'regular',
                });
            }

            if (overTimeMinutes > 0) {
                const overtTimeStartDateAddedMinutes = regularTimeMinutes > 0 ? regularTimeMinutes : 0;
                const overTimeStartDate = dateAddMinutes(this.props.entry.startDate, overtTimeStartDateAddedMinutes);
                overviewGroups.push({
                    fromDate: overTimeStartDate,
                    tilDate: dateAddMinutes(overTimeStartDate, overTimeMinutes),
                    durationInMinutes: overTimeMinutes,
                    type: 'overtime',
                });
            }

            if (doubleTimeMinutes > 0) {
                const doubleTimeStartDateAddedMinutes =
                    (regularTimeMinutes > 0 ? regularTimeMinutes : 0) + (overTimeMinutes > 0 ? overTimeMinutes : 0);
                const doubleTimeStartDate = dateAddMinutes(this.props.entry.startDate, doubleTimeStartDateAddedMinutes);
                overviewGroups.push({
                    fromDate: doubleTimeStartDate,
                    tilDate: dateAddMinutes(doubleTimeStartDate, doubleTimeMinutes),
                    durationInMinutes: doubleTimeMinutes,
                    type: 'doubletime',
                });
            }

            return overviewGroups;
        }

        overviewGroups.push(overview);
        return overviewGroups;
    }

    public render() {
        const { entry } = this.props;

        return (
            <div className={s.entriesGroup}>
                <div className={s.tags}>
                    {entry.selectedProject !== null &&
                        Object.keys(entry.selectedProject).map(key => {
                            if (entry.selectedProject === null) {
                                return null;
                            }

                            const tag = entry.selectedProject[key] as ProjectPickerGroupValues;

                            return tag !== null &&
                                ['project', 'projectCampaign', 'spot', 'version'].indexOf(key) !== -1 ? (
                                <Tag
                                    key={key + '-' + tag.id}
                                    className={s.tag}
                                    // title={key === 'projectCampaign' ? 'Campaign' : capitalize(key)}
                                    title=""
                                    isTitleDim={true}
                                    isTitleBold={false}
                                    otherLabels={[
                                        {
                                            text: tag.name,
                                            isBold: true,
                                        },
                                    ]}
                                />
                            ) : null;
                        })}

                    {(entry.selectedProject === null || entry.selectedProject.project === null) && (
                        <Tag key="no-project" title="" isTitleDim={true} isTitleBold={false} />
                    )}
                </div>

                <div className={s.entry}>
                    <div className={s.overview}>
                        <div className={s.activity}>
                            <p>{entry.activityName}</p>

                            {this.props.isEditable && (
                                <Button onClick={this.handleEditEntry(entry)} label={{ text: 'Edit', color: 'blue' }} />
                            )}
                        </div>

                        {entry.notes && (
                            <div className={s.notes}>
                                <p>
                                    Notes: <strong>{entry.notes}</strong>
                                </p>
                            </div>
                        )}

                        {entry.files &&
                            entry.files.length > 0 && (
                                <div className={s.files}>
                                    <div className={s.label}>
                                        <p>Files:</p>
                                    </div>
                                    <div className={s.lines}>
                                        {entry.files.map((file) => (
                                            <div className={s.line} key={file.filename + file.durationInMinutes}>
                                                <p className={s.fileDuration}>
                                                    {DateHandler.convertTotalMinutesToHM(file.durationInMinutes, true)}
                                                </p>
                                                <p className={s.filename}>
                                                    <strong>{file.filename}</strong>
                                                    {file.description ? ' — ' + file.description : ''}
                                                </p>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className={s.time}>
                        {this.entryTimeOverview.map(overview => (
                            <p
                                key={overview.fromDate.toISOString() + overview.tilDate.toISOString()}
                                className={classNames(s.duration, s[overview.type])}
                            >
                                {dateFormat(overview.fromDate, this.TIME_FORMAT) +
                                    ' — ' +
                                    dateFormat(overview.tilDate, this.TIME_FORMAT)}
                                <strong>{DateHandler.convertTotalMinutesToHM(overview.durationInMinutes)}</strong>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    private handleEditEntry = (entry: TimeApprovalEntry) => () => {
        TimeEntryActions.editExistingEntry({
            id: entry.entryId,
            userId: entry.userId,
            userTypeId: entry.userTypeId,
            userTypeName: entry.userTypeName,
            notes: entry.notes,
            activityId: entry.activityId,
            activityName: entry.activityName,
            clientId:
                entry.selectedProject && entry.selectedProject.customerId ? entry.selectedProject.customerId : null,
            projectId: entry.selectedProject && entry.selectedProject.project ? entry.selectedProject.project.id : null,
            projectName:
                entry.selectedProject && entry.selectedProject.project ? entry.selectedProject.project.name : null,
            projectCampaignId:
                entry.selectedProject && entry.selectedProject.projectCampaign
                    ? entry.selectedProject.projectCampaign.id
                    : null,
            projectCampaignName:
                entry.selectedProject && entry.selectedProject.projectCampaign
                    ? entry.selectedProject.projectCampaign.name
                    : null,
            spotId: entry.selectedProject && entry.selectedProject.spot ? entry.selectedProject.spot.id : null,
            spotName: entry.selectedProject && entry.selectedProject.spot ? entry.selectedProject.spot.name : null,
            versionId: entry.selectedProject && entry.selectedProject.version ? entry.selectedProject.version.id : null,
            versionName:
                entry.selectedProject && entry.selectedProject.version ? entry.selectedProject.version.name : null,
            hours: entry.durationInMinutes / 60,
            startDate: entry.startDate,
            status: TimeEntryStatus.UnderReview,
            files: entry.files ? entry.files : [],
        });
    };
}
