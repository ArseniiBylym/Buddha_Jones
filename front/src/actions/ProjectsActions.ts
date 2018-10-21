import { action } from 'mobx';
import * as dateParse from 'date-fns/parse';
import { debounce as _debounce } from 'lodash';
import { ProjectsStore, ProjectsDetailsStore } from 'store/AllStores';
import { API, APIPath } from 'fetch';
import { RawProjectApiResponse, Project } from 'types/project';
import { ProjectCreateData } from 'types/projectDetails';

export class ProjectsActionsClass {
    public fetchProjectsDebounced = _debounce((page?: number) => {
        this.fetchProjects(typeof page !== 'undefined' ? page : 1);
    }, 300);

    @action
    public changeProjectsFilterByClient = (client: { id: number; name: string } | null = null) => {
        ProjectsStore.filterByClient = client;
    };

    @action
    public changeProjectsFilterBySearchQuery = (query: string = '') => {
        ProjectsStore.filterByQuery = query;
    };

    @action
    public createProject = async (project: ProjectCreateData): Promise<number> => {
        try {
            const response = (await API.postData(APIPath.PROJECT, {
                name: project.name.trim(),
                project_code: project.codeName.trim(),
                customer_id: project.clientId !== null ? project.clientId : '',
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
                    ...(ProjectsStore.filterByClient !== null && {
                        customer_id: ProjectsStore.filterByClient.id,
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
                lastUpdatedAt: dateParse(project.lastUpdatedAt.date),
                lastUpdatedByUserId: project.lastUpdateUser.userId,
                lastUpdatedByUserName: project.lastUpdateUser.name,
                lastUpdatedByUserImage: project.lastUpdateUser.image,
            }));

            ProjectsStore.countTotal = response.data.total_count;
            ProjectsStore.projectsList = projectsList;

            return projectsList;
        } catch (error) {
            throw error;
        }
    };
}
