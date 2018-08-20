import * as actions from "./ActionTypes";
import * as API from "./api";
import { merge as _merge } from "lodash";

/**
 * @export
 * @typedef UserType
 * @type {Object}
 * @prop {number} id
 * @prop {string} name
 */

/**
 * @export
 * @typedef UserTypesState
 * @type {Object}
 * @prop {Object.<number, UserType>} types
 * @prop {number} lastFetchTimestamp
 */

/**
 * User types reducer
 *
 * @export
 * @param {UserTypesState} state
 * @param {string} action
 * @returns {UserTypesState}
 */
export default function ActionsUserTypes(
    state = {
        types: {},
        lastFetchTimestamp: 0,
    },
    action
) {
    switch (action.type) {
        case actions.USER_TYPES_SET_TYPES_INFORMATION:
            return typeof action.payload !== "undefined" &&
                action.payload !== null &&
                typeof action.payload.length !== "undefined"
                ? {
                      ...state,
                      types: {
                          ...state.types,
                          ...action.payload.reduce((newTypes, type) => {
                              newTypes[type.id] = _merge(
                                  typeof state.types[type.id] !== "undefined" ? state.types[type.id] : {},
                                  { id: type.id, name: type.type_name }
                              );
                              return newTypes;
                          }, {}),
                          lastFetchTimestamp: Date.now(),
                      },
                  }
                : state;
            break;

        default:
            return state;
            break;
    }
}

export const fetchUserTypes = forceFetch => {
    forceFetch = typeof forceFetch !== "undefined" && forceFetch ? true : false;

    return (dispatch, getState) => {
        const { userTypes: { lastFetchTimestamp } } = getState();
        const now = Date.now();

        if (forceFetch || lastFetchTimestamp < now - 1000 * 60 * 5) {
            return API.get(API.USER_TYPE)
                .then(types => {
                    console.log("Fetched user types: ", types);
                    dispatch({
                        type: actions.USER_TYPES_SET_TYPES_INFORMATION,
                        payload: types,
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    throw error;
                });
        } else {
            return Promise.resolve();
        }
    };
};
