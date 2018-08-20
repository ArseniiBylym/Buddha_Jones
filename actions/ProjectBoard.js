/// <reference path="./../interfaces/api/project.js" />

import * as actions from './ActionTypes';
import * as API from './api';
import { fetchProject } from './../fetch/api-project';
import update from 'immutability-helper';
import { initializeUserWithLimitedInformation } from './Users';
import { DateTime } from 'luxon';
import { get as _get, has as _has, isNil as _isNil, toNumber as _toNumber, merge as _merge } from 'lodash';

// Selectors
import { getAllProjectsIds } from './ProjectBoardSelectors';

// Types
/**
 * @typedef ProjectBoardState
 * @type {Object}
 * @prop {boolean} loading
 * @prop {boolean} updating
 * @prop {number} projectId
 * @prop {string | null} projectName
 * @prop {number} customerId
 * @prop {string | null} customerName
 * @prop {string | null} notes
 * @prop {ProjectCampaignState[]} campaigns
 */

/**
 * @typedef ProjectCampaignState
 * @type {Object}
 * @prop {number } id
 * @prop {string | null} name
 * @prop {number | null} firstPointOfContactId
 * @prop {boolean} writingTeam
 * @prop {string | null} writingTeamNotes
 * @prop {boolean} musicTeam
 * @prop {string | null} musicTeamNotes
 * @prop {CampaignSpotState[]} spots
 */

/**
 * @typedef CampaignSpotState
 * @type {Object}
 * @prop {number} id
 * @prop {string | null} name
 * @prop {string | null} notes
 * @prop {number | null} numberOfRevisions
 * @prop {number | null} firstRevisionCost
 * @prop {boolean} graphicsIncluded
 * @prop {boolean} justAdded
 */

// Initial state objects
const initialUserState = {
    userId: null,
    roleId: null,
};

/** @type {SpotState} */
const initialSpotState = {
    id: null,
    name: null,
    notes: null,
    numberOfRevisions: null,
    firstRevisionCost: null,
    graphicsIncluded: false,
    versions: [],
    justAdded: false,
};

/** @type {ProjectCampaignState} */
const initialCampaignState = {
    id: null,
    name: null,
    firstPointOfContactId: null,
    writingTeam: false,
    writingTeamNotes: '',
    musicTeam: false,
    musicTeamNotes: '',
    spots: [],
    users: [],
    billingUsers: [],
};

/** @type {ProjectBoardState} */
const initialProjectState = {
    loading: false,
    updating: false,
    projectId: null,
    projectName: null,
    customerId: null,
    customerName: null,
    notes: null,
    campaigns: [],
    history: [],
    teams: {
        editorial: {
            startDate: new Date('2016-08-02T12:00:00Z'),
            version1Deadline: new Date('2016-08-14T12:00:00Z'),
            deliveryDate: new Date('2016-08-22T12:00:00Z'),
            requestedEditor: {
                id: 20,
                name: 'Fred "FG" Gago',
            },
            assignedEditor: {
                id: undefined,
                name: undefined,
            },
            notes: '',
        },
        finance: {
            notes: '',
            requestedBudget: undefined,
            assignedbudget: undefined,
            specWork: '',
        },
    },
    meetings: {
        create: {
            error: false,
            adding: false,
            saving: false,
            date: DateTime.local().plus({ days: 1 }),
            creativeCoordinator: {
                id: null,
                name: 'Assign coordinator',
            },
            notes: '',
        },
        list: [
            {
                id: 1,
                date: new Date('2016-11-03T12:00:00Z'),
                creativeCoordinator: {
                    id: 1,
                    name: 'John Doe',
                },
                notes: 'Creative kick-off meeting',
            },
        ],
    },
};

/**
 * Project board reducer
 *
 * @param {ProjectBoardState}
 * @param {string} action
 * @returns ProjectBoardState
 */
export default function ActionsProjectBoard(
    state = {
        selectedProjectId: null,
        allProjects: {},
    },
    action
) {
    switch (action.type) {
        case actions.PROJECT_BOARD_START_LOADING:
            return !_isNil(action.id && typeof state.allProjects[action.id] !== 'undefined')
                ? update(state, {
                      allProjects: {
                          [action.id]: {
                              loading: {
                                  $set: true,
                              },
                          },
                      },
                  })
                : state;
            break;

        case actions.PROJECT_BOARD_START_UPDATING:
            return !_isNil(action.id && typeof state.allProjects[action.id] !== 'undefined')
                ? update(state, {
                      allProjects: {
                          [action.id]: {
                              updating: {
                                  $set: true,
                              },
                          },
                      },
                  })
                : state;
            break;

        case actions.PROJECT_BOARD_STOP_LOADING:
            return !_isNil(action.id && typeof state.allProjects[action.id] !== 'undefined')
                ? update(state, {
                      allProjects: {
                          [action.id]: {
                              loading: {
                                  $set: false,
                              },
                          },
                      },
                  })
                : state;
            break;

        case actions.PROJECT_BOARD_STOP_LOADING_AND_UPDATING:
            return !_isNil(action.id && typeof state.allProjects[action.id] !== 'undefined')
                ? update(state, {
                      allProjects: {
                          [action.id]: {
                              loading: {
                                  $set: false,
                              },
                              updating: {
                                  $set: false,
                              },
                          },
                      },
                  })
                : state;
            break;

        case actions.PROJECT_BOARD_SET_SELECTED_PROJECT_ID:
            return update(state, {
                selectedProjectId: {
                    $set: action.payload,
                },
            });
            break;

        case actions.PROJECT_BOARD_INITIALIZE_PROJECT:
            const projectInit = Object.assign({}, initialProjectState, {
                projectId: action.payload.projectId,
                projectName: _get(action, 'payload.projectName', null),
                customerId: _get(action, 'payload.customerId', null),
                customerName: _get(action, 'payload.customerName', null),
            });
            return !_isNil(action.id)
                ? {
                      ...state,
                      allProjects: {
                          ...state.allProjects,
                          [action.id]:
                              typeof state.allProjects[action.id] !== 'undefined' && state.allProjects[action.id]
                                  ? _merge(state.allProjects[action.id], projectInit)
                                  : projectInit,
                      },
                  }
                : state;
            break;

        case actions.PROJECT_BOARD_SET_PROJECT_DETAILS:
            return !_isNil(action.id)
                ? {
                      ...state,
                      allProjects: {
                          ...state.allProjects,
                          [action.id]:
                              typeof state.allProjects[action.id] !== 'undefined' && state.allProjects[action.id]
                                  ? _merge(state.allProjects[action.id], action.payload)
                                  : _merge(initializeProject, action.payload),
                      },
                  }
                : state;
            break;

        case actions.PROJECT_BOARD_SET_PROJECT_HISTORY:
            return !_isNil(action.id)
                ? {
                      ...state,
                      allProjects: {
                          ...state.allProjects,
                          [action.id]:
                              typeof state.allProjects[action.id] !== 'undefined' && state.allProjects[action.id]
                                  ? {
                                        ...state.allProjects[action.id],
                                        history: action.payload,
                                    }
                                  : _merge(initializeProject, action.payload),
                      },
                  }
                : state;
            break;

        case actions.PROJECT_BOARD_SET_PROJECT_NOTES:
            return !_isNil(action.id)
                ? update(state, {
                      allProjects: {
                          [action.id]: {
                              notes: {
                                  $set: action.payload,
                              },
                          },
                      },
                  })
                : state;
            break;

        case actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_WRITING_OR_MUSIC_TEAM_REQUEST:
            if (!_isNil(action.projectId) && !_isNil(action.campaignId) && !_isNil(action.requestType)) {
                const campaignIndex = state.allProjects[action.projectId].campaigns.findIndex(campaign => {
                    return campaign.id === action.campaignId;
                });

                return campaignIndex !== -1
                    ? update(state, {
                          allProjects: {
                              [action.projectId]: {
                                  campaigns: {
                                      [campaignIndex]: {
                                          [`${action.requestType}Team`]: {
                                              $set: _get(action, 'payload.toggle', false),
                                          },
                                          [`${action.requestType}TeamNotes`]: {
                                              $set: _get(action, 'payload.notes', ''),
                                          },
                                      },
                                  },
                              },
                          },
                      })
                    : state;
            }

            return state;
            break;

        case actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_NOTE_OR_BUDGET:
            if (!_isNil(action.projectId) && !_isNil(action.campaignId) && !_isNil(action.isNote)) {
                const campaignIndex = state.allProjects[action.projectId].campaigns.findIndex(campaign => {
                    return campaign.id === action.campaignId;
                });

                return campaignIndex !== -1
                    ? update(state, {
                          allProjects: {
                              [action.projectId]: {
                                  campaigns: {
                                      [campaignIndex]: {
                                          [action.isNote ? 'note' : 'budget']: {
                                              $set: action.payload,
                                          },
                                      },
                                  },
                              },
                          },
                      })
                    : state;
            }
            return state;
            break;

        case actions.PROJECT_BOARD_ADD_CAMPAIGN:
            return typeof action.id !== 'undefined' && typeof state.allProjects[action.id] !== 'undefined'
                ? update(state, {
                      allProjects: {
                          [action.id]: {
                              campaigns: {
                                  $push: [_merge(initialCampaignState, _get(action, 'payload', {}))],
                              },
                          },
                      },
                  })
                : state;
            break;

        case actions.PROJECT_BOARD_REMOVE_CAMPAIGN:
            if (typeof state.allProjects[action.id] !== 'undefined') {
                const campaignIndex = state.allProjects[action.id].campaigns.findIndex(campaign => {
                    return campaign.id === action.payload.campaignId;
                });

                return campaignIndex !== -1
                    ? update(state, {
                          allProjects: {
                              [action.id]: {
                                  campaigns: {
                                      $splice: [[campaignIndex, 1]],
                                  },
                              },
                          },
                      })
                    : state;
            } else {
                return state;
            }
            break;

        case actions.PROJECT_BOARD_ADD_OR_UPDATE_SPOT:
            if (
                typeof action.projectId !== 'undefined' &&
                typeof action.campaignId !== 'undefined' &&
                typeof state.allProjects[action.projectId] !== 'undefined'
            ) {
                const campaignIndex = state.allProjects[action.projectId].campaigns.findIndex(campaign => {
                    return campaign.id === action.campaignId;
                });

                if (campaignIndex !== -1) {
                    const spotIndex =
                        typeof action.spotId !== 'undefined' && action.spotId
                            ? state.allProjects[action.projectId].campaigns[campaignIndex].spots.findIndex(spot => {
                                  return spot.id === action.spotId;
                              })
                            : -1;

                    return update(state, {
                        allProjects: {
                            [action.projectId]: {
                                campaigns: {
                                    [campaignIndex]:
                                        spotIndex !== -1
                                            ? {
                                                  spots: {
                                                      [spotIndex]: {
                                                          $merge: action.payload,
                                                      },
                                                  },
                                              }
                                            : {
                                                  spots: {
                                                      $push: [
                                                          {
                                                              ...initialSpotState,
                                                              ...action.payload,
                                                              justAdded: true,
                                                          },
                                                      ],
                                                  },
                                              },
                                },
                            },
                        },
                    });
                } else {
                    return state;
                }
            } else {
                return state;
            }
            break;

        case actions.PROJECT_BOARD_REMOVE_SPOT:
            if (typeof state.allProjects[action.id] !== 'undefined') {
                const campaignIndex = state.allProjects[action.id].campaigns.findIndex(campaign => {
                    return campaign.id === action.payload.campaignId;
                });

                if (campaignIndex !== -1) {
                    const spotIndex = state.allProjects[action.id].campaigns[campaignIndex].spots.findIndex(spot => {
                        return spot.id === action.payload.spotId;
                    });

                    return spotIndex !== -1
                        ? update(state, {
                              allProjects: {
                                  [action.id]: {
                                      campaigns: {
                                          [campaignIndex]: {
                                              spots: {
                                                  $splice: [[spotIndex, 1]],
                                              },
                                          },
                                      },
                                  },
                              },
                          })
                        : state;
                } else {
                    return state;
                }
            } else {
                return state;
            }
            break;

        case actions.PROJECT_BOARD_ADD_VERSION:
            if (typeof state.allProjects[action.id] !== 'undefined') {
                const campaignIndex = state.allProjects[action.id].campaigns.findIndex(campaign => {
                    return campaign.id === action.payload.campaignId;
                });

                if (campaignIndex !== -1) {
                    const spotIndex = state.allProjects[action.id].campaigns[campaignIndex].spots.findIndex(spot => {
                        return spot.id === action.payload.spotId;
                    });

                    if (spotIndex !== -1) {
                        return update(state, {
                            allProjects: {
                                [action.id]: {
                                    campaigns: {
                                        [campaignIndex]: {
                                            spots: {
                                                [spotIndex]: {
                                                    versions: {
                                                        $push: [
                                                            {
                                                                id: action.payload.versionId,
                                                                name: action.payload.versionName,
                                                            },
                                                        ],
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        });
                    } else {
                        return state;
                    }
                } else {
                    return state;
                }
            } else {
                return state;
            }
            break;

        case actions.PROJECT_BOARD_REMOVE_VERSION:
            if (typeof state.allProjects[action.id] !== 'undefined') {
                const campaignIndex = state.allProjects[action.id].campaigns.findIndex(campaign => {
                    return campaign.id === action.payload.campaignId;
                });

                if (campaignIndex !== -1) {
                    const spotIndex = state.allProjects[action.id].campaigns[campaignIndex].spots.findIndex(spot => {
                        return spot.id === action.payload.spotId;
                    });

                    if (spotIndex !== -1) {
                        const versionIndex = state.allProjects[action.id].campaigns[campaignIndex].spots[
                            spotIndex
                        ].versions.findIndex(version => {
                            return version.id === action.payload.versionId;
                        });

                        return versionIndex !== -1
                            ? update(state, {
                                  allProjects: {
                                      [action.id]: {
                                          campaigns: {
                                              [campaignIndex]: {
                                                  spots: {
                                                      [spotIndex]: {
                                                          versions: {
                                                              $splice: [[versionIndex, 1]],
                                                          },
                                                      },
                                                  },
                                              },
                                          },
                                      },
                                  },
                              })
                            : state;
                    } else {
                        return state;
                    }
                } else {
                    return state;
                }
            } else {
                return state;
            }
            break;

        case actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_USER_ROLE:
            if (
                typeof action.projectId !== 'undefined' &&
                typeof action.campaignId !== 'undefined' &&
                typeof action.payload !== 'undefined' &&
                typeof action.payload.userId !== 'undefined' &&
                typeof action.payload.roleId !== 'undefined'
            ) {
                const campaignIndex = state.allProjects[action.projectId].campaigns.findIndex(campaign => {
                    return campaign.id === action.campaignId;
                });

                if (campaignIndex !== -1) {
                    const userType =
                        typeof action.userType !== 'undefined' && action.userType ? action.userType : 'creative';
                    if (['creative', 'billing'].indexOf(userType) !== -1) {
                        const userIndex = state.allProjects[action.projectId].campaigns[campaignIndex].users.findIndex(
                            user => {
                                return user.userId === action.payload.userId;
                            }
                        );

                        return update(state, {
                            allProjects: {
                                [action.projectId]: {
                                    campaigns: {
                                        [campaignIndex]: {
                                            users:
                                                userIndex !== -1
                                                    ? {
                                                          [userIndex]: {
                                                              $merge: action.payload,
                                                          },
                                                      }
                                                    : {
                                                          $push: [action.payload],
                                                      },
                                        },
                                    },
                                },
                            },
                        });
                    }
                }
            }

            return state;
            break;

        case actions.PROJECT_BOARD_REMOVE_CAMPAIGNS_USER:
            if (
                typeof action.projectId !== 'undefined' &&
                typeof action.campaignId !== 'undefined' &&
                typeof state.allProjects[action.projectId] !== 'undefined'
            ) {
                const campaignIndex = state.allProjects[action.projectId].campaigns.findIndex(campaign => {
                    return campaign.id === action.campaignId;
                });

                if (campaignIndex !== -1) {
                    const userType =
                        typeof action.userType !== 'undefined' && action.userType ? action.userType : 'creative';
                    if (['creative', 'billing'].indexOf(userType) !== -1) {
                        const usersKey = userType === 'creative' ? 'users' : 'billingUsers';
                        const userIndex = state.allProjects[action.projectId].campaigns[campaignIndex][
                            usersKey
                        ].findIndex(user => {
                            return user.userId === action.payload;
                        });

                        if (userIndex !== -1) {
                            return update(state, {
                                allProjects: {
                                    [action.projectId]: {
                                        campaigns: {
                                            [campaignIndex]: {
                                                [usersKey]: {
                                                    $splice: [[userIndex, 1]],
                                                },
                                            },
                                        },
                                    },
                                },
                            });
                        }
                    }
                }
            }

            return state;
            break;

        case actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_EXECUTIVE:
            if (
                typeof action.projectId !== 'undefined' &&
                typeof action.campaignId !== 'undefined' &&
                typeof state.allProjects[action.projectId] !== 'undefined'
            ) {
                const campaignIndex = state.allProjects[action.projectId].campaigns.findIndex(campaign => {
                    return campaign.id === action.campaignId;
                });

                return campaignIndex !== -1
                    ? update(state, {
                          allProjects: {
                              [action.projectId]: {
                                  campaigns: {
                                      [campaignIndex]: {
                                          firstPointOfContactId: {
                                              $set: action.payload,
                                          },
                                      },
                                  },
                              },
                          },
                      })
                    : state;
            } else {
                return state;
            }
            break;

        default:
            return state;
    }
}

/**
 * Set initial project information that should be provided in the URL of the project page
 *
 * @param {number} [projectId = null] - ID of the project
 * @param {string} [projectName = null] - Name of the project
 * @param {number} [customerId = null] - ID of the customer to which the project belongs
 * @param {string} [customerName = null] - Name of the customer to which the project belongs
 * @returns Promise
 */
export const initializeProject = (projectId, projectName, customerId, customerName) => {
    return (dispatch, getState) => {
        if (!_isNil(projectId)) {
            projectId = _isNil(projectId) ? null : projectId;
            projectName = _isNil(projectName) ? null : projectName;
            customerId = _isNil(customerId) ? null : customerId;
            customerName = _isNil(customerName) ? null : customerName;

            dispatch({
                type: actions.PROJECT_BOARD_SET_SELECTED_PROJECT_ID,
                payload: projectId,
            });

            const { projectBoard: { allProjects } } = getState();

            if (typeof allProjects[projectId] !== 'undefined') {
                return dispatch(fetchProjectDetails(projectId))
                    .then(() => {
                        return Promise.resolve();
                    })
                    .catch(error => {
                        throw error;
                    });
            } else {
                dispatch({
                    type: actions.PROJECT_BOARD_INITIALIZE_PROJECT,
                    id: projectId,
                    payload: {
                        projectId,
                        projectName,
                        customerId,
                        customerName,
                    },
                });

                dispatch({
                    type: actions.PROJECT_BOARD_START_LOADING,
                    id: projectId,
                });

                return dispatch(fetchProjectDetails(projectId))
                    .then(() => {
                        return Promise.resolve();
                    })
                    .catch(error => {
                        throw error;
                    });
            }
        } else {
            const allFieldsRequired = 'Project ID is required to initialize new project';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

/**
 * Fetches details of a single project from database
 *
 * @param {number} projectId - ID of the project to fetch
 * @returns Promise
 */
export const fetchProjectDetails = projectId => {
    return dispatch => {
        if (typeof projectId !== 'undefined' && projectId) {
            dispatch({
                type: actions.PROJECT_BOARD_START_UPDATING,
                id: projectId,
            });

            return fetchProject(projectId)
                .then(response => {
                    console.log(`Project #${projectId} fetch:`, response);

                    if (typeof response.campaign !== 'undefined' && response.campaign) {
                        let combinedUsers = [];
                        response.campaign.map(c => {
                            combinedUsers = [
                                ...(typeof c.user !== 'undefined' && c.user && typeof c.user.map !== 'undefined'
                                    ? c.user
                                    : []),
                                ...(typeof c.billingUser !== 'undefined' &&
                                c.billingUser &&
                                typeof c.billingUser.map !== 'undefined'
                                    ? c.billingUser
                                    : []),
                            ];
                            combinedUsers.map(u => {
                                dispatch(
                                    initializeUserWithLimitedInformation(
                                        u.userId,
                                        u.username,
                                        u.image,
                                        u.firstName,
                                        u.lastName,
                                        u.typeId,
                                        u.type,
                                        true
                                    )
                                );
                            });
                        });
                    }

                    dispatch({
                        type: actions.PROJECT_BOARD_SET_PROJECT_DETAILS,
                        id: projectId,
                        payload: {
                            projectId: response.id,
                            projectName: response.projectName,
                            customerId: response.customerId,
                            customerName: response.customerName,
                            notes: response.notes,
                            history: response.history.map(h => ({
                                id: _toNumber(h.id),
                                user: h.fullName,
                                date: h.createdAt,
                                text: h.message,
                                image: h.image,
                            })),
                            campaigns: response.campaign.map(c => ({
                                ...initialCampaignState,
                                id: c.campaignId,
                                name: c.campaignName,
                                firstPointOfContactId:
                                    typeof c.firstPointOfContactId !== 'undefined' && c.firstPointOfContactId
                                        ? c.firstPointOfContactId
                                        : null,
                                note: c.note || '',
                                budget: c.budget || '',
                                musicTeam: c.requestMusicTeam,
                                musicTeamNotes: c.musicTeamNotes || '',
                                writingTeam: c.requestWritingTeam,
                                writingTeamNotes: c.writingTeamNotes || '',
                                spots: c.spot.map(s => ({
                                    id: _toNumber(s.id),
                                    name: s.spotName,
                                    notes: s.notes,
                                    numberOfRevisions: s.revisions,
                                    firstRevisionCost: _toNumber(s.firstRevisionCost),
                                    graphicsIncluded: s.graphicsRevisions === 1 ? true : false,
                                    versions: s.version.map(v => ({
                                        id: _toNumber(v.id),
                                        name: v.versionName,
                                    })),
                                    justAdded: false,
                                })),
                                users:
                                    typeof c.user !== 'undefined' && typeof c.user.map !== 'undefined'
                                        ? c.user.map(user => ({
                                              ...initialUserState,
                                              userId: user.userId,
                                              roleId: user.roleId,
                                          }))
                                        : [],
                                billingUsers:
                                    typeof c.billingUser !== 'undefined' && typeof c.billingUser.map !== 'undefined'
                                        ? c.billingUser.map(user => ({
                                              ...initialUserState,
                                              userId: user.userId,
                                          }))
                                        : [],
                            })),
                        },
                    });

                    dispatch({
                        type: actions.PROJECT_BOARD_STOP_LOADING_AND_UPDATING,
                        id: projectId,
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error('Could not fetch project details: ', error);

                    dispatch({
                        type: actions.PROJECT_BOARD_STOP_LOADING_AND_UPDATING,
                        id: projectId,
                    });

                    throw error;
                });
        } else {
            const allFieldsRequired = 'Project ID is required to fetch details and it has to be an integer';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

/**
 * Updates project's history
 *
 * @param {number} projectId - ID of the project
 * @returns Promise
 */
export const fetchProjectHistory = projectId => {
    return dispatch => {
        return API.get(API.PROJECT + '/' + projectId)
            .then(response => {
                if (typeof response.history !== 'undefined') {
                    dispatch({
                        type: actions.PROJECT_BOARD_SET_PROJECT_HISTORY,
                        id: projectId,
                        payload: response.history.map(h => ({
                            id: _toNumber(h.id),
                            user: h.fullName,
                            date: h.createdAt,
                            text: h.message,
                            image: h.image,
                        })),
                    });
                }

                return Promise.resolve();
            })
            .catch(error => {
                console.error("Could not fetch project's history: ", error);
                throw error;
            });
    };
};

/**
 * Update project notes text
 *
 * @param {number} projectId - ID of the project
 * @param {string} projectNotes - Text of the note
 * @returns Promise
 */
export const updateProjectNotesText = (projectNotes, projectId) => {
    return dispatch => {
        if (typeof projectId !== 'undefined' && typeof projectNotes !== 'undefined') {
            dispatch({
                type: actions.PROJECT_BOARD_SET_PROJECT_NOTES,
                id: projectId,
                payload: projectNotes,
            });

            return API.put(
                API.PROJECT + '/' + projectId,
                API.makePutData({
                    notes: projectNotes,
                })
            )
                .then(() => {
                    return Promise.resolve();
                })
                .catch(error => {
                    console.error('Could not updated project notes: ', error);
                    throw error;
                });
        } else {
            return Promise.resolve();
        }
    };
};

export const createProjectCampaign = (projectId, campaignId, campaignName) => {
    return dispatch => {
        return API.post(
            API.ASSIGN_CAMPAIGN_TO_PROJECT,
            API.makePostData({
                project_id: projectId,
                campaign_id: campaignId,
            })
        )
            .then(response => {
                dispatch({
                    type: actions.PROJECT_BOARD_ADD_CAMPAIGN,
                    id: projectId,
                    payload: {
                        id: campaignId,
                        name: campaignName,
                    },
                });

                dispatch(fetchProjectHistory(projectId));

                return Promise.resolve();
            })
            .catch(error => {
                console.error('Could not create new campaign: ', error);
                throw error;
            });
    };
};

/**
 * Removes campaign from the project
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 */
export const removeProjectCampaign = (projectId, campaignId) => {
    return dispatch => {
        return API.del(API.CAMPAIGN + '/' + campaignId + '/' + projectId)
            .then(response => {
                dispatch({
                    type: actions.PROJECT_BOARD_REMOVE_CAMPAIGN,
                    id: projectId,
                    payload: {
                        campaignId,
                    },
                });

                dispatch(fetchProjectHistory(projectId));

                return Promise.resolve();
            })
            .catch(error => {
                console.error('Could not remove campaign from the project: ', error);
                throw error;
            });
    };
};

/**
 * Removes spot from the selected project + campaign
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 * @param {number} spotId - ID of the spot
 * @returns Promise
 */
export const removeProjectSpot = (projectId, campaignId, spotId) => {
    return dispatch => {
        return API.del(API.SPOT + '/' + spotId)
            .then(response => {
                dispatch({
                    type: actions.PROJECT_BOARD_REMOVE_SPOT,
                    id: projectId,
                    payload: {
                        projectId,
                        campaignId,
                        spotId,
                    },
                });

                return Promise.resolve();
            })
            .catch(error => {
                console.error('Could not remove spot from the project and campaign: ', error);
                throw error;
            });
    };
};

/**
 * Adds version to spot, campaign, project
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 * @param {number} spotId - ID of the spot
 * @param {number} versionId - ID of the version
 * @param {string} versionName - Name of the version
 * @returns Promise
 */
export const addProjectVersion = (projectId, campaignId, spotId, versionId, versionName) => {
    return dispatch => {
        if (
            typeof projectId !== 'undefined' &&
            typeof campaignId !== 'undefined' &&
            typeof spotId !== 'undefined' &&
            typeof versionId !== 'undefined' &&
            typeof versionName !== 'undefined'
        ) {
            return API.post(
                API.ASSIGN_VERSION_TO_SPOT,
                API.makePostData({
                    spot_id: spotId,
                    version_id: versionId,
                })
            )
                .then(response => {
                    dispatch({
                        type: actions.PROJECT_BOARD_ADD_VERSION,
                        id: projectId,
                        payload: {
                            projectId,
                            campaignId,
                            spotId,
                            versionId,
                            versionName,
                        },
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error("Could not assign version to project's spot: ", error);
                    throw error;
                });
        } else {
            const allFieldsRequired = 'ID of project, campaign, spot, version and version name are all required';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

/**
 * Removes version from the selected project + campaign and spot
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 * @param {number} spotId - ID of the spot
 * @param {number} versionId - ID of the version
 * @returns Promise
 */
export const removeProjectVersion = (projectId, campaignId, spotId, versionId) => {
    return dispatch => {
        return API.del(API.ASSIGN_VERSION_TO_SPOT + '/' + versionId + '/' + spotId)
            .then(response => {
                dispatch({
                    type: actions.PROJECT_BOARD_REMOVE_VERSION,
                    id: projectId,
                    payload: {
                        projectId,
                        campaignId,
                        spotId,
                        versionId,
                    },
                });

                return Promise.resolve();
            })
            .catch(error => {
                console.error("Could not remove version from project's spot: ", error);
                throw error;
            });
    };
};

/**
 * Updates or creates new spot for specific project and campaign
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 * @param {number} [spotId = null] - Optional ID of the spot, send null when it's a new spot
 * @param {object} spotDetails - Details of the spot
 * @param {string} spotDetails.name - Name of the spot
 * @param {string} [spotDetails.notes = ''] - Notes of the spot
 * @param {number} [spotDetails.numberOfRevisions = null] - Number of revisions paid by the client
 * @param {number} [spotDetails.firstRevisionCost = null] - Cost of the first revision, if included
 * @param {boolean} [spotDetails.graphicsIncluded = false] - True if graphics are included
 * @returns Promise
 */
export const updateOrCreateSpot = (projectId, campaignId, spotId, spotDetails) => {
    return dispatch => {
        if (
            typeof projectId !== 'undefined' &&
            typeof campaignId !== 'undefined' &&
            typeof spotDetails !== 'undefined'
        ) {
            if (typeof spotDetails.name !== 'undefined' && spotDetails.name) {
                // Defaults
                spotId = typeof spotId !== 'undefined' && spotId !== undefined && spotId ? spotId : null;

                // Prepare spot details
                spotDetails = {
                    id: spotId,
                    name: spotDetails.name.trim(),
                    notes:
                        typeof spotDetails.notes !== 'undefined' && spotDetails.notes.trim()
                            ? spotDetails.notes.trim()
                            : '',
                    numberOfRevisions:
                        typeof spotDetails.numberOfRevisions !== 'undefined' ? spotDetails.numberOfRevisions : null,
                    firstRevisionCost:
                        typeof spotDetails.firstRevisionCost !== 'undefined' ? spotDetails.firstRevisionCost : null,
                    graphicsIncluded:
                        typeof spotDetails.graphicsIncluded !== 'undefined' ? spotDetails.graphicsIncluded : false,
                };

                // Format data for the API
                const dataObject = {
                    name: spotDetails.name,
                    notes: spotDetails.notes,
                    project_id: projectId,
                    campaign_id: campaignId,
                    revisions: spotDetails.numberOfRevisions,
                    first_revision_cost: spotDetails.firstRevisionCost,
                    graphics_revisions: spotDetails.graphicsIncluded ? 1 : 0,
                };

                // Update or create new spot
                if (spotId !== null) {
                    return API.put(API.SPOT + '/' + spotId, API.makePutData(dataObject))
                        .then(response => {
                            dispatch({
                                type: actions.PROJECT_BOARD_ADD_OR_UPDATE_SPOT,
                                projectId,
                                campaignId,
                                spotId,
                                payload: spotDetails,
                            });

                            return Promise.resolve();
                        })
                        .catch(error => {
                            console.error('Could not update spot: ', error);
                            throw error;
                        });
                } else {
                    return API.post(API.SPOT, API.makePostData(dataObject))
                        .then(response => {
                            spotId = _toNumber(_get(response, 'data.spot_id', 0));

                            dispatch({
                                type: actions.PROJECT_BOARD_ADD_OR_UPDATE_SPOT,
                                projectId,
                                campaignId,
                                spotId: null,
                                payload: {
                                    ...spotDetails,
                                    id: spotId,
                                },
                            });

                            return Promise.resolve();
                        })
                        .catch(error => {
                            console.error('Could not create spot: ', error);
                            throw error;
                        });
                }
            } else {
                const spotNameIsRequired = 'Name of the spot is required in spotDetails object';
                console.warn(spotNameIsRequired);
                throw new Error(spotNameIsRequired);
            }
        } else {
            const allFieldsRequired = 'ID of the project, campaign and spot details are required';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

/**
 * Change creative executive assigned to project + campaign
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 * @param {number} executiveId - ID of the customer's contact
 * @returns Promise
 */
export const changeCampaignsCreativeExecutive = (projectId, campaignId, executiveId) => {
    return dispatch => {
        if (
            typeof projectId !== 'undefined' &&
            typeof campaignId !== 'undefined' &&
            typeof executiveId !== 'undefined'
        ) {
            return API.post(
                API.ASSIGN_CONTACT_TO_PROJECT_CAMPAIGN,
                API.makePostData({
                    project_id: projectId,
                    campaign_id: campaignId,
                    first_point_of_contact_id: executiveId,
                })
            )
                .then(response => {
                    dispatch({
                        type: actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_EXECUTIVE,
                        projectId,
                        campaignId,
                        payload: executiveId,
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } else {
            const allFieldsRequired = 'ID of the project, campaign and creative executive are required';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

/**
 * Change writing or music team request data in project's campaign
 *
 * @param {number} projectId - ID of the project
 * @param {number} campaignId - ID of the campaign
 * @param {('writing'|'music')} [type = 'writing'] - Type of the request
 * @param {boolean} [toggle = false] - Value of toggle
 * @param {string} [notes = ''] - Value of textarea
 * @returns Promise
 */
export const toggleCampaignsWritingOrMusicTeamRequest = (projectId, campaignId, type, toggle, notes) => {
    type = typeof type !== 'undefined' ? type : 'writing';
    toggle = typeof toggle !== 'undefined' ? toggle : false;
    notes = typeof notes !== 'undefined' ? notes : '';

    return dispatch => {
        if (typeof projectId !== 'undefined' && typeof campaignId !== 'undefined') {
            return API.put(
                API.PROJECT_CAMPAIGN + '/' + projectId + '/' + campaignId,
                API.makePutData({
                    [`request_${type}_team`]: toggle ? 1 : 0,
                    [`${type}_team_notes`]: notes,
                })
            )
                .then(response => {
                    dispatch({
                        type: actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_WRITING_OR_MUSIC_TEAM_REQUEST,
                        projectId,
                        campaignId,
                        requestType: type,
                        payload: {
                            toggle,
                            notes,
                        },
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } else {
            const allFieldsRequired = ' ID of the project and campaign are required';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

export const changeCampaignNoteOrBudget = (projectId, campaignId, isNote, note) => {
    return dispatch => {
        dispatch({
            type: actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_NOTE_OR_BUDGET,
            projectId,
            campaignId,
            isNote,
            payload: note,
        });

        return Promise.resolve();
    };
};

/**
 * Add user or change its role on project's campaign
 *
 * @param {'creative' | 'billing'} userPickerType
 * @param {number} projectId
 * @param {number} campaignId
 * @param {number} userId
 * @param {number | null} roleId
 * @returns Promise
 */
export const addOrChangeRoleOfUserInProjectCampaign = (userPickerType, projectId, campaignId, userId, roleId) => {
    userPickerType = typeof userPickerType !== 'undefined' && userPickerType ? userPickerType : null;
    projectId = typeof projectId !== 'undefined' && projectId ? projectId : null;
    campaignId = typeof campaignId !== 'undefined' && campaignId ? campaignId : null;
    userId = typeof userId !== 'undefined' && userId ? userId : null;
    roleId = typeof roleId !== 'undefined' && !isNaN(roleId) ? roleId : null;

    return dispatch => {
        if (projectId && campaignId && userId) {
            return API.post(
                API.PROJECT_CAMPAIGN_PEOPLE,
                API.makePostData({
                    project_id: projectId,
                    campaign_id: campaignId,
                    user_id: userId,
                    role_id: roleId,
                })
            )
                .then(response => {
                    dispatch({
                        type: actions.PROJECT_BOARD_CHANGE_CAMPAIGNS_USER_ROLE,
                        projectId,
                        campaignId,
                        userType: userPickerType,
                        payload: {
                            userId,
                            roleId,
                        },
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } else {
            const allFieldsRequired = 'ID of the project, campaign and user are required';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};

/**
 * Remove user from project's campaign
 *
 * @param {'creative' | 'billing'} userPickerType
 * @param {number} projectId
 * @param {number} campaignId
 * @param {number} userId
 * @returns Promise
 */
export const removeUserFromProjectCampaign = (userPickerType, projectId, campaignId, userId) => {
    userPickerType = typeof userPickerType !== 'undefined' && userPickerType ? userPickerType : null;
    projectId = typeof projectId !== 'undefined' && projectId ? projectId : null;
    campaignId = typeof campaignId !== 'undefined' && campaignId ? campaignId : null;
    userId = typeof userId !== 'undefined' && userId ? userId : null;

    return dispatch => {
        if (projectId && campaignId && userId) {
            return API.del(API.PROJECT_CAMPAIGN_PEOPLE + '/' + projectId + '/' + campaignId + '/' + userId)
                .then(response => {
                    dispatch({
                        type: actions.PROJECT_BOARD_REMOVE_CAMPAIGNS_USER,
                        projectId,
                        campaignId,
                        userType: userPickerType,
                        payload: userId,
                    });

                    return Promise.resolve();
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } else {
            const allFieldsRequired = 'ID of the project, campaign and user are required';
            console.warn(allFieldsRequired);
            throw new Error(allFieldsRequired);
        }
    };
};
