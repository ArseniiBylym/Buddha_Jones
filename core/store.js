import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import ActionsWindow from './../actions/Window';
import ActionsNavigation from './../actions/Navigation';
import ActionsModal from './../actions/Modal';
import ActionsHeader from './../actions/Header';
import ActionsNotifications from './../actions/Notifications';
import ActionsUser from './../actions/User';
import ActionsUsers from './../actions/Users';
import ActionsUserRoles from './../actions/UserRoles';
import ActionsUserTypes from './../actions/UserTypes';
import ActionsCustomers from './../actions/Customers';
import ActionsWork from './../actions/Work';
import ActionsProjectsList from './../actions/ProjectsList';
import ActionsProjectBoard from './../actions/ProjectBoard';
import ActionsProjectsVersions from './../actions/ProjectsVersions';

// Combine reducers
const reducers = combineReducers({
    window: ActionsWindow,
    navigation: ActionsNavigation,
    modal: ActionsModal,
    header: ActionsHeader,
    notifications: ActionsNotifications,
    user: ActionsUser,
    users: ActionsUsers,
    userRoles: ActionsUserRoles,
    userTypes: ActionsUserTypes,
    customers: ActionsCustomers,
    work: ActionsWork,
    projectsList: ActionsProjectsList,
    projectBoard: ActionsProjectBoard,
    projectsVersions: ActionsProjectsVersions
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
