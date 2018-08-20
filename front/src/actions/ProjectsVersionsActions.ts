import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { ProjectsVersionsStore } from 'store/AllStores';
import { ProjectVersionFromApi, ProjectVersionCreateFromApi, ProjectVersionStatus } from 'types/projectVersions';
import { DateHandler } from 'helpers/DateHandler';

export class ProjectsVersionsActionsClass {
    @action
    public fetchAllStandardVersions = async (): Promise<boolean> => {
        try {
            // Indicate loading
            ProjectsVersionsStore.loadingStandardVersions = true;

            // Fetch versions
            const versions = (await API.getData(APIPath.VERSION, {
                custom: 0,
                offset: 0,
                length: 99999,
            })) as ProjectVersionFromApi[];

            // Update versions store state
            ProjectsVersionsStore.loadingStandardVersions = false;
            ProjectsVersionsStore.allStandardVersions = versions.map(version => ({
                value: version.id,
                label: version.versionName,
                isCustom: false,
            }));

            return true;
        } catch (error) {
            // Retry
            setTimeout(() => {
                this.fetchAllStandardVersions();
            }, 1024);
            throw error;
        }
    };

    @action
    public fetchAllCustomVersions = async (): Promise<boolean> => {
        try {
            // Indicate loading
            ProjectsVersionsStore.loadingCustomVersions = true;

            // Fetch versions
            const versions = (await API.getData(APIPath.VERSION, {
                custom: 1,
                offset: 0,
                length: 99999,
            })) as ProjectVersionFromApi[];

            // Update versions store state
            ProjectsVersionsStore.loadingCustomVersions = false;
            ProjectsVersionsStore.allCustomVersions = versions.map(version => ({
                value: version.id,
                label: version.versionName,
                isCustom: true,
            }));

            return true;
        } catch (error) {
            // Retry
            setTimeout(() => {
                this.fetchAllCustomVersions();
            }, 1024);
            throw error;
        }
    };

    @action
    public createNewVersion = async (
        versionName: string,
        customSpotId?: number
    ): Promise<{ id: number; name: string }> => {
        try {
            const newVersion = (await API.postData(APIPath.VERSION, {
                name: versionName,
                ...(customSpotId
                    ? {
                          spot_id: customSpotId,
                          custom: 1,
                      }
                    : {}),
            })) as ProjectVersionCreateFromApi;

            if (customSpotId) {
                ProjectsVersionsStore.allCustomVersions.push({
                    value: newVersion.version.id,
                    label: newVersion.version.versionName,
                    isCustom: true,
                });
            } else {
                ProjectsVersionsStore.allStandardVersions.push({
                    value: newVersion.version.id,
                    label: newVersion.version.versionName,
                    isCustom: false,
                });
            }

            return {
                id: newVersion.version.id,
                name: newVersion.version.versionName,
            };
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchAllVersionStatuses = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (ProjectsVersionsStore.allVersionStatusesLoading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                        15,
                        ProjectsVersionsStore.allVersionsLastFetchTimestamp
                    ))
            ) {
                ProjectsVersionsStore.allVersionStatusesLoading = true;

                const statuses = (await API.getData(APIPath.VERSION_STATUS, {
                    offset: 0,
                    length: 999999,
                })) as ProjectVersionStatus[];

                ProjectsVersionsStore.allVersionStatuses = statuses;
                ProjectsVersionsStore.allVersionStatusesLoading = false;
                ProjectsVersionsStore.allVersionsLastFetchTimestamp = Date.now();
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchAllVersionStatuses(true);
            }, 1024);
            throw error;
        }
    };
}
