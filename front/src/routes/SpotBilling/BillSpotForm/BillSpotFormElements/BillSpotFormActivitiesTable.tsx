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
}

interface Props {
    entriesFormatted: FormattedInBillTimeEntry[];
    options: BillActivitiesTableOptions;
}

@observer
export class BillSpotFormActivitiesTable extends React.Component<Props, {}> {
    public render() {
        const {
            options: { showVersions, showDate, showBillable },
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
                    { title: showDate ? 'Date and time' : 'Time', align: 'right' },
                    { title: 'Hours', align: 'right' },
                    ...(showBillable ? [{ title: 'Billable', align: 'left' as 'left' }] : []),
                    { title: 'In bill', align: 'right' },
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

                            <div className={s.dateCol} style={{ textAlign: 'right' }}>
                                <Paragraph type="brown" size="small" align="right">
                                    {showDate && <span>{DateHandler.printDateObjectAsString(entry.startDate)}</span>}

                                    {DateHandler.printPeriodBetweenTwoDatesAsHoursString(
                                        entry.startDate,
                                        entry.endDate,
                                        true
                                    )}
                                </Paragraph>
                            </div>

                            <div className={s.durationCol} style={{ textAlign: 'right' }}>
                                <Paragraph type="blue" size="small" bold={true} align="right">
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
                                            onChange={this.handleSelectedEntryHours(entry, 'regular')}
                                            valueLessThan={{
                                                value: entry.durationInMinutes,
                                                color: 'alert',
                                            }}
                                            valueMoreThan={{
                                                value: entry.durationInMinutes,
                                                color: 'success',
                                            }}
                                            value={entry.regularHoursInMinutes}
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
                        </CardContentTableRow>

                        {entry.hoursAreSplit && (
                            <React.Fragment>
                                <CardContentTableRow
                                    className={classNames(s.secondaryRows, s.overtimeHoursRow)}
                                    design="compact"
                                >
                                    <div className={s.splitTimeEntryHoursEmptyCol} />
                                    <div className={s.splitTimeEntryVisualLineCol} />
                                    <div className={s.splitTimeEntryInBillCol}>
                                        <p>Overtime:</p>

                                        <DurationCounter
                                            onChange={this.handleSelectedEntryHours(entry, 'overtime')}
                                            value={entry.overtimeHoursInMinutes}
                                        />
                                    </div>
                                </CardContentTableRow>

                                <CardContentTableRow
                                    className={classNames(s.secondaryRows, s.doubletimeHoursRow)}
                                    design="compact"
                                >
                                    <div className={s.splitTimeEntryHoursEmptyCol} />
                                    <div className={s.splitTimeEntryVisualLineCol} />
                                    <div className={s.splitTimeEntryInBillCol}>
                                        <p>Double time: </p>

                                        <DurationCounter
                                            onChange={this.handleSelectedEntryHours(entry, 'doubletime')}
                                            value={entry.doubletimeHoursInMinutes}
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
                regularHoursInMinutes: entry.durationInMinutes,
            });
        } else {
            SpotToBillFormActions.removeTimeEntryFromActivitiesSelection(entry.timeEntryId);
        }
    };

    private handleSelectedEntryHours = (
        entry: FormattedInBillTimeEntry,
        hours: 'regular' | 'overtime' | 'doubletime'
    ) => (totalMinutes: number) => {
        SpotToBillFormActions.addTimeEntryToActivitiesSelection(entry, {
            [hours === 'doubletime'
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