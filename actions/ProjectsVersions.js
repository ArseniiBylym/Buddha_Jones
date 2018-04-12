import * as actions from './ActionTypes';
import * as API from './api';

export default function ActionsProjectsVersions(state = {
    loading: false,
    allVersions: []
}, action) {
    switch (action.type) {
        case actions.PROJECTS_VERSIONS_START_LOADING:
            return {
                ...state,
                loading: true
            };
            break;

        case actions.PROJECTS_VERSIONS_STOP_LOADING:
            return {
                ...state,
                loading: false
            };
            break;

        case actions.PROJECTS_VERSIONS_SET_ALL_VERSIONS:
            return {
                ...state,
                allVersions: typeof action.payload !== 'undefined'
                    ? action.payload === null ? [] : action.payload
                    : state.allVersions
            };
            break;

        default:
            return state;
    }
}

/**
 * Fetch all spot versions and save them to app state
 *
 * @returns Promise
 */
export const fetchAllVersions = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actions.PROJECTS_VERSIONS_START_LOADING
        });

        return API.get(API.VERSION + '?offset=0&length=99999').then((versions) => {
            if (typeof versions !== 'undefined' && versions) {
                dispatch({
                    type: actions.PROJECTS_VERSIONS_SET_ALL_VERSIONS,
                    payload: typeof versions !== 'undefined' && versions
                        ? versions.map((version) => ({
                            value: version.id,
                            label: version.versionName
                        }))
                        : null
                });
            }

            dispatch({
                type: actions.PROJECTS_VERSIONS_STOP_LOADING
            });

            return Promise.resolve();
        }).catch((error) => {
            dispatch({
                type: actions.PROJECTS_VERSIONS_STOP_LOADING
            });

            throw error;
        });
    };
};
