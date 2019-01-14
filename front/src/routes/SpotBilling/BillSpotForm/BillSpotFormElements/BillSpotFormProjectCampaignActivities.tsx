import { SpotToBillFormActions } from 'actions';
import { Person } from 'components/Buddha';
import { Paragraph } from 'components/Content';
import { Checkbox, DurationCounter } from 'components/Form';
import { CardContentTable, CardContentTableRow } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { StringHandler } from 'helpers/StringHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { ActivityInBill, BillTimeEntry } from 'types/spotBilling';

const s = require('./BillSpotFormProjectCampaignActivities.css');

interface FormattedProjectCampaignTimeEntry extends ActivityInBill {
    userId: number;
    userName: string;
    userFirstName: string | null;
    userLastName: string | null;
    userImage: string | null;
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

interface Props extends AppOnlyStoreState {
    timeEntries: BillTimeEntry[];
}

@inject('store')
@observer
export class BillSpotFormProjectCampaignActivities extends React.Component<Props, {}> {
    @computed private get entriesFormatted(): FormattedProjectCampaignTimeEntry[] {
        const timeEntries = this.props.timeEntries.reduce((entries: FormattedProjectCampaignTimeEntry[], entry) => {
            // Calculate start and end time
            const startDate = DateHandler.parseDateStringAsDateObject(entry.startDate);
            const startTimeInMinutes = DateHandler.getTotalMinutesFromDateTime(startDate);
            const durationInMinutes = DateHandler.convertHoursDotMinutesToTotalMinutes(entry.duration);
            const endDate = DateHandler.setTotalMinutesOnDate(startDate, startTimeInMinutes + durationInMinutes);

            // Check if entry is selected
            const selectedToBillIndex = this.props.store!.spotToBillForm.selectedActivitiesIds.indexOf(
                entry.timeEntryId
            );
            const selectedToBill =
                selectedToBillIndex !== -1
                    ? this.props.store!.spotToBillForm.selectedActivities[selectedToBillIndex]
                    : null;

            // Add to array
            entries.push({
                timeEntryId: entry.timeEntryId,
                userId: entry.userId,
                userName: entry.userName,
                userFirstName: entry.userFirstName,
                userLastName: entry.userLastName,
                userImage: entry.userImage,
                activityName: entry.activityName,
                activityDescription: entry.activityDescription,
                durationInMinutes: durationInMinutes,
                startTimeInMinutes: startTimeInMinutes,
                endTimeInMinutes: startTimeInMinutes + durationInMinutes,
                startDate: startDate,
                endDate: endDate,
                isBillable: entry.activityIsBillable,
                isSelectedToBill: selectedToBill !== null,
                regularHoursInMinutes: selectedToBill ? selectedToBill.regularHoursInMinutes : 0,
                overtimeHoursInMinutes: selectedToBill ? selectedToBill.overtimeHoursInMinutes : 0,
                doubletimeHoursInMinutes: selectedToBill ? selectedToBill.doubletimeHoursInMinutes : 0,
            });

            // Return
            return entries;
        }, []);

        return timeEntries.sort((entryA, entryB) => {
            if (DateHandler.checkIfDateIsOlderThanOtherDate(entryA.startDate, entryB.startDate)) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    public render() {
        return (
            <CardContentTable
                header={[
                    { title: 'Person' },
                    { title: 'Activity' },
                    { title: 'Date and time', align: 'right' },
                    { title: 'Hours', align: 'right' },
                    { title: 'Billable', align: 'center' },
                    { title: 'In bill', align: 'right' },
                ]}
            >
                {this.entriesFormatted.map(entry => (
                    <CardContentTableRow key={entry.timeEntryId}>
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

                        <div className={s.activityCol}>
                            <Paragraph type="brown" size="small">
                                <strong>{entry.activityName}</strong>
                                {entry.activityDescription ? ' Note: ' + entry.activityDescription : undefined}
                            </Paragraph>
                        </div>

                        <div className={s.dateCol} style={{ textAlign: 'right' }}>
                            <Paragraph type="brown" size="small" align="right">
                                <span>{DateHandler.printDateObjectAsString(entry.startDate)}</span>

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

                        <div className={s.billableCol} style={{ textAlign: 'center' }}>
                            <Paragraph
                                type={entry.isBillable ? 'blue' : 'alert'}
                                size="small"
                                bold={true}
                                align="center"
                            >
                                {entry.isBillable ? 'Yes' : 'No'}
                            </Paragraph>
                        </div>

                        <div className={s.inBillCol}>
                            <div>
                                {entry.isSelectedToBill && (
                                    <React.Fragment>
                                        <DurationCounter
                                            onChange={this.handleSelectedEntryHours(entry.timeEntryId, 'regular')}
                                            value={entry.regularHoursInMinutes}
                                        />
                                    </React.Fragment>
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
                ))}
            </CardContentTable>
        );
    }

    private handleToggleActivityInBill = (entry: FormattedProjectCampaignTimeEntry) => (
        checked: boolean,
        value: boolean
    ) => {
        if (checked) {
            SpotToBillFormActions.addTimeEntryToActivitiesSelection(entry.timeEntryId, {
                regularHoursInMinutes: entry.durationInMinutes,
            });
        } else {
            SpotToBillFormActions.removeTimeEntryFromActivitiesSelection(entry.timeEntryId);
        }
    };

    private handleSelectedEntryHours = (timeEntryId: number, hours: 'regular' | 'overtime' | 'doubletime') => (
        totalMinutes: number
    ) => {
        SpotToBillFormActions.addTimeEntryToActivitiesSelection(timeEntryId, {
            [hours === 'doubletime'
                ? 'doubletimeHoursInMinutes'
                : hours === 'overtime'
                ? 'overtimeHoursInMinutes'
                : 'regularHoursInMinutes']: totalMinutes,
        });
    };
}
