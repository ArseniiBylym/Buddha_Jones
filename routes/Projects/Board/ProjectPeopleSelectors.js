import { createSelector } from 'reselect';

// Getters
const getUserRoles = (state) => state.userRoles.roles;
const getUserTypes = (state) => state.userTypes.types;
const getUsers = (state, ownProps) => ownProps.users;

// User roles count
export const getUserRolesCount = createSelector(
    [getUserRoles],
    (userRoles) => typeof userRoles !== 'undefined' && userRoles
        ? Object.keys(userRoles).length
        : 0
);

// User types count
export const getUserTypesCount = createSelector(
    [getUserTypes],
    (userTypes) => typeof userRoles !== 'undefined' && userRoles
        ? Object.keys(userTypes).length
        : 0
);

// Get user IDs
export const getUsersIds = createSelector(
    [getUsers],
    (users) => users.map(user => typeof user.userId !== 'undefined' && user.userId ? user.userId : null)
);
