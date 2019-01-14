import { BillTimeEntriesSelectionTotals } from '..';
import { DataSetEmpty } from 'components/Errors';
import { Card, Section } from 'components/Section';
import { DateHandler } from 'helpers/DateHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { BillActivitiesSectionSelectionTotal } from '../BillSpotFormElements';

const s = require('./BillSpotFormActivities.css');

interface ActivityDay extends BillTimeEntriesSelectionTotals {
    date: Date;
    dateIso: string;
    timeEntries: BillTimeEntry[];
}

interface Props extends AppOnlyStoreState {
    spots: SpotBillFormSpot[];
    marginBottom: number;
}

@inject('store')
@observer
export class BillSpotFormActivities extends React.Component<Props, {}> {
    @computed private get activityDays(): ActivityDay[] {
        const activityDays = this.props.spots.reduce((days: ActivityDay[], spot) => {
            spot.timeEntries.forEach(timeEntry => {
                const dateIso = timeEntry.startDate.date;
                const index = days.findIndex(day => day.dateIso === dateIso);
                if (index !== -1) {
                    days[index].timeEntries.push(timeEntry);
                } else {
                    days.push({
                        date: DateHandler.parseDateStringAsDateObject(timeEntry.startDate),
                        dateIso: timeEntry.startDate.date,
                        timeEntries: [timeEntry],
                        totalMinutes: 0,
                        selectedBaseMinutes: 0,
                        selectedAdjustedMinutes: 0,
                        areTotalMinutesUnbilled: true,
                    });
                }
            });

            return days;
        }, []);

        activityDays.forEach(day => {
            let dayMinutes = 0;
            let daySelectedBaseMinutes = 0;
            let daySelectedAdjustedMinutes = 0;

            day.timeEntries.forEach(timeEntry => {
                const duration = DateHandler.convertHoursDotMinutesToTotalMinutes(timeEntry.duration);
                dayMinutes += duration;

                const selectionIndex = this.props.store!.spotToBillForm.selectedActivitiesIds.indexOf(
                    timeEntry.timeEntryId
                );
                if (selectionIndex !== -1) {
                    const selection = this.props.store!.spotToBillForm.selectedActivities[selectionIndex];
                    daySelectedBaseMinutes += duration;
                    daySelectedAdjustedMinutes +=
                        selection.regularHoursInMinutes +
                        selection.overtimeHoursInMinutes +
                        selection.doubletimeHoursInMinutes;
                }
            });

            day.totalMinutes = dayMinutes;
            day.selectedBaseMinutes = daySelectedBaseMinutes;
            day.selectedAdjustedMinutes = daySelectedAdjustedMinutes;
        });

        activityDays.forEach(day => {
            day.timeEntries = day.timeEntries.sort((entryA, entryB) => {
                if (
                    DateHandler.checkIfDateIsOlderThanOtherDate(
                        DateHandler.parseDateStringAsDateObject(entryA.startDate),
                        DateHandler.parseDateStringAsDateObject(entryB.startDate)
                    )
                ) {
                    return 1;
                } else {
                    return -1;
                }
            });
        });

        return activityDays.sort((dayA, dayB) => {
            if (dayA.dateIso > dayB.dateIso) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    public render() {
        return (
            <div style={{ paddingBottom: this.props.marginBottom + 'px' }}>
                <Section title="Activities">
                    {this.activityDays.length <= 0 && (
                        <DataSetEmpty label="There are no activities in selected spots" />
                    )}

                    {this.activityDays.map(day => (
                        <Card
                            key={day.dateIso}
                            isExpandable={true}
                            title={DateHandler.printDateObjectAsString(day.date, 'MMMM Mo, YYYY')}
                            classNameForHeaderTitle={s.dayTitle}
                            headerElements={
                                <BillActivitiesSectionSelectionTotal
                                    totalMinutes={day.totalMinutes}
                                    areTotalMinutesUnbilled={true}
                                    selectedBaseMinutes={day.selectedBaseMinutes}
                                    selectedAdjustedMinutes={day.selectedAdjustedMinutes}
                                />
                            }
                        >
                            <div />
                        </Card>
                    ))}
                </Section>
            </div>
        );
    }
}
