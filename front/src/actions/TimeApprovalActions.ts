import * as dateFormat from 'date-fns/format';
import * as dateSubDays from 'date-fns/sub_days';
import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { TimeEntryStatus, TimeEntryFromApi, TimeEntryUser, TimeEntryProject } from 'types/timeEntry';
import { TimeApprovalFilterType } from 'types/timeApproval';
import { TimeApprovalStore } from 'store/AllStores';
import { DateHandler } from 'helpers/DateHandler';

export class TimeApprovalActionsClass {
    @action
    public fetchTimeEntriesPendingReview = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, TimeApprovalStore.allTimeEntriesLastFetchTimestamp)
            ) {
                TimeApprovalStore.allTimeEntriesLoading = true;

                let entriesForDate: Date | null = null;
                if (TimeApprovalStore.filters.daysAgo !== null) {
                    const now = Date();
                    entriesForDate = dateSubDays(now, TimeApprovalStore.filters.daysAgo);
                }

                const response = (await API.getData(APIPath.TIME_ENTRY, {
                    offset: 0,
                    length: 9999999,
                    exclude_user_time_entry: 1,
                    status: TimeEntryStatus.UnderReview,
                    ...(TimeApprovalStore.filters.project !== null
                        ? {
                              project_id: TimeApprovalStore.filters.project.id,
                          }
                        : {}),
                    ...(TimeApprovalStore.filters.user !== null
                        ? {
                              user_id: TimeApprovalStore.filters.user.id,
                          }
                        : {}),
                    ...(entriesForDate !== null
                        ? {
                              start_date: dateFormat(entriesForDate, 'YYYY-MM-DD'),
                              end_date: dateFormat(entriesForDate, 'YYYY-MM-DD'),
                          }
                        : {}),
                })) as TimeEntryFromApi[];

                TimeApprovalStore.allTimeEntries = response;
                TimeApprovalStore.allTimeEntriesLoading = false;
                TimeApprovalStore.allTimeEntriesLastFetchTimestamp = Date.now();

                if (TimeApprovalStore.isUsingFilters === false) {
                    this.setUsersFromAllTimeEntries(response);
                    this.setProjectsFromAllTimeEntries(response);
                }
            }

            return true;
        } catch (error) {
            TimeApprovalStore.allTimeEntriesLoading = false;
            throw error;
        }
    };

    @action
    public changeTimeEntriesFilter = (type: TimeApprovalFilterType, value: number | null) => {
        if (type === 'userId') {
            if (value === null) {
                TimeApprovalStore.filters.user = null;
            } else {
                const user = TimeApprovalStore.allTimeEntriesUsers.find(u => u.userId === value);
                if (user) {
                    TimeApprovalStore.filters.user = {
                        id: user.userId,
                        name: this.constructUserName(user),
                    };
                } else {
                    TimeApprovalStore.filters.user = null;
                }
            }
        } else if (type === 'project') {
            if (value === null) {
                TimeApprovalStore.filters.project = null;
            } else {
                const project = TimeApprovalStore.allTimeEntriesProjects.find(p => p.projectId === value);
                if (project) {
                    TimeApprovalStore.filters.project = {
                        id: project.projectId!,
                        name: project.projectName
                            ? project.projectName
                            : project.projectId
                                ? project.projectId.toString()
                                : '',
                    };
                } else if (value === 1) {
                    TimeApprovalStore.filters.project = {
                        id: 0,
                        name: 'Internal activities',
                    };
                } else {
                    TimeApprovalStore.filters.project = null;
                }
            }
            TimeApprovalStore.filters.project =
                value === null
                    ? null
                    : {
                          id: value,
                          name: name,
                      };
        } else if (type === 'daysAgo') {
            TimeApprovalStore.filters.daysAgo = value;
        }
    };

    @action
    public deleteEntryFromFetchedEntries = (entryId: number) => {
        const entryIndex = TimeApprovalStore.allTimeEntries.findIndex(entry => entry.id === entryId);
        if (entryIndex !== -1) {
            TimeApprovalStore.allTimeEntries = [
                ...TimeApprovalStore.allTimeEntries.slice(0, entryIndex),
                ...TimeApprovalStore.allTimeEntries.slice(entryIndex + 1),
            ];
        }
    };

    @action
    public approveDay = async (entriesIds: number[]): Promise<boolean> => {
        try {
            await API.postData(APIPath.TIME_ENTRY_APPROVE, {
                ids: JSON.stringify(entriesIds),
                status: TimeEntryStatus.Approved,
            });

            await this.fetchTimeEntriesPendingReview(true);

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public setUsersFromAllTimeEntries = (allTimeEntries: TimeEntryFromApi[]) => {
        const object: { [userId: number]: TimeEntryUser } = allTimeEntries.reduce(
            (users: { [userId: number]: TimeEntryUser }, user) => {
                if (typeof users[user.userId] === 'undefined') {
                    users[user.userId] = {
                        userId: user.userId,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        initials: user.initials,
                    };
                }

                return users;
            },
            {}
        );

        TimeApprovalStore.allTimeEntriesUsers = Object.keys(object).map(key => {
            if (object.hasOwnProperty(key)) {
                return object[key];
            }
        });
    };

    @action
    public setProjectsFromAllTimeEntries = (allTimeEntries: TimeEntryFromApi[]) => {
        const object: { [projectId: number]: TimeEntryProject } = allTimeEntries.reduce(
            (projects: { [projectId: number]: TimeEntryProject }, project) => {
                if (project.projectId !== null && typeof projects[project.projectId] === 'undefined') {
                    projects[project.projectId] = {
                        projectId: project.projectId,
                        projectName: project.projectName,
                    };
                }

                return projects;
            },
            {}
        );

        TimeApprovalStore.allTimeEntriesProjects = Object.keys(object).map(key => {
            if (object.hasOwnProperty(key)) {
                return object[key];
            }
        });
    };

    public constructUserName = (user: TimeEntryUser): string => {
        return user.firstName || user.lastName
            ? (user.initials ? '(' + user.initials + ') ' : '') + [user.firstName, user.lastName].join(' ')
            : user.username;
    };
}
