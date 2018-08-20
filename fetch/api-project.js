/// <reference path="./../interfaces/api/project.js" />

const API = require("./../actions/api");

/**
 * Fetches complete details of a single project
 *
 * @param {number} projectId
 * @returns {Promise<ApiProjectData>}
 */
const fetchProject = projectId => {
    if (typeof projectId === "undefined" || projectId === null) {
        return Promise.reject(new Error("No project ID provided to the method"));
    }

    return API.get(`${API.PROJECT}/${projectId}`);
};

exports.fetchProject = fetchProject;
