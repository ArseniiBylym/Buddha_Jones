import * as dateParse from 'date-fns/parse';
import { API, APIPath } from 'fetch';
import { debounce as _debounce } from 'lodash';
import { action } from 'mobx';
import { ProjectsDetailsStore, ProjectsStore } from 'store/AllStores';
import { Project, RawProjectApiResponse } from 'types/project';
import { ProjectCreateData } from 'types/projectDetails';

export class ProjectsActionsClass {
    public fetchProjectsDebounced = _debounce((page?: number) => {
        this.fetchProjects(typeof page !== 'undefined' ? page : 1);
    }, 300);

    @action
    public changeProjectsFilterByStudio = (studio: { id: number; name: string } | null = null) => {
        ProjectsStore.filterByStudio = studio;
    };

    @action
    public changeProjectsFilterBySearchQuery = (query: string = '') => {
        ProjectsStore.filterByQuery = query;
    };

    @action
    public createProject = async (project: ProjectCreateData): Promise<number> => {
        try {
            const response = (await API.postData(APIPath.PROJECT, {
                confidential: project.confidential,
                name: project.name.trim(),
                project_code: project.codeName.trim(),
                studio_id: project.studioId !== null ? project.studioId : '',
                project_prefix: project.prefix && project.prefix.trim(),
                project_release: project.releaseDate !== null ? project.releaseDate : '',
                notes:
                    typeof project.notes !== 'undefined' && project.notes !== null && project.notes.trim() !== ''
                        ? project.notes.trim()
                        : '',
            })) as { project_id: number };

            return response.project_id;
        } catch (error) {
            throw error;
        }
    };

    @action
    public updateProjectNote = async (projectId: number, note: string): Promise<boolean> => {
        try {
            note = note.trim();

            await API.putData(APIPath.PROJECT + '/' + projectId, {
                notes: note,
            });

            const projectMatchId = ProjectsDetailsStore.fetchedProjectsIdsFlat.indexOf(projectId);
            if (projectMatchId !== -1) {
                ProjectsDetailsStore.fetchedProjects[projectMatchId].notes = note;
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchProjects = async (page?: number): Promise<Project[]> => {
        page = typeof page !== 'undefined' && page ? page : ProjectsStore.currentPage ? ProjectsStore.currentPage : 1;

        try {
            if (page === ProjectsStore.currentPage) {
                ProjectsStore.updatingProjects = true;
            } else {
                ProjectsStore.loadingProjects = true;
                ProjectsStore.currentPage = page;
            }

            const response = (await API.getData(
                APIPath.PROJECT,
                {
                    sort: 'last_update_date',
                    ...(ProjectsStore.filterByStudio !== null && {
                        studio_id: ProjectsStore.filterByStudio.id,
                    }),
                    ...(ProjectsStore.filterByQuery && {
                        search: ProjectsStore.filterByQuery,
                    }),
                    offset: (page - 1) * ProjectsStore.countPerPage,
                    length: ProjectsStore.countPerPage,
                },
                false
            )) as RawProjectApiResponse;

            ProjectsStore.updatingProjects = false;
            ProjectsStore.loadingProjects = false;

            const projectsList: Project[] = response.data.data.map(project => ({
                id: project.id,
                name:
                    project.projectCode && project.projectName
                        ? `(${project.projectCode}) - ${project.projectName}`
                        : project.projectCode
                        ? project.projectCode
                        : project.projectName
                        ? project.projectName
                        : '',
                clientId: project.customerId,
                clientName: project.customerName,
                studioId: project.studioId,
                studioName: project.studioName,
                notes: project.notes,
                commentsCount: project.comment.count,
                commentsUnread: project.comment.unread,
                campaigns: project.campaign,
                lastUpdatedAt:
                    project.lastUpdatedAt && project.lastUpdatedAt.date ? dateParse(project.lastUpdatedAt.date) : null,
                lastUpdatedByUserId: project.lastUpdateUser.userId,
                lastUpdatedByUserName: project.lastUpdateUser.name,
                lastUpdatedByUserImage: project.lastUpdateUser.image,
                confidential: project.confidential
            }));

            ProjectsStore.countTotal = response.data.total_count;
            ProjectsStore.projectsList = projectsList;

            return projectsList;
        } catch (error) {
            throw error;
        }
    };

    public constructProjectUrl = (
        studioId: number,
        studioName: string,
        projectId: number,
        projectName: string,
        fromPage?: number,
        scrollToProjectCampaignId?: number
    ): string => {
        return (
            '/portal/project/' +
            studioId +
            '/' +
            studioName +
            '/' +
            projectId +
            '/' +
            projectName +
            (fromPage ? '/' + fromPage : '') +
            (scrollToProjectCampaignId ? '?projectCampaignId=' + scrollToProjectCampaignId : '')
        );
    };
}
