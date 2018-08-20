import { observable, computed } from 'mobx';
import { ProjectDetails, ProjectDetailsVersionModal } from 'types/projectDetails';

export class ProjectsDetails {
    @observable public fetchedProjects: ProjectDetails[] = [];

    @computed
    public get fetchedProjectsIdsFlat(): number[] {
        return this.fetchedProjects.map(project => project.projectId);
    }

    @observable public versionEditModal: ProjectDetailsVersionModal | null = null;
}
