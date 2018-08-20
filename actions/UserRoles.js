import * as actions from "./ActionTypes";
import * as API from "./api";
import { merge as _merge } from "lodash";

/**
 * @export
 * @typedef UserRole
 * @type {Object}
 * @prop {number} id
 * @prop {string} name
 */

/**
 * @export
 * @typedef UserRolesState
 * @type {Object}
 * @prop {Object.<number, UserRole>} roles
 * @prop {number} lastFetchTimestamp
 */

/**
 * User roles reducer
 *
 * @export
 * @param {UserRolesState} state
 * @param {string} action
 * @returns UserRolesState
 */
export default function ActionsUserRoles(
    state = {
        roles: {},
        lastFetchTimestamp: 0,
    },
    action
) {
    switch (action.type) {
        case actions.USER_ROLES_SET_ROLES_INFORMATION:
            return typeof action.payload !== "undefined" &&
                action.payload !== null &&
                typeof action.payload.length !== "undefined"
                ? {
                      ...state,
                      roles: {
                          ...state.roles,
                          ...action.payload.reduce((newRoles, role) => {
                              newRoles[role.id] = _merge(
                                  typeof state.roles[role.id] !== "undefined" ? state.roles[role.id] : {},
                                  { id: role.id, name: role.role_name }
                              );
                              return newRoles;
                          }, {}),
                      },
                      lastFetchTimestamp: Date.now(),
                  }
                : state;
            break;

        default:
            return state;
            break;
    }
}

/**
 * Fetch or update user roles data
 *
 * @param {boolean} [forceFetch = false] - Force fetching of data even if it's not outdated
 * @returns Promise
 */
export const fetchUserRoles = forceFetch => {
    forceFetch = typeof forceFetch !== "undefined" && forceFetch ? true : false;

    return (dispatch, getState) => {
        const { userRoles: { lastFetchTimestamp } } = getState();
        const now = Date.now();

        if (forceFetch || lastFetchTimestamp < now - 1000 * 60 * 5) {
            return API.get(API.USER_ROLE)
                .then(response => {
                    console.log("User roles fetched: ", response);
                    dispatch({
                        type: actions.USER_ROLES_SET_ROLES_INFORMATION,
                        payload: response,
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } else {
            return Promise.resolve();
        }
    };
};
