import * as dateIsSameDay from 'date-fns/is_same_day';
import * as dateGetDatesFromPeriod from 'date-fns/each_day';
import * as dateFormat from 'date-fns/format';
import padStart from 'lodash-es/padStart';
import { observable, computed, reaction, toJS } from 'mobx';
import { TimeEntryCalendarDay, TimeEntryUserWithType } from 'types/timeEntry';
import { Activity } from 'types/activities';
import { ActivitiesStore } from './AllStores';
import { ProjectPickerValues } from 'components/Buddha';

export type TimeIncrements = 1 | 2 | 5 | 10 | 15 | 20 | 30;

export class TimeEntry {
    @observable
    public error: {
        message: string;
        show: boolean;
    } = {
        message: '',
        show: false,
    };

    @observable
    public minimumHoursNotMetModal: {
        show: boolean;
        minHours: number;
    } = {
        show: false,
        minHours: 0,
    };

    @observable
    public lunchBreakNotTakenModal: {
        show: boolean;
        forUser: TimeEntryUserWithType | null;
        minUserHours: number;
        dayIndex: number;
    } = {
        show: false,
        forUser: null,
        minUserHours: 0,
        dayIndex: -1,
    };

    @observable
    public editsWillGetLostModal: {
        show: boolean;
        forUser: TimeEntryUserWithType | null;
        dayIndex: number;
    } = {
        show: false,
        forUser: null,
        dayIndex: -1,
    };

    @observable
    public lastFetch: {
        userId: number;
        userTypeId: number;
        userTypeName: string;
        fromDate: Date;
        tilDate: Date;
        fetchTimeStamp: number;
    } = {
        userId: 0,
        userTypeId: 0,
        userTypeName: '',
        fromDate: new Date(),
        tilDate: new Date(),
        fetchTimeStamp: 0,
    };

    @observable public durationIncrements: TimeIncrements = 15;
    @observable public defaultDuration: number = 60;

    @observable public viewEntriesOfUser: TimeEntryUserWithType | null = null;
    @observable public viewEntriesFromDay: Date | null = null;
    @observable public viewEntriesTilDay: Date | null = null;

    @computed
    public get viewSingleDayOnly(): boolean {
        if (this.viewEntriesFromDay === null || this.viewEntriesTilDay === null) {
            return false;
        }

        return dateIsSameDay(this.viewEntriesFromDay, this.viewEntriesTilDay);
    }

    @observable
    public entriesForDay: {
        [userIdAndDay: string]: TimeEntryCalendarDay;
    } = {};

    @observable
    public values: {
        isModified: boolean;
        forUser: TimeEntryUserWithType | null;
        editingEntryId: number | null;
        userKnowsTheProject: boolean | null;
        startDate: Date;
        startTimeInMinutes: number;
        endTimeInMinutes: number;
        activityId: number | null;
        description: string | null;
        projectPicked: ProjectPickerValues | null;
        files: Array<{
            filename: string;
            description: string;
            durationInMinutes: number;
        }>;
    } | null = null;

    @computed
    public get startTimeInMinutes(): number {
        return this.values ? this.values.startTimeInMinutes : 0;
    }

    public set startTimeInMinutes(time: number) {
        console.log('time - ', time);
        if (this.values) {
            console.log('start time -', this.values.startTimeInMinutes);
            console.log('end time -', this.values.endTimeInMinutes);
            this.values.startTimeInMinutes = time;
        }
    }

    public changeStartTimeReaction = reaction (
            () => {
                if (this.values) {
                    return this.values.startTimeInMinutes;
                } else {
                    return null;
                }
            },
            minutes => {
                if (this.values && minutes) {
                    console.log(minutes) 
                    this.values.endTimeInMinutes = this.values.startTimeInMinutes + 180;
                }
            }
    );

    @computed
    public get endTimeInMinutes(): number {
        return this.values ? this.values.endTimeInMinutes : 0;
    }

    public set endTimeInMinutes(time: number) {
        if (this.values) {
            this.values.endTimeInMinutes = time;
        }
    }

    @computed
    public get durationInMinutes(): number {
        return this.values ? this.values.endTimeInMinutes - this.values.startTimeInMinutes : 0;
    }

    public set durationInMinutes(duration: number) {
        if (this.values) {
            this.values.endTimeInMinutes = this.values.startTimeInMinutes + duration;
        }
    }

    @computed
    public get selectedDay(): TimeEntryCalendarDay | null {
        return (
            this.viewDays.find(day => {
                if (this.values) {
                    return dateIsSameDay(day.date, this.values.startDate);
                }

                return false;
            }) || null
        );
    }

    @computed
    public get selectedActivity(): Activity | null {
        if (this.values && this.values.activityId !== null) {
            return (
                ActivitiesStore.activities.find(a => (this.values ? this.values.activityId === a.id : false)) || null
            );
        }

        return null;
    }

    @computed
    public get viewDays(): TimeEntryCalendarDay[] {
        if (this.viewEntriesOfUser === null || this.viewEntriesFromDay === null || this.viewEntriesTilDay === null) {
            return [];
        }

        const dates = dateGetDatesFromPeriod(this.viewEntriesFromDay, this.viewEntriesTilDay);
        if (dates == null || dates.length <= 0) {
            return [];
        }

        return dates.map(date => {
            const dateName = dateFormat(date, 'YYYY-MM-DD');
            const dayKey = (this.viewEntriesOfUser ? this.viewEntriesOfUser.id : 0) + '-' + dateName;

            let day: TimeEntryCalendarDay | null =
                typeof this.entriesForDay[dayKey] !== 'undefined' ? this.entriesForDay[dayKey] : null;

            if (day === null) {
                day = {
                    date,
                    userId: this.viewEntriesOfUser ? this.viewEntriesOfUser.id : 0,
                    userTypeId: this.viewEntriesOfUser ? this.viewEntriesOfUser.typeId : 0,
                    userTypeName: this.viewEntriesOfUser ? this.viewEntriesOfUser.typeName : '',
                    isDayLoading: true,
                    isDayApproved: false,
                    isDayClosed: false,
                    timeEntries: [],
                };
            }

            return day;
        });
    }

    @computed
    public get viewTimeline(): Array<{ totalMinutes: number; hour: string; minutes: string }> {
        const timeline: any = [];

        for (let t = 0; t < 24; t++) {
            let hour: any = {
                totalMinutes: t * 60,
                hour: padStart(t.toString(), 2, '0'),
                minutes: '00',
            };

            if (t === 0) {
                hour.hour = '12';
                hour.minutes = 'AM';
            } else if (t > 0 && t < 12) {
                hour.minutes = 'AM';
            } else if (t === 12) {
                hour.minutes = 'PM';
            } else {
                hour.hour = padStart((t - 12).toString(), 2, '0');
                hour.minutes = 'PM';
            }

            timeline.push(hour);
        }

        return timeline;
    }

    constructor() {
        // Hide error messages after certain period of time
        reaction(
            () => this.error.message,
            msg => {
                const copy = toJS(msg);
                setTimeout(() => {
                    if (copy === this.error.message && this.error.show) {
                        this.error.show = false;
                    }
                }, 1024 * 10);
            }
        );

        // Hide error messages after certain period of time
        reaction(
            () => this.error.show,
            showError => {
                const copy = toJS(showError);
                setTimeout(() => {
                    if (this.error.show && this.error.show === copy) {
                        this.error.show = false;
                    }
                }, 1024 * 10);
            }
        );
    }
}
