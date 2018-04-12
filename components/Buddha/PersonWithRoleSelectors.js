import { createSelector } from 'reselect';

// Getters
const getAllUsers = (state) => state.users.people;
const getUserId = (state, ownProps) => ownProps.userId;
const getRoles = (state) => state.userRoles.roles;
const getRoleId = (state, ownProps) => ownProps.roleId;

// Get user details
export const getUserDetails = createSelector(
    [getUserId, getAllUsers],
    (id, users) => typeof users !== 'undefined' && users
        ? Object.values(users).find((user) => user.id === id) || null
        : null
);

// Get role details
export const getRoleDetails = createSelector(
    [getRoleId, getRoles],
    (id, roles) => id && typeof roles !== 'undefined' && roles
        ? Object.values(roles).find((role) => role.id === id) || null
        : null
);
