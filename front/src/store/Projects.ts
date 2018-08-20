import { observable, reaction } from 'mobx';
import { Project } from 'types/project';
import { ProjectsActions } from 'actions';

export class Projects {
    @observable public currentPage: number = 0;
    @observable public countPerPage: number = 10;
    @observable public countTotal: number = 0;

    @observable public filterByQuery: string = '';
    @observable public filterByClient: { id: number; name: string } | null = null;

    @observable public loadingProjects: boolean = false;
    @observable public updatingProjects: boolean = false;

    @observable public projectsList: Project[] = [];

    constructor() {
        // React to client filter change
        reaction(
            () => this.filterByClient,
            clientFilter => {
                ProjectsActions.fetchProjects(1);
            }
        );

        // React to client filter by search query change
        reaction(
            () => this.filterByQuery,
            query => {
                ProjectsActions.fetchProjectsDebounced(1);
            }
        );
    }
}
