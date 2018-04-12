/* eslint no-multi-spaces: 0 */

// Window
export const WINDOW_SET_BOARD_WIDTH                                       = 'WINDOW/SET_BOARD_WIDTH';

// Sidebar
export const SIDEBAR_TOGGLE_VISIBILITY                                    = 'SIDEBAR/TOGGLE_VISIBILITY';
export const SIDEBAR_TOGGLE_SUB_NAV_VISIBILITY                            = 'SIDEBAR/TOGGLE_SUB_NAV_VISIBILITY';
export const SIDEBAR_CHANGE_ACTIVE_GROUP_INDEX                            = 'SIDEBAR/CHANGE_ACTIVE_GROUP_INDEX';
export const SIDEBAR_CHANGE_EXPANDED_GROUP_INDEX                          = 'SIDEBAR/CHANGE_EXPANDED_GROUP_INDEX';
export const SIDEBAR_CHANGE_ACTIVE_SUB_LINK_INDEX                         = 'SIDEBAR/CHANGE_ACTIVE_SUB_LINK_INDEX';
export const SIDEBAR_CHANGE_ACTIVE_SUB_NAV_POSITION                       = 'SIDEBAR/CHANGE_ACTIVE_SUB_NAV_POSITION';
export const SIDEBAR_CHANGE_NAVIGATION_GROUPS                             = 'SIDEBAR/CHANGE_NAVIGATION_GROUPS';
export const SIDEBAR_CHANGE_NAVIGATION_SUB_LINKS                          = 'SIDEBAR/CHANGE_NAVIGATION_SUB_LINKS';
export const SIDEBAR_COLLAPSE                                             = 'SIDEBAR/COLLAPSE';
export const SIDEBAR_CHANGE_ALL                                           = 'SIDEBAR/CHANGE_ALL';

// Header
export const HEADER_CHANGE_TITLE                                          = 'HEADER/CHANGE_TITLE';
export const HEADER_CHANGE_SUB_TITLE                                      = 'HEADER/CHANGE_SUB_TITLE';
export const HEADER_CHANGE_TITLES                                         = 'HEADER/CHANGE_TITLES';
export const HEADER_SET_ELEMENTS                                          = 'HEADER/SET_ELEMENTS';
export const HEADER_SET_SECTIONS                                          = 'HEADER/SET_SECTIONS';
export const HEADER_SET_ALL                                               = 'HEADER/SET_ALL';
export const HEADER_RESET                                                 = 'HEADER/RESET';

// Notifications
export const NOTIFICATIONS_CREATE_LIVE_NOTIFICATION                       = 'NOTIFICATIONS/CREATE_LIVE_NOTIFICATION';
export const NOTIFICATIONS_REMOVE_LIVE_NOTIFICATION                       = 'NOTIFICATIONS/REMOVE_LIVE_NOTIFICATION';
export const NOTIFICATIONS_ADD_HISTORY_NOTIFICATION                       = 'NOTIFICATIONS/ADD_HISTORY_NOTIFICATION';

// User
export const USER_LOGIN                                                   = 'USER/LOGIN';
export const USER_LOGOUT                                                  = 'USER/LOGOUT';
export const USER_SET_TOKEN                                               = 'USER/SET_TOKEN';
export const USER_FORGOT_PASSWORD                                         = 'USER/FORGOT_PASSWORD';
export const USER_SENT_PASSWORD                                           = 'USER/SENT_PASSWORD';
export const USER_INVALID_RESET_TOKEN                                     = 'USER/INVALID_RESET_TOKEN';
export const USER_SET_IMAGE                                               = 'USER/SET_IMAGE';
export const USER_LOGIN_FAILED                                            = 'USER/USER_LOGIN_FAILED';
export const USER_RESET_PWD_FAILED                                        = 'USER/RESET_PWD_FAILED';
export const USER_CHANGE_RESET_STATUS                                     = 'USER/CHANGE_RESET_STATUS';

// Customers
export const CUSTOMER_SET_CUSTOMER_DETAILS                                = 'CUSTOMER_SET_CUSTOMER_DETAILS';

// Modal
export const MODAL_SHOW                                                   = 'MODAL/SHOW';
export const MODAL_HIDE                                                   = 'MODAL/HIDE';

// Users list
export const USERS_LIST_UPDATE_SINGLE_USER                                = 'USERS_LIST/UPDATE_SINGLE_USER';
export const USERS_LIST_UPDATE_USERS_BY_TYPE                              = 'USERS_LIST/UPDATE_USERS_BY_TYPE';

// User types
export const USER_TYPES_SET_TYPES_INFORMATION                             = 'USER_TYPES/SET_TYPES_INFORMATION';

// User roles
export const USER_ROLES_SET_ROLES_INFORMATION                             = 'USER_ROLES/SET_ROLES_INFORMATION';

// Work
export const WORK_STAGES_LOADING                                          = 'WORK_STAGES/LOADING';
export const WORK_STAGES_UPDATE                                           = 'WORK_STAGES/UPDATE';

// Projects versions
export const PROJECTS_VERSIONS_START_LOADING                              = 'PROJECTS_VERSIONS/START_LOADING';
export const PROJECTS_VERSIONS_STOP_LOADING                               = 'PROJECTS_VERSIONS/STOP_LOADING';
export const PROJECTS_VERSIONS_SET_ALL_VERSIONS                           = 'PROJECTS_VERSIONS/SET_ALL_VERSIONS';

// Projects list
export const PROJECTS_LIST_START_LOADING                                  = 'PROJECTS_LIST/START_LOADING';
export const PROJECTS_LIST_START_UPDATING                                 = 'PROJECTS_LIST/START_UPDATING';
export const PROJECTS_LIST_STOP_LOADING_AND_UPDATING                      = 'PROJECTS_LIST/STOP_LOADING_AND_UPDATING';
export const PROJECTS_LIST_CHANGE_SEARCH_QUERY                            = 'PROJECTS_LIST/CHANGE_SEARCH_QUERY';
export const PROJECTS_LIST_CHANGE_CLIENT_FILTER                           = 'PROJECTS_LIST/CHANGE_CLIENT_FILTER';
export const PROJECTS_LIST_CHANGE_PAGE                                    = 'PROJECTS_LIST/CHANGE_PAGE';
export const PROJECTS_LIST_CHANGE_PROJECTS                                = 'PROJECTS_LIST/CHANGE_PROJECTS';

// Project board
export const PROJECT_BOARD_START_LOADING                                  = 'PROJECT_BOARD/START_LOADING';
export const PROJECT_BOARD_START_UPDATING                                 = 'PROJECT_BOARD/START_UPDATING';
export const PROJECT_BOARD_STOP_LOADING_AND_UPDATING                      = 'PROJECT_BOARD/STOP_LOADING_AND_UPDATING';
export const PROJECT_BOARD_SET_SELECTED_PROJECT_ID                        = 'PROJECT_BOARD/SET_SELECTED_PROJECT_ID';
export const PROJECT_BOARD_INITIALIZE_PROJECT                             = 'PROJECT_BOARD/INITIALIZE_PROJECT';
export const PROJECT_BOARD_SET_PROJECT_NOTES                              = 'PROJECT_BOARD/SET_PROJECT_NOTES';
export const PROJECT_BOARD_SET_PROJECT_DETAILS                            = 'PROJECT_BOARD/SET_PROJECT_DETAILS';
export const PROJECT_BOARD_SET_PROJECT_HISTORY                            = 'PROJECT_BOARD/SET_PROJECT_HISTORY';
export const PROJECT_BOARD_CHANGE_CAMPAIGNS_USER_ROLE                     = 'PROJECT_BOARD/CHANGE_CAMPAIGNS_USER_ROLE';
export const PROJECT_BOARD_REMOVE_CAMPAIGNS_USER                          = 'PROJECT_BOARD/REMOVE_CAMPAIGNS_USER';
export const PROJECT_BOARD_CHANGE_CAMPAIGNS_EXECUTIVE                     = 'PROJECT_BOARD/CHANGE_CAMPAIGNS_EXECUTIVE';
export const PROJECT_BOARD_CHANGE_CAMPAIGNS_WRITING_OR_MUSIC_TEAM_REQUEST = 'PROJECT_BOARD/CHANGE_CAMPAIGNS_WRITING_OR_MUSIC_TEAM_REQUEST';
export const PROJECT_BOARD_REMOVE_CAMPAIGN                                = 'PROJECT_BOARD/REMOVE_CAMPAIGN';
export const PROJECT_BOARD_ADD_CAMPAIGN                                   = 'PROJECT_BOARD/ADD_CAMPAIGN';
export const PROJECT_BOARD_REMOVE_SPOT                                    = 'PROJECT_BOARD/REMOVE_SPOT';
export const PROJECT_BOARD_ADD_OR_UPDATE_SPOT                             = 'PROJECT_BOARD/ADD_OR_UPDATE_SPOT';
export const PROJECT_BOARD_REMOVE_VERSION                                 = 'PROJECT_BOARD/REMOVE_VERSION';
export const PROJECT_BOARD_ADD_VERSION                                    = 'PROJECT_BOARD/ADD_VERSION';
