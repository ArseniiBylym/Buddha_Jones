import { createSelector } from 'reselect';
import { get as _get, toNumber as _toNumber } from 'lodash';

// Getters
const getSelectedProjectId = (state) => state.projectBoard.selectedProjectId;
const getProjects = (state) => state.projectBoard.allProjects;

// Array of all projects IDs
export const getAllProjectsIds = createSelector(
    [getProjects],
    (projects) => Object.keys(projects).map((projectKey) => _toNumber(projectKey))
);

// Get single project
export const getSelectedProject = createSelector(
    [getSelectedProjectId, getProjects],
    (id, projects) => typeof projects[id] !== 'undefined' && projects[id] !== null ? projects[id] : null
);

// Get selected project's campaigns
export const getSelectedProjectCampaigns = createSelector(
    [getSelectedProject],
    (project) => project !== null && typeof project.campaigns !== 'undefined' ? project.campaigns : []
);

// Get IDs of campaigns of the selected project
export const getSelectedProjectCampaignsIds = createSelector(
    [getSelectedProjectCampaigns],
    (campaigns) => campaigns.map((c) => c.id)
);

// Get ID of the selected project's customer
export const getSelectedProjectsCustomerId = createSelector(
    [getSelectedProject],
    (project) => _get(project, 'customerId', null)
);

// Get name of the selected project's customer
export const getSelectedProjectsCustomerName = createSelector(
    [getSelectedProject],
    (project) => _get(project, 'customerName', null)
);
