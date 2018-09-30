import { observable, computed, reaction } from 'mobx';
import { ProjectVersion, ProjectVersionStatus } from 'types/projectVersions';
import { ProjectsDetailsActions } from '../actions';

export class ProjectVersions {
    @observable public loadingStandardVersions: boolean = false;
    @observable public allStandardVersions: ProjectVersion[] = [];

    @observable public loadingCustomVersions: boolean = false;
    @observable public allCustomVersions: ProjectVersion[] = [];

    @observable public allVersionStatusesLoading: boolean = false;
    @observable public allVersionsLastFetchTimestamp: number = 0;
    @observable public allVersionStatuses: ProjectVersionStatus[] = [];

    @observable public filterVersionStatus: ProjectVersionStatus = {
        id: null,
        name: 'No status'
    };

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

    constructor() {
        // React to version status change
        reaction(
            () => this.filterVersionStatus,
            clientFilter => {
                ProjectsDetailsActions.applyFilterByVersionStatus(this.filterVersionStatus);
            }
        );
    }
}
