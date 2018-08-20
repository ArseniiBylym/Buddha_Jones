import { observable, computed } from 'mobx';
import { ProjectVersion, ProjectVersionStatus } from 'types/projectVersions';

export class ProjectVersions {
    @observable public loadingStandardVersions: boolean = false;
    @observable public allStandardVersions: ProjectVersion[] = [];

    @observable public loadingCustomVersions: boolean = false;
    @observable public allCustomVersions: ProjectVersion[] = [];

    @observable public allVersionStatusesLoading: boolean = false;
    @observable public allVersionsLastFetchTimestamp: number = 0;
    @observable public allVersionStatuses: ProjectVersionStatus[] = [];

    @computed
    public get areStandardVersionsLoading(): boolean {
        return this.loadingStandardVersions && this.allStandardVersions.length <= 0;
    }

    @computed
    public get areStandardVersionsUpdating(): boolean {
        return this.loadingStandardVersions && this.allStandardVersions.length > 0;
    }

    @computed
    public get areCustomVersionsLoading(): boolean {
        return this.loadingCustomVersions && this.allCustomVersions.length <= 0;
    }

    @computed
    public get areCustomVersionsUpdating(): boolean {
        return this.loadingCustomVersions && this.allCustomVersions.length > 0;
    }
}
