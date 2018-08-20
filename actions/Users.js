import * as actions from "./ActionTypes";
import * as API from "./api";
import { merge as _merge } from "lodash";
import { UserTypesIds } from "./../helpers/users";

const initialState = {
    lastFetchesByType: {},
    people: {},
};

const ActionsUsers = (state = initialState, action) => {
    switch (action.type) {
        case actions.USERS_LIST_UPDATE_SINGLE_USER:
            return typeof action.id !== "unedfined" &&
                typeof action.payload !== "undefined" &&
                typeof action.payload.id !== "undefined"
                ? {
                      ...state,
                      people: {
                          ...state.people,
                          [action.id]: _merge(
                              typeof state.people[action.id] !== "undefined" ? state.people[action.id] : {},
                              action.payload
                          ),
                      },
                  }
                : state;
            break;

        case actions.USERS_LIST_UPDATE_USERS_BY_TYPE:
            return typeof action.payload !== "undefined" &&
                typeof action.payload.length !== "undefined" &&
                typeof action.userTypeId !== "undefined"
                ? {
                      ...state,
                      people: {
                          ...state.people,
                          ...action.payload.reduce((newPeople, user) => {
                              newPeople[user.id] = _merge(
                                  typeof state.people[user.id] !== "undefined" ? state.people[user.id] : {},
                                  user
                              );
                              return newPeople;
                          }, {}),
                      },
                      lastFetchesByType: {
                          ...state.lastFetchesByType,
                          [action.userTypeId]: Date.now(),
                      },
                  }
                : state;
            break;

        default:
            return state;
            break;
    }
};

/**
 * Update or set user from external data
 *
 * @param {object} user - Object containing user information
 * @param {number} user.id - ID of the user
 * @param {string} user.username - Username of the user
 * @param {string} [user.image = null] - Profile image of the user
 * @param {string} user.firstName - First name of the user
 * @param {string} user.lastName - Last name of the user
 * @param {string} user.fullName - Full name of the user
 * @param {number} user.typeId - ID of the user's type
 * @param {string} user.typeName - Name of the user's type
 * @param {boolean} [user.status = false] - True when user is active
 * @returns Promise
 */
export const updateUser = user => {
    user = typeof user !== "undefined" && typeof user.id !== "undefined" && typeof user.fullName !== "undefined" ? user : null;
    if (user !== null) {
        user = {
            ...user,
            image: typeof user.image !== "undefined" && user.image ? user.image : null,
            status: typeof user.status !== "undefined" && user.status ? true : false,
            lastFetchTimestamp: Date.now(),
        };
    }

    return dispatch => {
        if (user !== null) {
            dispatch({
                type: actions.USERS_LIST_UPDATE_SINGLE_USER,
                id: user.id,
                payload: user,
            });

            return Promise.resolve();
        } else {
            throw new Error("User data is required");
        }
    };
};

/**
 * Fetch or update data of single user
 *
 * @param {number} id - ID of the user to fetch
 * @param {boolean} [forceFetch = false] - Force fetching of data even if it's not outdated
 * @returns Promise
 */
export const fetchUserById = (id, forceFetch) => {
    forceFetch = typeof forceFetch !== "undefined" ? forceFetch : false;

    return (dispatch, getState) => {
        if (typeof id !== "undefined" && id) {
            const { users: { people } } = getState();
            const now = Date.now();

            if (
                forceFetch === true ||
                typeof people[id] === "undefined" ||
                (typeof people[id] !== "undefined" && typeof people[id].lastFetchTimestamp === "undefined") ||
                (typeof people[id] !== "undefined" && people[id].lastFetchTimestamp < now - 1000 * 60 * 5)
            ) {
                return API.get(API.USERS + "/" + id)
                    .then(response => {
                        console.log("Fetched single user #" + id + ": ", response);
                        dispatch({
                            type: actions.USERS_LIST_UPDATE_SINGLE_USER,
                            id,
                            payload: prepareUserPayload(response),
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
        } else {
            console.warn("ID is required");
            throw new Error();
        }
    };
};

/**
 * Fetch group of users by type
 *
 * @param {number} userTypeId - ID of the users group
 * @param {number} [length = 99999] - Number of users to fetch
 * @param {boolean} [forceFetch = false] - Force fetching of data even if it's not outdated
 * @returns Promise
 */
export const fetchUsersByType = (userTypeId, length, forceFetch) => {
    userTypeId = typeof userTypeId === "number" ? userTypeId : null;
    length = typeof length !== "undefined" && length !== null ? length : 99999;
    forceFetch = typeof forceFetch !== "undefined" ? forceFetch : false;

    return (dispatch, getState) => {
        const now = Date.now();
        const { users: { lastFetchesByType } } = getState();

        // Do not fetch if the same data has been fetched in last 5 minutes unless forceFetch is true
        if (
            userTypeId === null ||
            forceFetch === true ||
            typeof lastFetchesByType[userTypeId] === "undefined" ||
            (typeof lastFetchesByType[userTypeId] !== "undefined" && lastFetchesByType[userTypeId] < now - 1000 * 60 * 5)
        ) {
            return API.get(API.USERS, {
                length,
                type: userTypeId,
            })
                .then(response => {
                    console.log("Users fetched by type: ", response);
                    dispatch({
                        type: actions.USERS_LIST_UPDATE_USERS_BY_TYPE,
                        userTypeId,
                        payload: response.users.map(user => prepareUserPayload(user)),
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

/**
 * Initializes user using limited information from secondary APIs
 *
 * @param {number} id
 * @param {string} username
 * @param {string | null} [image = null]
 * @param {string} firstName
 * @param {string} lastName
 * @param {number} typeId
 * @param {string} typeName
 * @param {boolean} status
 * @returns Promise
 */
export const initializeUserWithLimitedInformation = (id, username, image, firstName, lastName, typeId, typeName, status) => {
    image = typeof image !== "undefined" && image ? image : null;
    if (
        typeof id === "undefined" ||
        id === null ||
        typeof username === "undefined" ||
        username === null ||
        typeof image === "undefined" ||
        typeof firstName === "undefined" ||
        typeof lastName === "undefined" ||
        typeof typeId === "undefined" ||
        typeId === null ||
        typeof typeName === "undefined" ||
        typeName === null ||
        typeof status === "undefined" ||
        status === null
    ) {
        return Promise.resolve();
    }

    return dispatch => {
        dispatch({
            type: actions.USERS_LIST_UPDATE_SINGLE_USER,
            id,
            payload: prepareUserPayload(
                {
                    id,
                    username,
                    image,
                    first_name: firstName,
                    last_name: lastName,
                    type_id: typeId,
                    type_name: typeName,
                    status,
                },
                true
            ),
        });

        return Promise.resolve();
    };
};

/**
 * Prepares user object to be dispatched as payload
 *
 * @param {Object} user
 * @param {boolean} [doNotUpdateLastFetchTimestamp = false]
 */
const prepareUserPayload = (user, doNotUpdateLastFetchTimestamp) => ({
    ...{
        id: user.id,
        username: user.username,
        image: user.image,
        firstName: user.first_name,
        lastName: user.last_name,
        fullName: (user.first_name || "") + (user.first_name && user.last_name ? " " : "") + (user.last_name || ""),
        typeId: user.type_id,
        typeName: user.type_name,
        status: user.status ? true : false,
    },
    ...(typeof doNotUpdateLastFetchTimestamp !== "undefined" && doNotUpdateLastFetchTimestamp
        ? {}
        : {
              lastFetchTimestamp: Date.now(),
          }),
});

export default ActionsUsers;
