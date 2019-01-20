import { action, extendObservable } from 'mobx';
import * as dateParse from 'date-fns/parse';
import * as dateFormat from 'date-fns/format';
import * as dateSetDayOfTheWeek from 'date-fns/set_day';
import * as dateGetDatesFromPeriod from 'date-fns/each_day';
import * as dateGetHours from 'date-fns/get_hours';
import * as dateGetMinutes from 'date-fns/get_minutes';
import * as dateSetHours from 'date-fns/set_hours';
import * as dateSetMinutes from 'date-fns/set_minutes';
import { unformat } from 'accounting';
import { TimeEntryStore } from 'store/AllStores';
import { API, APIPath } from 'fetch';
import {
    TimeEntriesOfUserFromApi,
    TimeEntryCalendarEntry,
    TimeEntryCalendarDay,
    TimeEntryStatus,
    TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID,
    TimeEntryUserWithType,
} from 'types/timeEntry';
import { ProjectPickerValues } from 'components/Buddha';
import { DateHandler } from 'helpers/DateHandler';

export interface FieldDetails {
    filename?: string;
    description?: string;
    durationInMinutes?: number;
}

export class TimeEntryActionsClass {

    @action
    public cleanTimeEntryValueActivityId = () => {
        if (TimeEntryStore.values && TimeEntryStore.values.activityId) {
            TimeEntryStore.values.activityId = null;
        }
    };

    @action
    public resetTimeEntry = () => {
        TimeEntryStore.values = null;
    };

    @action
    public editExistingEntry = (entry?: TimeEntryCalendarEntry) => {
        if (entry) {
            this.resetTimeEntry();

            const startTimeInMinutes = dateGetHours(entry.startDate) * 60 + dateGetMinutes(entry.startDate);

            TimeEntryStore.values = {
                isModified: false,
                forUser: entry.userId
                    ? {
                        id: entry.userId,
                        typeId: entry.userTypeId,
                        typeName: entry.userTypeName,
                    }
                    : null,
                editingEntryId: entry.id,
                startDate: entry.startDate,
                userKnowsTheProject: null,
                activityId: entry.activityId,
                startTimeInMinutes: startTimeInMinutes,
                endTimeInMinutes: startTimeInMinutes + entry.hours * 60,
                description: entry.notes || '',
                projectPicked:
                    entry.projectId || entry.projectCampaignId || entry.spotId || entry.versionId
                        ? {
                            project: entry.projectId
                                ? {
                                    id: entry.projectId,
                                    name: entry.projectName || '',
                                }
                                : null,
                            projectCampaign: entry.projectCampaignId
                                ? {
                                    id: entry.projectCampaignId,
                                    name: entry.projectCampaignName || '',
                                }
                                : null,
                            spot: entry.spotId
                                ? {
                                    id: entry.spotId,
                                    name: entry.spotName || '',
                                }
                                : null,
                            version: entry.versionId
                                ? {
                                    id: entry.versionId,
                                    name: entry.versionName || '',
                                }
                                : null,
                            customerId: entry.clientId,
                        }
                        : null,
                files: entry.files
                    ? entry.files.map(file => ({
                        filename: file.filename,
                        description: file.description || '',
                        durationInMinutes: file.durationInMinutes || 0,
                    }))
                    : [],
            };
        }
    };

    @action
    public deleteExistingEntry = async (entryId: number): Promise<boolean> => {
        try {
            await API.deleteData(APIPath.TIME_ENTRY + '/' + entryId);
            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public deleteEntryFromFetchedEntries = (forUserId: number, entryId: number) => {
        Object.keys(TimeEntryStore.entriesForDay).forEach(entryForDayKey => {
            const entriesForDay = TimeEntryStore.entriesForDay[entryForDayKey];
            if (entriesForDay.userId === forUserId) {
                entriesForDay.timeEntries.forEach((entry, entryIndex) => {
                    if (entry.id === entryId) {
                        entriesForDay.timeEntries = [
                            ...entriesForDay.timeEntries.slice(0, entryIndex),
                            ...entriesForDay.timeEntries.slice(entryIndex + 1),
                        ];
                    }
                });
            }
        });
    };

    @action
    public reFetchLastTimeEntries = async (): Promise<boolean> => {
        try {
            if (TimeEntryStore.lastFetch.userId !== 0 && TimeEntryStore.lastFetch.fetchTimeStamp > 0) {
                await this.fetchTimeEntriesOfUser(
                    {
                        id: TimeEntryStore.lastFetch.userId,
                        typeId: TimeEntryStore.lastFetch.userTypeId,
                        typeName: TimeEntryStore.lastFetch.userTypeName,
                    },
                    TimeEntryStore.lastFetch.fromDate,
                    TimeEntryStore.lastFetch.tilDate
                );
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchTimeEntriesOfUser = async (
        forUser: TimeEntryUserWithType,
        fromDate: Date,
        tilDate?: Date
    ): Promise<boolean> => {
        tilDate = typeof tilDate !== 'undefined' ? tilDate : fromDate;

        TimeEntryStore.lastFetch.userId = forUser.id;
        TimeEntryStore.lastFetch.userTypeId = forUser.typeId;
        TimeEntryStore.lastFetch.userTypeName = forUser.typeName;
        TimeEntryStore.lastFetch.fromDate = fromDate;
        TimeEntryStore.lastFetch.tilDate = tilDate;
        TimeEntryStore.lastFetch.fetchTimeStamp = Date.now();

        try {
            const dates = dateGetDatesFromPeriod(fromDate, tilDate);

            if (dates && dates.length > 0) {
                // Initialize dates
                dates.forEach(date => {
                    const dateUserKey = forUser.id + '-' + dateFormat(date, 'YYYY-MM-DD');
                    const dateFound =
                        typeof TimeEntryStore.entriesForDay[dateUserKey] !== 'undefined'
                            ? TimeEntryStore.entriesForDay[dateUserKey]
                            : null;

                    if (dateFound) {
                        dateFound.isDayLoading = true;
                    } else {
                        extendObservable(TimeEntryStore.entriesForDay, {
                            [dateUserKey]: {
                                date: date,
                                userId: forUser.id,
                                isDayLoading: true,
                                isDayApproved: false,
                                isDayClosed: false,
                                timeEntries: [],
                            },
                        });
                    }
                });

                // Fetch entries
                const fetchEntries = (await API.getData(APIPath.TIME_ENTRY_OF_USER, {
                    start_date: dateFormat(fromDate, 'YYYY-MM-DD'),
                    end_date: dateFormat(tilDate, 'YYYY-MM-DD'),
                    user_id: forUser.id,
                })) as TimeEntriesOfUserFromApi;

                Object.keys(fetchEntries).forEach(dateKey => {
                    const dateEntries = fetchEntries[dateKey];
                    const dateUserKey = forUser.id + '-' + dateKey;
                    const entriesForDay = TimeEntryStore.entriesForDay[dateUserKey];

                    let dayStatusCount = {};

                    entriesForDay.timeEntries = dateEntries
                        ? dateEntries.map(entry => {
                            dayStatusCount[entry.status] =
                                typeof dayStatusCount[entry.status] !== 'undefined'
                                    ? dayStatusCount[entry.status] + 1
                                    : 1;

                            return {
                                id: entry.id,
                                userId: forUser.id,
                                userTypeId: forUser.typeId,
                                userTypeName: forUser.typeName,
                                notes: entry.activityDescription,
                                activityId: entry.activityId,
                                activityName: entry.activityValue,
                                name: [entry.activityValue, entry.projectName, entry.campaignName, entry.spotName]
                                    .filter(name => typeof name === 'string' && name !== null && name !== '')
                                    .join(' - ')
                                    .concat(entry.versionName ? ' - ver. #' + entry.versionName : ''),
                                clientId: entry.customerId ? entry.customerId : null,
                                projectId: entry.projectId,
                                projectName: entry.projectName,
                                projectCampaignId: entry.projectCampaignId,
                                projectCampaignName: entry.campaignName,
                                spotId: entry.spotId,
                                spotName: entry.spotName + (entry.runtime ? ` (${entry.runtime})` : ''),
                                versionId: entry.versionId,
                                versionName: entry.versionName,
                                hours: this.splitEntryDurationAndCalculateHoursFloat(entry.duration),
                                startDate: dateParse(entry.startDate.date),
                                status: entry.status,
                                statusName: entry.statusName,
                                files: entry.files.map(file => ({
                                    filename: file.fileName,
                                    description: file.description,
                                    durationInMinutes: DateHandler.convertHoursDotMinutesToTotalMinutes(
                                        file.duration
                                    ),
                                })),
                            };
                        })
                        : entriesForDay.timeEntries;

                    entriesForDay.isDayLoading = false;

                    entriesForDay.isDayApproved = Boolean(
                        dayStatusCount[TimeEntryStatus.Approved] ||
                        dayStatusCount[TimeEntryStatus.Final] ||
                        dayStatusCount[TimeEntryStatus.SentToCustomer]
                    );

                    entriesForDay.isDayClosed = Boolean(
                        entriesForDay.isDayApproved || dayStatusCount[TimeEntryStatus.UnderReview]
                    );
                });
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchTimeEntriesOfUser(forUser, fromDate, tilDate);
            }, 1024);
            throw error;
        }
    };

    @action
    public submitActivity = async (): Promise<boolean> => {
        try {
            if (TimeEntryStore.values === null) {
                throw new Error('No values');
            }

            const startTimeHoursDecimal = TimeEntryStore.values.startTimeInMinutes / 60;
            const startTimeHours = Math.floor(startTimeHoursDecimal);
            const startTimeMinutes = (startTimeHoursDecimal - startTimeHours) * 60;
            const startDateTime = dateSetHours(
                dateSetMinutes(TimeEntryStore.values.startDate, startTimeMinutes),
                startTimeHours
            );

            const durationInMinutes = TimeEntryStore.values.endTimeInMinutes - TimeEntryStore.values.startTimeInMinutes;

            if (TimeEntryStore.values && TimeEntryStore.values.isModified) {
                await API[TimeEntryStore.values.editingEntryId !== null ? 'putData' : 'postData'](
                    APIPath.TIME_ENTRY +
                    (TimeEntryStore.values.editingEntryId !== null
                        ? '/' + TimeEntryStore.values.editingEntryId
                        : ''),
                    {
                        start_date_time: dateFormat(startDateTime, 'YYYY-MM-DD HH:mm:ss'),
                        duration: DateHandler.convertTotalMinutesToHoursDotMinutes(durationInMinutes),

                        project_id:
                            TimeEntryStore.values.projectPicked && TimeEntryStore.values.projectPicked.project
                                ? TimeEntryStore.values.projectPicked.project.id
                                : undefined,

                        project_campaign_id:
                            TimeEntryStore.values.projectPicked && TimeEntryStore.values.projectPicked.projectCampaign
                                ? TimeEntryStore.values.projectPicked.projectCampaign.id
                                : undefined,

                        spot_id:
                            TimeEntryStore.values.projectPicked && TimeEntryStore.values.projectPicked.spot
                                ? TimeEntryStore.values.projectPicked.spot.id
                                : undefined,

                        version_id:
                            TimeEntryStore.values.projectPicked && TimeEntryStore.values.projectPicked.version
                                ? TimeEntryStore.values.projectPicked.version.id
                                : undefined,

                        activity_id: TimeEntryStore.values.activityId,

                        activity_description: TimeEntryStore.values.description || '',
                        ...(TimeEntryStore.values.files.length > 0
                            ? {
                                files: JSON.stringify(
                                    TimeEntryStore.values.files.map(file => ({
                                        filename: file.filename.trim(),
                                        description: file.description.trim(),
                                        duration: DateHandler.convertTotalMinutesToHoursDotMinutes(
                                            file.durationInMinutes
                                        ),
                                    }))
                                ),
                            }
                            : {}),
                    }
                );
            }

            this.reFetchLastTimeEntries();

            return true;
        } catch (error) {
            if (error.message === 'Request failed with status code 400') {
                this.showErrorMessage('Time entry overlaps with an existing time entry');
            } 
            throw error;
        }
    };

    @action
    public viewDaySummary = async (
        forUser: TimeEntryUserWithType,
        minUserHours: number,
        dayIndex: number,
        checkForLunchBreak: boolean = true
    ): Promise<boolean> => {
        try {
            let lunchBreaks: number = 0;
            let totalMinutes: number = 0;
            const dayWithEntries: TimeEntryCalendarDay | null =
                typeof TimeEntryStore.viewDays[dayIndex] !== 'undefined' ? TimeEntryStore.viewDays[dayIndex] : null;
            if (dayWithEntries && dayWithEntries.timeEntries && dayWithEntries.timeEntries.length > 0) {
                dayWithEntries.timeEntries.forEach(entry => {
                    // Check if entry is lunch break
                    if (entry.activityId === TIME_ENTRY_LUNCH_BREAK_ACTIVITY_ID) {
                        lunchBreaks++;
                    }

                    // Add time
                    totalMinutes += entry.hours * 60;
                });
            } else {
                throw new Error('Day does not exist or has no time entries');
            }

            // If minimum work hours for the user are not met
            if (totalMinutes < minUserHours * 60) {
                TimeEntryStore.minimumHoursNotMetModal.show = true;
                TimeEntryStore.minimumHoursNotMetModal.minHours = minUserHours;
                return true;
            }

            // Check if lunch break has been taken
            if (checkForLunchBreak && lunchBreaks <= 0) {
                TimeEntryStore.lunchBreakNotTakenModal.show = true;
                TimeEntryStore.lunchBreakNotTakenModal.forUser = forUser;
                TimeEntryStore.lunchBreakNotTakenModal.minUserHours = minUserHours;
                TimeEntryStore.lunchBreakNotTakenModal.dayIndex = dayIndex;
                return true;
            }

            this.setCurrentViewToDay(forUser, dayWithEntries.date);

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public submitDayForReview = async (forUser: TimeEntryUserWithType, date: Date): Promise<boolean> => {
        try {
            await API.postData(APIPath.TIME_ENTRY_SUBMIT_FOR_REVIEW, {
                worker_id: forUser.id,
                date: dateFormat(date, 'YYYY-MM-DD'),
            });

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public closeTimeEntryModal = () => {
        this.resetTimeEntry();
    };

    @action
    public closeLunchBreakNotTakenModal = (closeAndSubmit: boolean = false) => {
        if (closeAndSubmit && TimeEntryStore.lunchBreakNotTakenModal.forUser) {
            this.viewDaySummary(
                TimeEntryStore.lunchBreakNotTakenModal.forUser,
                TimeEntryStore.lunchBreakNotTakenModal.minUserHours,
                TimeEntryStore.lunchBreakNotTakenModal.dayIndex,
                false
            );
        }

        TimeEntryStore.lunchBreakNotTakenModal.show = false;
        TimeEntryStore.lunchBreakNotTakenModal.forUser = null;
        TimeEntryStore.lunchBreakNotTakenModal.minUserHours = 0;
        TimeEntryStore.lunchBreakNotTakenModal.dayIndex = -1;
    };

    @action
    public setActivityTypeId = (activityId: number) => {
        if (TimeEntryStore.values) {
            TimeEntryStore.values.isModified = true;
            TimeEntryStore.values.activityId = activityId;
        }
    };

    @action
    public setFileDetails = (
        details: FieldDetails,
        index: number | null = null
    ) => {
        if (TimeEntryStore.values) {
            TimeEntryStore.values.isModified = true;
            if (index === null) {
                if (TimeEntryStore.values.files.length > 0 &&
                    TimeEntryStore.values.files[TimeEntryStore.values.files.length - 1].filename === '') { 
                        return;
                    }

                TimeEntryStore.values.files.push({
                    filename: details.filename || '',
                    description: details.description || '',
                    durationInMinutes: details.durationInMinutes != null ? details.durationInMinutes : 60,
                });
            } else if (typeof TimeEntryStore.values.files[index] !== 'undefined') {
                if (typeof details.filename !== 'undefined') {
                    TimeEntryStore.values.files[index].filename = details.filename;
                }

                if (typeof details.description !== 'undefined') {
                    TimeEntryStore.values.files[index].description = details.description;
                }

                if (typeof details.durationInMinutes !== 'undefined') {
                    TimeEntryStore.values.files[index].durationInMinutes = details.durationInMinutes;
                }
            }
        }
    };

    @action
    public setFileDetailsArray = (filesArr) => {
        if (TimeEntryStore.values) {
            TimeEntryStore.values.isModified = true;
            if (TimeEntryStore.values.files.length > 0 && 
                TimeEntryStore.values.files[TimeEntryStore.values.files.length - 1].filename === '') {
                    TimeEntryStore.values.files[TimeEntryStore.values.files.length - 1].filename = filesArr[0];
                    filesArr = filesArr.slice(1);
                    filesArr.forEach((item, i) => {
                        if (TimeEntryStore.values) {
                            TimeEntryStore.values.files.push({
                                filename: item || '',
                                description: '',
                                durationInMinutes:  60,
                            });
                        }
                    });
                    return;
                }
            filesArr.forEach((item, i) => {
                if (TimeEntryStore.values) {
                    TimeEntryStore.values.files.push({
                        filename: item || '',
                        description: '',
                        durationInMinutes:  60,
                    });
                }
            });
        }
    }

    @action
    public removeFile = (index: number) => {
        if (TimeEntryStore.values) {
            TimeEntryStore.values.isModified = true;
            TimeEntryStore.values.files = [
                ...TimeEntryStore.values.files.slice(0, index),
                ...TimeEntryStore.values.files.slice(index + 1),
            ];
        }
    };

    @action
    public setProjectCampaignSpotVersionId = (values: ProjectPickerValues | null) => {
        if (TimeEntryStore.values) {
            TimeEntryStore.values.isModified = true;

            TimeEntryStore.values.projectPicked = {
                project:
                    values !== null
                        ? values.project
                        ? {
                            id: values.project.id,
                            name: values.project.name,
                        }
                        : null
                        : null,
                projectCampaign:
                    values !== null
                        ? values.projectCampaign
                        ? {
                            id: values.projectCampaign.id,
                            campaignId: values.projectCampaign.campaignId,
                            name: values.projectCampaign.name,
                        }
                        : null
                        : null,
                spot:
                    values !== null
                        ? values.spot
                        ? {
                            id: values.spot.id,
                            name: values.spot.name,
                        }
                        : null
                        : null,
                version:
                    values !== null
                        ? values.version
                        ? {
                            id: values.version.id,
                            name: values.version.name,
                        }
                        : null
                        : null,
                customerId: values !== null ? values.customerId : null,
            };
        }
    };

    @action
    public setDescription = (text: string) => {
        if (TimeEntryStore.values) {
            TimeEntryStore.values.isModified = true;
            TimeEntryStore.values.description = text;
        }
    };

    @action
    public setCurrentViewToWeek = (forUser: TimeEntryUserWithType, anyDateFromTheWeek: Date) => {
        if (new Date(anyDateFromTheWeek).getTime() > new Date().getTime() + 60 + 1000) {
            return;
        }
        anyDateFromTheWeek = typeof anyDateFromTheWeek !== 'undefined' ? anyDateFromTheWeek : new Date();

        const firstSunday = dateSetDayOfTheWeek(anyDateFromTheWeek, 0);
        const lastSaturday = dateSetDayOfTheWeek(anyDateFromTheWeek, 6);

        TimeEntryStore.viewEntriesFromDay = firstSunday;
        TimeEntryStore.viewEntriesTilDay = lastSaturday;
        TimeEntryStore.viewEntriesOfUser = forUser;

        this.fetchTimeEntriesOfUser(forUser, firstSunday, lastSaturday);
    };

    @action
    public setCurrentViewToDay = (forUser: TimeEntryUserWithType, date: Date) => {
        date = typeof date !== 'undefined' ? date : new Date();

        TimeEntryStore.viewEntriesFromDay = date;
        TimeEntryStore.viewEntriesTilDay = date;
        TimeEntryStore.viewEntriesOfUser = forUser;

        this.fetchTimeEntriesOfUser(forUser, date);
    };

    @action
    public showModalDamper = () => {
        TimeEntryStore.isModalDamperVisible = true;
    }

    @action
    public hideModalDamper = () => {
        TimeEntryStore.isModalDamperVisible = false;
    }

    @action
    public setEntryStartDate = (forUser: TimeEntryUserWithType, startDate: Date, resetValues: boolean = false) => {
        const now = new Date();
        const nowMinutes = dateGetMinutes(now);
        const nowHours = dateGetHours(now);
        const manipulatedNowHours = nowHours - (nowHours >= 1 ? 1 : 0);
        startDate = dateSetMinutes(dateSetHours(startDate, manipulatedNowHours), nowMinutes);

        const startMinutes = this.getClosestToIncrementHour(startDate);
        const endMinutes = startMinutes + TimeEntryStore.defaultDuration;

        const totalMinutes = this.alignEnteredToClosestEmptySlot(startMinutes, endMinutes, forUser, startDate);

        if (TimeEntryStore.values !== null) {
            if (resetValues) {
                TimeEntryStore.values.isModified = false;
                TimeEntryStore.values.forUser = null;
                TimeEntryStore.values.editingEntryId = null;
                TimeEntryStore.values.userKnowsTheProject = null;
                TimeEntryStore.values.activityId = null;
                TimeEntryStore.values.description = null;
                TimeEntryStore.values.projectPicked = null;
                TimeEntryStore.values.files = [];
            }

            TimeEntryStore.values.startDate = startDate;
            TimeEntryStore.values.startTimeInMinutes = totalMinutes.startTimeInMinutes;
            TimeEntryStore.values.endTimeInMinutes = totalMinutes.endTimeInMinutes;
        } else {
            TimeEntryStore.values = {
                isModified: false,
                forUser: forUser,
                editingEntryId: null,
                startDate: startDate,
                userKnowsTheProject: null,
                activityId: null,
                startTimeInMinutes: totalMinutes.startTimeInMinutes,
                endTimeInMinutes: totalMinutes.endTimeInMinutes,
                description: null,
                projectPicked: null,
                files: [],
            };
        }
    };

    @action
    public setEntryStartTime = (totalMinutes: number) => {
        if (TimeEntryStore.values !== null) {
            const delta = totalMinutes - TimeEntryStore.values.startTimeInMinutes;
            let newEndTime = TimeEntryStore.values.endTimeInMinutes + delta;

            // if ( totalMinutes > 1440) {
            //     return;
            // }
            // if ( totalMinutes > 1440 + 720 || totalMinutes < 0) {
            //     return;
            // }
           
            if ( newEndTime > 1440 ) {
                // let diff = Math.floor(newEndTime / 1440);
                // newEndTime -= diff * 1440;
                // totalMinutes -= diff * 1440; 
                newEndTime -= 720;
                totalMinutes -= 720;
            }
                TimeEntryStore.values.isModified = true;
                TimeEntryStore.values.startTimeInMinutes = totalMinutes;
                TimeEntryStore.values.endTimeInMinutes = newEndTime;
        }
    };

    @action
    public setEntryEndTime = (totalMinutes: number) => {
        if (TimeEntryStore.values !== null) {
            // const delta = totalMinutes - TimeEntryStore.values.endTimeInMinutes;
            // let newStartTime = TimeEntryStore.values.startTimeInMinutes + delta;
            // if (newStartTime < 0) {
            //     newStartTime += 720;
            //     totalMinutes += 720;
            // }
            // if (totalMinutes <= TimeEntryStore.values.startTimeInMinutes) {
            //     return;
            // } 
            if (totalMinutes > 1440) {
                return; 
            }
                TimeEntryStore.values.isModified = true;
                // TimeEntryStore.values.startTimeInMinutes = newStartTime;
                TimeEntryStore.values.endTimeInMinutes = totalMinutes;
        }
    };

    @action
    public setEntryDuration = (duration: number) => {
        if (TimeEntryStore.values !== null) {
            if (TimeEntryStore.values.startTimeInMinutes + duration > 1440) {
                this.showErrorMessage(`End time cannot be after end of the day`);
            } else {
                TimeEntryStore.values.isModified = true;
                TimeEntryStore.values.endTimeInMinutes = TimeEntryStore.values.startTimeInMinutes + duration;
            }
        }
    };

    public getUserTimeEntryForDay = (forUser: TimeEntryUserWithType, date: Date): TimeEntryCalendarDay | null => {
        const entriesKey = forUser.id + '-' + dateFormat(date, 'YYYY-MM-DD');
        return typeof TimeEntryStore.entriesForDay[entriesKey] !== 'undefined'
            ? TimeEntryStore.entriesForDay[entriesKey]
            : null;
    };

    @action
    private showErrorMessage = (message: string) => {
        TimeEntryStore.error.message = message;
        TimeEntryStore.error.show = true;
    };

    private splitEntryDurationAndCalculateHoursFloat = (duration: string): number => {
        const splitDuration = duration.split('.');
        const durationHours = unformat(splitDuration[0]);
        const durationMinutes = splitDuration.length >= 2 ? unformat(splitDuration[1]) / 60 : 0;
        return durationHours + durationMinutes;
    };

    private getClosestToIncrementHour = (date: Date): number => {
        const { durationIncrements } = TimeEntryStore;

        let totalMinutes: number = 0;

        // Minutes
        const minutes = dateGetMinutes(date);
        totalMinutes = dateGetHours(date) * 60 + minutes;

        // Difference
        const difference = minutes % durationIncrements;

        if (difference > 0) {
            totalMinutes -= difference;
        }

        return totalMinutes;
    };

    private alignEnteredToClosestEmptySlot = (
        startTimeInMinutes: number,
        endTimeInMinutes: number,
        forUser: TimeEntryUserWithType,
        date: Date
    ): { startTimeInMinutes: number; endTimeInMinutes: number } => {
        const { durationIncrements } = TimeEntryStore;

        // Difference
        const startTimeIncrementDifference = startTimeInMinutes % durationIncrements;
        if (startTimeIncrementDifference > 0) {
            startTimeInMinutes = startTimeInMinutes - startTimeIncrementDifference;

            const endTimeIncrementDifference = (endTimeInMinutes - startTimeInMinutes) % durationIncrements;
            if (endTimeIncrementDifference > 0) {
                endTimeInMinutes = endTimeInMinutes - endTimeIncrementDifference;
            }
        }

        // Check if time is overlapping
        const day = this.getUserTimeEntryForDay(forUser, date);
        let isOverlappingOtherEntry: boolean = false;
        do {
            isOverlappingOtherEntry = this.doesTimeBlockOverlapExistingTimeEntries(
                startTimeInMinutes,
                endTimeInMinutes,
                day !== null ? day.timeEntries : []
            );

            if (isOverlappingOtherEntry) {
                startTimeInMinutes += durationIncrements;
                endTimeInMinutes += durationIncrements;
            }
        } while (isOverlappingOtherEntry);

        return {
            startTimeInMinutes,
            endTimeInMinutes,
        };
    };

    private doesTimeBlockOverlapExistingTimeEntries = (
        fromTotalMinutes: number,
        tilTotalMinutes: number,
        existingEntries: TimeEntryCalendarEntry[]
    ) => {
        // Check if day has any existing entries
        if (existingEntries) {
            return existingEntries.findIndex(
                entry => {
                    const startTimeInMinutes = dateGetHours(entry.startDate) * 60 + dateGetMinutes(entry.startDate);
                    const endTimeInMinutes = startTimeInMinutes + entry.hours * 60;

                    return Math.max(
                        fromTotalMinutes, startTimeInMinutes) - Math.min(tilTotalMinutes, endTimeInMinutes
                    ) < 0;
                }
            ) !== -1;
        }

        return false;
    };
}
