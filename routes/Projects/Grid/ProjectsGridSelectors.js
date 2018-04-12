import { createSelector } from 'reselect';

// Getters
export const getBoardWidth = (state) => state.window.boardWidth;
export const getProjects = (state) => state.projectsList.projects;

// Selectors
export const getProjectsCount = createSelector(
    [getProjects],
    (projects) => typeof projects !== 'undefined' && typeof projects.length !== 'undefined' ? projects.length : 0
);

export const getProjectsColumns = createSelector(
    [getBoardWidth, getProjectsCount, getProjects],
    (boardWidth, projectsCount, projects) => {
        let columns = null;

        if (projectsCount > 0) {
            projects.map((project, i) => {
                if (i === 0) {
                    columns = {
                        column1: [],
                        count: 1
                    };
                }

                const projectData = {
                    key: `project-${project.id}`,
                    data: project
                };

                if (boardWidth >= 720 && projectsCount >= 2) {
                    if (i % 2 <= 0) {
                        columns.column1.push(projectData);
                    } else {
                        if (!columns['column2']) {
                            columns = Object.assign({}, columns, {
                                column2: []
                            });
                            columns.count++;
                        }

                        columns.column2.push(projectData);
                    }
                } else {
                    columns.column1.push(projectData);
                }
            });
        }

        return columns;
    }
);
