import * as actions from './ActionTypes';
import * as API from './api';
import { toNumber as _toNumber } from 'lodash';

export default function ActionsProjectsList(state = {
    pagination: {
        currentPage: 0,
        countPerPage: 10,
        countTotal: 0,
    },
    filter: {
        query: '',
        client: { value: '', label: 'All' },
    },
    loadingProjects: false,
    updatingProjects: false,
    projects: [],
}, action) {
    switch (action.type) {
        case actions.PROJECTS_LIST_START_LOADING:
            return Object.assign({}, state, {
                loadingProjects: true,
            });
            break;

        case actions.PROJECTS_LIST_START_UPDATING:
            return Object.assign({}, state, {
                updatingProjects: true,
            });
            break;

        case actions.PROJECTS_LIST_STOP_LOADING_AND_UPDATING:
            return Object.assign({}, state, {
                loadingProjects: false,
                updatingProjects: false,
            });
            break;

        case actions.PROJECTS_LIST_CHANGE_SEARCH_QUERY:
            return Object.assign({}, state, {
                filter: Object.assign({}, state.filter, {
                    query: action.payload
                })
            });
            break;

        case actions.PROJECTS_LIST_CHANGE_CLIENT_FILTER:
            return Object.assign({}, state, {
                filter: Object.assign({}, state.filter, {
                    client: Object.assign({}, state.filter.client, action.payload)
                })
            });
            break;

        case actions.PROJECTS_LIST_CHANGE_PAGE:
            return Object.assign({}, state, {
                pagination: Object.assign({}, state.pagination, {
                    currentPage: action.payload
                })
            });
            break;

        case actions.PROJECTS_LIST_CHANGE_PROJECTS:
            return Object.assign({}, state, {
                pagination: Object.assign({}, state.pagination, {
                    countTotal: action.payload.projectsCount,
                }),
                projects: action.payload.projects
            });
            break;

        default:
            return state;
            break;
    }
}

export const changeProjectsListSearchQuery = (searchQuery) => {
    return (dispatch) => {
        dispatch({
            type: actions.PROJECTS_LIST_CHANGE_SEARCH_QUERY,
            payload: searchQuery
        });

        return Promise.resolve();
    };
};

export const changeProjectsListClientFilter = (clientFilter) => {
    return (dispatch) => {
        dispatch({
            type: actions.PROJECTS_LIST_CHANGE_CLIENT_FILTER,
            payload: clientFilter
        });

        return dispatch(
            fetchProjects(1)
        ).then(() => {
            return Promise.resolve();
        }).catch((error) => {
            throw error;
        });
    };
};

export const fetchProjects = (paginationPage) => {
    paginationPage = typeof paginationPage !== 'undefined' && paginationPage !== null ? _toNumber(paginationPage) : 1;
    paginationPage = !isNaN(paginationPage) ? paginationPage : 1;

    return (dispatch, getState) => {
        const { projectsList: { pagination, filter } } = getState();

        if (pagination.currentPage === paginationPage) {
            dispatch({
                type: actions.PROJECTS_LIST_START_UPDATING
            });
        } else {
            dispatch({
                type: actions.PROJECTS_LIST_START_LOADING
            });

            dispatch({
                type: actions.PROJECTS_LIST_CHANGE_PAGE,
                payload: paginationPage
            });

            pagination.currentPage = paginationPage;
        }

        return API.getRaw(API.PROJECT, {
            sort: 'last_update_date',
            customer_id: filter.client.value,
            offset: (pagination.currentPage - 1) * pagination.countPerPage,
            length: pagination.countPerPage,
            search: filter.query
        }).then(response => {
            const projects = response.data.map(project => {
                const { id, projectName, customerId, customerName, campaign, lastUpdatedAt, lastUpdateUser, comment } = project;

                return {
                    id,
                    name: projectName,
                    clientId: customerId,
                    client: customerName,
                    campaigns: campaign.map(c => {
                        return {
                            id: c.campaignId,
                            name: c.campaignName
                        };
                    }),
                    lastUpdate: {
                        date: new Date(lastUpdatedAt),
                        user: {
                            id: lastUpdateUser.userId,
                            name: lastUpdateUser.name,
                            image: lastUpdateUser.image
                        }
                    },
                    activity: {
                        count: comment.count,
                        unread: comment.count === comment.unread
                    }
                };
            });

            dispatch({
                type: actions.PROJECTS_LIST_STOP_LOADING_AND_UPDATING
            });

            dispatch({
                type: actions.PROJECTS_LIST_CHANGE_PROJECTS,
                payload: {
                    projectsCount: response.total_count,
                    projects
                }
            });

            return Promise.resolve();
        }).catch(error => {
            dispatch({
                type: actions.PROJECTS_LIST_STOP_LOADING_AND_UPDATING
            });

            throw error;
        });
    };
};
