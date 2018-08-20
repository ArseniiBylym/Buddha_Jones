import { observable, computed } from 'mobx';
import { TimeEntryFromApi, TimeEntryUser, TimeEntryProject } from 'types/timeEntry';

export class TimeApproval {
    @observable
    public filters: {
        project: {
            id: number;
            name: string;
        } | null;
        user: {
            id: number;
            name: string;
        } | null;
        daysAgo: number | null;
    } = {
        project: null,
        user: null,
        daysAgo: null,
    };

    @computed
    public get isUsingFilters(): boolean {
        return this.filters.project !== null || this.filters.daysAgo !== null || this.filters.user !== null;
    }

    @observable public allTimeEntries: TimeEntryFromApi[] = [];
    @observable public allTimeEntriesLoading: boolean = false;
    @observable public allTimeEntriesLastFetchTimestamp: number = 0;

    @observable public allTimeEntriesUsers: TimeEntryUser[] = [];
    @observable public allTimeEntriesProjects: TimeEntryProject[] = [];
}
