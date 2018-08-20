import { observable, computed } from 'mobx';
import { Activity, ActivityType } from 'types/activities';

export class Activities {
    @observable public activitiesLoading: boolean = false;
    @observable public activitiesLastFetchTimestamp: number = 0;
    @observable public activities: Activity[] = [];

    @observable public activitiesTypesLoading: boolean = false;
    @observable public activitiesTypesLastFetchTimestamp: number = 0;
    @observable public activitiesTypes: ActivityType[] = [];

    @observable public filterActivitiesBySearch: string = '';
    @observable public filterActivitiesByTypeId: number | null = null;

    @computed
    private get filterActivitiesBySearchFormatted(): string {
        return this.filterActivitiesBySearch.toLowerCase().trim();
    }

    @computed
    public get filteredActivities(): Activity[] {
        return this.activities.filter(
            a =>
                this.filterActivitiesByTypeId !== null
                    ? a.typeId === this.filterActivitiesByTypeId
                    : true && this.filterActivitiesBySearchFormatted.length > 0
                        ? a.name.toLowerCase().indexOf(this.filterActivitiesBySearchFormatted) !== -1
                        : true
        );
    }
}
