import { SpotToBillFormActions } from 'actions';
import * as classNames from 'classnames';
import { Person } from 'components/Buddha';
import { Paragraph, Tooltip } from 'components/Content';
import { Checkbox, DurationCounter } from 'components/Form';
import { CardContentTable, CardContentTableRow } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { StringHandler } from 'helpers/StringHandler';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ActivityInBill } from 'types/spotBilling';

const s = require('./BillSpotFormActivitiesTable.css');
const splitIcon = require('./../../../../assets/images/actions/split-icon.svg');

export interface FormattedInBillTimeEntry extends ActivityInBill {
    spotId: number | null;
    spotName: string | null;
    versionId: number | null;
    versionName: string | null;
    userId: number;
    userName: string;
    userFirstName: string | null;
    userLastName: string | null;
    userImage: string | null;
    activityId: number;
    activityName: string;
    activityDescription: string | null;
    durationInMinutes: number;
    startTimeInMinutes: number;
    endTimeInMinutes: number;
    startDate: Date;
    endDate: Date;
    isBillable: boolean;
    isSelectedToBill: boolean;
}

export interface BillActivitiesTableOptions {
    showVersions?: boolean;
    showDate?: boolean;
    showBillable?: boolean;
    showAddToBill?: boolean;
}

interface Props {
    entriesFormatted: FormattedInBillTimeEntry[];
    options: BillActivitiesTableOptions;
}

@observer
export class BillSpotFormActivitiesTable extends React.Component<Props, {}> {
    static get defaultProps(): Props {
        return {
            entriesFormatted: [],
            options: {
                showVersions: false,
                showDate: false,
                showBillable: false,
                showAddToBill: false,
            },
        };
    }

    public render() {
        const {
            options: { showVersions, showDate, showBillable, showAddToBill },
        } = this.props;

        return (
            <CardContentTable
                header={[
                    { title: 'Person' },
                    ...(showVersions
                        ? [
                              {
                                  title: 'Version',
                              },
                          ]
                        : []),
                    { title: 'Activity' },
                    ...(showDate
                        ? [
                              {
                                  title: 'Date',
                                  align: 'right' as 'right',
                              },
                          ]
                        : []),
                    { title: 'Time', align: 'right' },
                    { title: 'Hours', align: showAddToBill || showBillable ? 'left' : 'right' },
                    ...(showBillable ? [{ title: 'Billable', align: 'left' as 'left' }] : []),
                    ...(showAddToBill ? [{ title: 'In bill', align: 'right' as 'right' }] : []),
                ]}
            >
                {this.props.entriesFormatted.map(entry => (
                    <React.Fragment key={entry.timeEntryId}>
                        <CardContentTableRow>
                            <div className={s.personCol}>
                                <Person
                                    personId={entry.userId}
                                    personName={StringHandler.constructUserName(
                                        entry.userName,
                                        entry.userFirstName,
                                        entry.userLastName
                                    )}
                                    personImage={entry.userImage}
                                    showSmallPersonImage={true}
                                    showSmallPersonName={true}
                                />
                            </div>

                            {showVersions && (
                                <div className={s.versionCol}>
                                    <Paragraph
                                        type={entry.versionName || entry.versionId ? 'brown' : 'dim'}
                                        size="small"
                                    >
                                        {entry.versionName
                                            ? entry.versionName
                                            : entry.versionId
                                            ? '#' + entry.versionId
                                            : 'Unspecified'}
                                    </Paragraph>
                                </div>
                            )}

                            <div className={s.activityCol}>
                                <Paragraph type="brown" size="small">
                                    <strong>{entry.activityName}</strong>
                                    {entry.activityDescription ? ' Note: ' + entry.activityDescription : undefined}
                                </Paragraph>
                            </div>

                            {showDate && (
                                <div className={s.dateCol} style={{ textAlign: 'right' }}>
                                    <Paragraph type="brown" size="small" align="right">
                                        <span>{DateHandler.printDateObjectAsString(entry.startDate)}</span>
                                    </Paragraph>
                                </div>
                            )}

                            <div className={s.dateCol} style={{ textAlign: 'right' }}>
                                <Paragraph type="brown" size="small" align="right">
                                    {DateHandler.printPeriodBetweenTwoDatesAsHoursString(
                                        entry.startDate,
                                        entry.endDate,
                                        true
                                    )}
                                </Paragraph>
                            </div>

                            <div
                                className={s.durationCol}
                                style={{ textAlign: showAddToBill || showBillable ? 'left' : 'right' }}
                            >
                                <Paragraph type="blue" size="small" bold={true}>
                                    {DateHandler.convertTotalMinutesToHM(entry.durationInMinutes)}
                                </Paragraph>
                            </div>

                            {showBillable && (
                                <div className={s.billableCol} style={{ textAlign: 'center' }}>
                                    <Paragraph
                                        type={entry.isBillable ? 'blue' : 'alert'}
                                        size="small"
                                        bold={true}
                                        align="left"
                                    >
                                        {entry.isBillable ? 'Yes' : 'No'}
                                    </Paragraph>
                                </div>
                            )}

                            {showAddToBill && (
                                <div className={s.inBillCol}>
                                    <div>
                                        {entry.isSelectedToBill && entry.hoursAreSplit === false && (
                                            <Tooltip isSmall={true} text="Split to overtime">
                                                <button
                                                    className={s.splitButton}
                                                    onClick={this.handleSplittingEntryHours(entry.timeEntryId)}
                                                >
                                                    <img src={splitIcon} alt="Split" />
                                                </button>
                                            </Tooltip>
                                        )}
                                    </div>

                                    <div>
                                        {entry.isSelectedToBill && (
                                            <DurationCounter
                                                onChange={this.handleSelectedEntryHours(entry, 'total')}
                                                valueLessThan={{
                                                    value: entry.durationInMinutes,
                                                    color: 'alert',
                                                }}
                                                valueMoreThan={{
                                                    value: entry.durationInMinutes,
                                                    color: 'success',
                                                }}
                                                value={entry.totalHoursInMinutes}
                                                minValue={0}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <Checkbox
                                            onChange={this.handleToggleActivityInBill(entry)}
                                            labelOnLeft={true}
                                            label={entry.isSelectedToBill ? '' : 'Add to bill'}
                                            checked={entry.isSelectedToBill}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContentTableRow>

                        {entry.hoursAreSplit && (
                            <React.Fragment>
                                <CardContentTableRow
                                    className={classNames(s.secondaryRows, s.regularHoursRow, {
                                        [s.fourSpan]: showVersions,
                                    })}
                                    design="compact"
                                >
                                    <div className={s.splitTimeEntryHoursEmptyCol} />
                                    <div className={s.splitTimeEntryVisualLineCol} />
                                    <div className={s.splitTimeEntryInBillCol}>
                                        <p>Regular:</p>

                                        <DurationCounter
                                            onChange={this.handleSelectedEntryHours(entry, 'regular')}
                                            value={entry.regularHoursInMinutes}
                                            maxValue={entry.totalHoursInMinutes}
                                            minValue={0}
                                        />
                                    </div>
                                </CardContentTableRow>

                                <CardContentTableRow
                                    className={classNames(s.secondaryRows, s.overtimeHoursRow, {
                                        [s.fourSpan]: showVersions,
                                    })}
                                    design="compact"
                                >
                                    <div className={s.splitTimeEntryHoursEmptyCol} />
                                    <div className={s.splitTimeEntryVisualLineCol} />
                                    <div className={s.splitTimeEntryInBillCol}>
                                        <p>Overtime:</p>

                                        <DurationCounter
                                            onChange={this.handleSelectedEntryHours(entry, 'overtime')}
                                            value={entry.overtimeHoursInMinutes}
                                            maxValue={entry.totalHoursInMinutes}
                                            minValue={0}
                                        />
                                    </div>
                                </CardContentTableRow>

                                <CardContentTableRow
                                    className={classNames(s.secondaryRows, s.doubletimeHoursRow, {
                                        [s.fourSpan]: showVersions,
                                    })}
                                    design="compact"
                                >
                                    <div className={s.splitTimeEntryHoursEmptyCol} />
                                    <div className={s.splitTimeEntryVisualLineCol} />
                                    <div className={s.splitTimeEntryInBillCol}>
                                        <p>Double time: </p>

                                        <DurationCounter
                                            onChange={this.handleSelectedEntryHours(entry, 'doubletime')}
                                            value={entry.doubletimeHoursInMinutes}
                                            maxValue={entry.totalHoursInMinutes}
                                            minValue={0}
                                        />
                                    </div>
                                </CardContentTableRow>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            </CardContentTable>
        );
    }

    private handleToggleActivityInBill = (entry: FormattedInBillTimeEntry) => (checked: boolean, value: boolean) => {
        if (checked) {
            SpotToBillFormActions.addTimeEntryToActivitiesSelection(entry, {
                totalHoursInMinutes: entry.durationInMinutes,
                regularHoursInMinutes: entry.durationInMinutes,
            });
        } else {
            SpotToBillFormActions.removeTimeEntryFromActivitiesSelection(entry.timeEntryId);
        }
    };

    private handleSelectedEntryHours = (
        entry: FormattedInBillTimeEntry,
        hours: 'total' | 'regular' | 'overtime' | 'doubletime'
    ) => (totalMinutes: number) => {
        SpotToBillFormActions.addTimeEntryToActivitiesSelection(entry, {
            [hours === 'total'
                ? 'totalHoursInMinutes'
                : hours === 'doubletime'
                ? 'doubletimeHoursInMinutes'
                : hours === 'overtime'
                ? 'overtimeHoursInMinutes'
                : 'regularHoursInMinutes']: totalMinutes,
        });
    };

    private handleSplittingEntryHours = (timeEntryId: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        SpotToBillFormActions.splitTimeEntryHoursInActivitiesSelection(timeEntryId);
    };
}
