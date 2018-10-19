import { action } from 'mobx';
import { ProjectsCampaignsSpotsStore } from 'store/AllStores';
import { DateHandler } from 'helpers/DateHandler';
import { API, APIPath } from 'fetch';
import {
    ProjectsResult,
    CampaignsResult,
    SpotsResult,
    VersionsResult,
    ProjectsResultsRawApiResponse,
    CampaignsResultsRawApiResponse,
    SpotsResultsRawApiResponse,
    VersionsResultsRawApiResponse,
} from 'types/projectsCampaignsSpots';

export class ProjectsCampaignsSpotsActionsClass {
    private resultsExpirationInMinutes: number = 5;

    @action
    public removeFetchedProjectsCampaignsAndSpotsOfUser = (userId: number) => {
        let { projects, campaigns, spots, versions } = ProjectsCampaignsSpotsStore;

        // Remove logged in user's projects data
        let projectDataIndex: number = -1;
        do {
            projectDataIndex = projects.findIndex(p => p.userId === userId);
            if (projectDataIndex !== -1) {
                projects = [...projects.slice(0, projectDataIndex), ...projects.slice(projectDataIndex + 1)];
            }
        } while (projectDataIndex !== -1);

        // Remove logged in user's campaigns data
        let campaignDataIndex: number = -1;
        do {
            campaignDataIndex = campaigns.findIndex(c => c.userId === userId);
            if (campaignDataIndex !== -1) {
                campaigns = [...campaigns.slice(0, campaignDataIndex), ...campaigns.slice(campaignDataIndex + 1)];
            }
        } while (campaignDataIndex !== -1);

        // Remove logged in user's spots data
        let spotDataIndex: number = -1;
        do {
            spotDataIndex = spots.findIndex(s => s.userId === userId);
            if (spotDataIndex !== -1) {
                spots = [...spots.slice(0, spotDataIndex), ...spots.slice(spotDataIndex + 1)];
            }
        } while (spotDataIndex !== -1);

        // Remove logged in user's versions data
        let versionDataIndex: number = -1;
        do {
            versionDataIndex = versions.findIndex(v => v.userId === userId);
            if (versionDataIndex !== -1) {
                versions = [...versions.slice(0, versionDataIndex), ...versions.slice(versionDataIndex + 1)];
            }
        } while (versionDataIndex !== -1);
    };

    @action
    public fetchProjects = async (
        userId: number,
        search: string,
        page: number,
        resultsPerPage: number,
        forceFetch: boolean = false
    ): Promise<boolean> => {
        try {
            search = this.prepareSearchQuery(search);

            let projectData = this.getProjectResult(userId, search, page);
            if (projectData === null) {
                ProjectsCampaignsSpotsStore.projects.push({
                    userId: userId,
                    search: search,
                    page: page,
                    totalCountOfResults: 0,
                    lastFetchTimestamp: 0,
                    isLoading: false,
                    results: [],
                });
                projectData = ProjectsCampaignsSpotsStore.projects[ProjectsCampaignsSpotsStore.projects.length - 1];
            }

            const doFetch: boolean =
                forceFetch ||
                DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                    this.resultsExpirationInMinutes,
                    projectData.lastFetchTimestamp
                );

            if (doFetch) {
                projectData.isLoading = true;

                const response = (await API.getData(
                    APIPath.PROJECT,
                    {
                        search,
                        offset: this.prepareOffset(page, resultsPerPage),
                        length: resultsPerPage,
                    },
                    false
                )) as ProjectsResultsRawApiResponse;

                projectData.totalCountOfResults = response.data.total_count;
                projectData.results = response.data.data;
                projectData.lastFetchTimestamp = Date.now();
                projectData.isLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchProjects(userId, search, page, resultsPerPage, true);
            }, 1024);

            throw error;
        }
    };

    @action
    public fetchCampaigns = async (
        userId: number,
        projectId: number | null,
        search: string,
        page: number,
        resultsPerPage: number,
        forceFetch: boolean = false
    ): Promise<boolean> => {
        try {
            search = this.prepareSearchQuery(search);

            let campaignData = this.getCampaignResult(userId, projectId, search, page);
            if (campaignData === null) {
                ProjectsCampaignsSpotsStore.campaigns.push({
                    projectId: projectId,
                    userId: userId,
                    search: search,
                    page: page,
                    totalCountOfResults: 0,
                    lastFetchTimestamp: 0,
                    isLoading: false,
                    results: [],
                });
                campaignData = ProjectsCampaignsSpotsStore.campaigns[ProjectsCampaignsSpotsStore.campaigns.length - 1];
            }

            const doFetch: boolean =
                forceFetch ||
                DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                    this.resultsExpirationInMinutes,
                    campaignData.lastFetchTimestamp
                );

            if (doFetch) {
                campaignData.isLoading = true;

                const response = (await API.getData(
                    projectId === null ? APIPath.CAMPAIGN : APIPath.PROJECT_CAMPAIGN,
                    {
                        project_id: projectId,
                        search,
                        offset: this.prepareOffset(page, resultsPerPage),
                        length: resultsPerPage,
                    },
                    false
                )) as CampaignsResultsRawApiResponse;

                campaignData.totalCountOfResults = response.data.total_count;
                campaignData.results = response.data.data;
                campaignData.lastFetchTimestamp = Date.now();
                campaignData.isLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchCampaigns(userId, projectId, search, page, resultsPerPage, true);
            }, 1024);

            throw error;
        }
    };

    @action
    public fetchSpots = async (
        userId: number,
        ids: {
            projectId: number | null;
            projectCampaignId: number | null;
        } | null,
        search: string,
        page: number,
        resultsPerPage: number,
        forceFetch: boolean = false
    ): Promise<boolean> => {
        try {
            search = this.prepareSearchQuery(search);

            let spotData = this.getSpotResult(userId, ids, search, page);
            if (spotData === null) {
                ProjectsCampaignsSpotsStore.spots.push({
                    projectId: ids ? ids.projectId : null,
                    projectCampaignId: ids ? ids.projectCampaignId : null,
                    userId: userId,
                    search: search,
                    page: page,
                    totalCountOfResults: 0,
                    lastFetchTimestamp: 0,
                    isLoading: false,
                    results: [],
                });
                spotData = ProjectsCampaignsSpotsStore.spots[ProjectsCampaignsSpotsStore.spots.length - 1];
            }

            const doFetch: boolean =
                forceFetch ||
                DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                    this.resultsExpirationInMinutes,
                    spotData.lastFetchTimestamp
                );

            if (doFetch) {
                spotData.isLoading = true;

                const response = (await API.getData(
                    APIPath.SPOT,
                    {
                        project_id: ids ? ids.projectId : null,
                        campaign_id: ids ? ids.projectCampaignId : null,
                        search,
                        offset: this.prepareOffset(page, resultsPerPage),
                        length: resultsPerPage,
                    },
                    false
                )) as SpotsResultsRawApiResponse;

                spotData.totalCountOfResults = response.data.total_count;
                spotData.results = response.data.data;
                spotData.lastFetchTimestamp = Date.now();
                spotData.isLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchSpots(userId, ids, search, page, resultsPerPage, true);
            }, 1024);

            throw error;
        }
    };

    @action
    public fetchVersions = async (
        userId: number,
        ids: {
            projectId: number | null;
            projectCampaignId: number | null;
            spotId: number | null;
        } | null,
        search: string,
        page: number,
        resultsPerPage: number,
        forceFetch: boolean = false
    ): Promise<boolean> => {
        try {
            search = this.prepareSearchQuery(search);

            let versionData = this.getVersionResult(userId, ids, search, page);
            if (versionData === null) {
                ProjectsCampaignsSpotsStore.versions.push({
                    projectId: ids ? ids.projectId : null,
                    projectCampaignId: ids ? ids.projectCampaignId : null,
                    spotId: ids ? ids.spotId : null,
                    userId: userId,
                    search: search,
                    page: page,
                    totalCountOfResults: 0,
                    lastFetchTimestamp: 0,
                    isLoading: false,
                    results: [],
                });
                versionData = ProjectsCampaignsSpotsStore.versions[ProjectsCampaignsSpotsStore.versions.length - 1];
            }

            const doFetch: boolean =
                forceFetch ||
                DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                    this.resultsExpirationInMinutes,
                    versionData.lastFetchTimestamp
                );

            if (doFetch) {
                versionData.isLoading = true;

                const response = (await API.getData(
                    APIPath.VERSION,
                    {
                        project_id: ids ? ids.projectId : null,
                        project_campaign_id: ids ? ids.projectCampaignId : null,
                        spot_id: ids ? ids.spotId : null,
                        search,
                        offset: this.prepareOffset(page, resultsPerPage),
                        length: resultsPerPage,
                    },
                    false
                )) as VersionsResultsRawApiResponse;

                versionData.totalCountOfResults = response.data.total_count;
                versionData.results = response.data.data;
                versionData.lastFetchTimestamp = Date.now();
                versionData.isLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchVersions(userId, ids, search, page, resultsPerPage, true);
            }, 1024);

            throw error;
        }
    };

    public getProjectResult = (userId: number, search: string, page: number): ProjectsResult | null => {
        search = this.prepareSearchQuery(search);

        return (
            ProjectsCampaignsSpotsStore.projects.find(
                p => p.userId === userId && p.search === search && p.page === page
            ) || null
        );
    };

    public getCampaignResult = (
        userId: number,
        projectId: number | null,
        search: string,
        page: number
    ): CampaignsResult | null => {
        search = this.prepareSearchQuery(search);

        return (
            ProjectsCampaignsSpotsStore.campaigns.find(
                c => c.userId === userId && c.projectId === projectId && c.search === search && c.page === page
            ) || null
        );
    };

    public getSpotResult = (
        userId: number,
        ids: {
            projectId: number | null;
            projectCampaignId: number | null;
        } | null,
        search: string,
        page: number
    ): SpotsResult | null => {
        search = this.prepareSearchQuery(search);

        return (
            ProjectsCampaignsSpotsStore.spots.find(
                s =>
                    s.userId === userId &&
                    s.projectId === (ids ? ids.projectId : null) &&
                    s.projectCampaignId === (ids ? ids.projectCampaignId : null) &&
                    s.search === search &&
                    s.page === page
            ) || null
        );
    };

    public getVersionResult = (
        userId: number,
        ids: {
            projectId: number | null;
            projectCampaignId: number | null;
            spotId: number | null;
        } | null,
        search: string,
        page: number
    ): VersionsResult | null => {
        search = this.prepareSearchQuery(search);

        return (
            ProjectsCampaignsSpotsStore.versions.find(
                v =>
                    v.userId === userId &&
                    v.projectId === (ids ? ids.projectId : null) &&
                    v.projectCampaignId === (ids ? ids.projectCampaignId : null) &&
                    v.spotId === (ids ? ids.spotId : null) &&
                    v.search === search &&
                    v.page === page
            ) || null
        );
    };

    public prepareSearchQuery = (search: string): string => {
        return typeof search === 'string' ? search.toLowerCase().trim() : '';
    };

    public prepareSearchQueryKey = (search: string): string => {
        const query = this.prepareSearchQuery(search);
        return query !== '' ? query : '...';
    };

    public prepareNumberKey = (page: number): string => {
        return typeof page === 'number' ? page.toString() : '0';
    };

    public prepareSectionKey = (id: number | null): string => {
        return id !== null ? (typeof id === 'number' ? id.toString() : '0') : 'all';
    };

    private prepareOffset = (page: number, resultsPerPage: number): number => {
        return (page - 1) * resultsPerPage;
    };
}
