import { DataSetEmpty } from 'components/Errors';
import { DateHandler } from 'helpers/DateHandler';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { BillTimeEntry, SpotBillFormSpot } from 'types/spotBilling';
import { BillSpotFormProjectCampaignActivities } from '../BillSpotFormElements';

interface ActivityByVersion {
    versionId: number;
    versionName: string | null;
    versionSequence: number | null;
    users: Array<{
        userId: number;
        userName: string;
        userFirstName: string;
        userLastName: string | null;
        userInitials: string | null;
        userImage: string | null;
        activities: Array<{
            activityId: number;
            activityName: string;
            days: Array<{
                date: Date;
                dateIso: string;
                timeEntries: BillTimeEntry[];
            }>;
        }>;
    }>;
}

interface Props extends AppOnlyStoreState {
    spot: SpotBillFormSpot;
}

@inject('store')
@observer
export class BillSpotFormActivities extends React.Component<Props, {}> {
    /** Compute all time entries grouped by version, user, activity type, date, time */
    @computed
    private get versions(): ActivityByVersion[] {
        return this.props.spot.timeEntries.reduce((versions: ActivityByVersion[], timeEntry) => {
            const date = DateHandler.parseDateStringAsDateObject(timeEntry.startDate);
            const dateIso = DateHandler.printDateObjectAsString(date, 'YYYY-MM-DD');
            const versionId = timeEntry.versionId || 0;
            const userId = timeEntry.userId;
            const activityId = timeEntry.activityId;

            // If version is not yet in array
            let versionIndex = versions.findIndex(v => v.versionId === versionId);
            if (versionIndex === -1) {
                versionIndex = versions.length;
                versions.push({
                    versionId: versionId,
                    versionName: timeEntry.versionName,
                    versionSequence: timeEntry.versionSequence,
                    users: [],
                });
            }

            // If user is not yet in array
            let userIndex = versions[versionIndex].users.findIndex(u => u.userId === userId);
            if (userIndex === -1) {
                userIndex = versions[versionIndex].users.length;
                versions[versionIndex].users.push({
                    userId: userId,
                    userName: timeEntry.userName,
                    userFirstName: timeEntry.userFirstName,
                    userLastName: timeEntry.userLastName,
                    userInitials: timeEntry.userInitials,
                    userImage: timeEntry.userImage,
                    activities: [],
                });
            }

            // If activity is not yet in array
            let activityIndex = versions[versionIndex].users[userIndex].activities.findIndex(
                a => a.activityId === activityId
            );
            if (activityIndex === -1) {
                activityIndex = versions[versionIndex].users[userIndex].activities.length;
                versions[versionIndex].users[userIndex].activities.push({
                    activityId: activityId,
                    activityName: timeEntry.activityName,
                    days: [],
                });
            }

            // If date is a day that is not yet in array
            let dateIndex = versions[versionIndex].users[userIndex].activities[activityIndex].days.findIndex(
                d => d.dateIso === dateIso
            );
            if (dateIndex === -1) {
                dateIndex = versions[versionIndex].users[userIndex].activities[activityIndex].days.length;
                versions[versionIndex].users[userIndex].activities[activityIndex].days.push({
                    date: date,
                    dateIso: dateIso,
                    timeEntries: [],
                });
            }

            // Push time entry
            versions[versionIndex].users[userIndex].activities[activityIndex].days[dateIndex].timeEntries.push(
                timeEntry
            );

            return versions;
        }, []);
    }

    /** Sort all time entries grouped by versions, users, activities types, dates, time */
    @computed
    private get sortedVersions(): ActivityByVersion[] {
        const sortedVersions = this.versions.sort((versionA, versionB) => {
            const verSeqA = versionA.versionSequence !== null ? versionA.versionSequence : -1;
            const verSeqB = versionB.versionSequence !== null ? versionB.versionSequence : -1;

            return verSeqA < 0 && verSeqB < 0
                ? 0
                : verSeqA < 0
                ? 1
                : verSeqB < 0
                ? -1
                : verSeqA > verSeqB
                ? 1
                : verSeqA < verSeqB
                ? -1
                : 0;
        });

        return sortedVersions.map(version => {
            return {
                ...version,
                users: version.users
                    .map(user => ({
                        ...user,
                        activities: user.activities
                            .map(activity => ({
                                ...activity,
                                days: activity.days.map(date => ({
                                    ...date,
                                    timeEntries: date.timeEntries.sort((timeEntryA, timeEntryB) => {
                                        const dateA = DateHandler.parseDateStringAsDateObject(timeEntryA.startDate);
                                        const dateB = DateHandler.parseDateStringAsDateObject(timeEntryB.startDate);

                                        return DateHandler.checkIfDateIsOlderThanOtherDate(dateA, dateB) ? -1 : 1;
                                    }),
                                })),
                            }))
                            .sort((activityA, activityB) => {
                                const letterA = activityA.activityName.charAt(0);
                                const letterB = activityB.activityName.charAt(0);

                                if (letterA !== letterB) {
                                    return letterA > letterB ? 1 : -1;
                                } else {
                                    const letterTwoA =
                                        activityA.activityName.length > 1 ? activityA.activityName.charAt(1) : '';
                                    const letterTwoB =
                                        activityB.activityName.length > 1 ? activityB.activityName.charAt(1) : '';

                                    return letterTwoA !== '' && letterTwoB === ''
                                        ? 1
                                        : letterTwoA === '' && letterTwoB !== ''
                                        ? -1
                                        : letterTwoA > letterTwoB
                                        ? 1
                                        : -1;
                                }
                            }),
                    }))
                    .sort((userA, userB) => {
                        if (userA.userId === userB.userId) {
                            return 0;
                        }

                        const lastNameA = userA.userLastName || '';
                        const lastNameB = userB.userLastName || '';

                        let letterA = lastNameA.charAt(0).toLowerCase();
                        let letterB = lastNameB.charAt(0).toLowerCase();

                        return letterA < letterB ? -1 : 1;
                    }),
            };
        });
    }

    /** Compute flat list of time entries based on sorted versions tree */
    @computed
    private get sortedTimeEntries(): BillTimeEntry[] {
        return this.sortedVersions.reduce((timeEntries: BillTimeEntry[], version) => {
            version.users.forEach(user => {
                user.activities.forEach(activity => {
                    activity.days.forEach(day => {
                        timeEntries.push(...day.timeEntries);
                    });
                });
            });

            return timeEntries;
        }, []);
    }

    /** Compute final time entries list with time entries in bill removed */
    @computed
    private get sortedFilteredTimeEntries(): BillTimeEntry[] {
        return this.sortedTimeEntries.filter(
            timeEntry =>
                !this.props.store!.spotToBillForm.activities.some(activity =>
                    activity.timeEntries.some(t => t.timeEntryId === timeEntry.timeEntryId)
                ) &&
                !this.props.store!.spotToBillForm.firstStage.some(first =>
                    first.timeEntriesIds.some(id => id === timeEntry.timeEntryId)
                )
        );
    }

    public render() {
        return (
            <React.Fragment>
                {this.sortedFilteredTimeEntries.length <= 0 && (
                    <DataSetEmpty
                        label={
                            this.sortedTimeEntries.length > 0
                                ? 'There are no more unpaid activites in this spot'
                                : 'There are no unpaid activities in this spot'
                        }
                    />
                )}

                {this.sortedTimeEntries.length > 0 && (
                    <BillSpotFormProjectCampaignActivities
                        timeEntries={this.sortedFilteredTimeEntries}
                        options={{ showVersions: true, showDate: true }}
                    />
                )}
            </React.Fragment>
        );
    }
}
