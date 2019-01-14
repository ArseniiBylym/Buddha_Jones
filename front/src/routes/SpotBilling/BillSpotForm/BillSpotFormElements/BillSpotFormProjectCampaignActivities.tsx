import { FormattedInBillTimeEntry } from '.';
import { DateHandler } from 'helpers/DateHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry } from 'types/spotBilling';
import { BillActivitiesTableOptions, BillSpotFormActivitiesTable } from './BillSpotFormActivitiesTable';

interface Props extends AppOnlyStoreState {
    timeEntries: BillTimeEntry[];
    options: BillActivitiesTableOptions;
}

@inject('store')
@observer
export class BillSpotFormProjectCampaignActivities extends React.Component<Props, {}> {
    @computed private get entriesFormatted(): FormattedInBillTimeEntry[] {
        const timeEntries = this.props.timeEntries.reduce((entries: FormattedInBillTimeEntry[], entry) => {
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
                spotId: entry.spotId,
                spotName: entry.spotName,
                versionId: entry.versionId,
                versionName: entry.versionName,
                hoursAreSplit: selectedToBill ? selectedToBill.hoursAreSplit : false,
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
        return <BillSpotFormActivitiesTable entriesFormatted={this.entriesFormatted} options={this.props.options} />;
    }
}
