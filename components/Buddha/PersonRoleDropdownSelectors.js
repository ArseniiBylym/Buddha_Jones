import { createSelector } from 'reselect';

// Getters
const getAllRoles = (state) => state.userRoles.roles;
const getSelectedRoleId = (state, ownProps) => ownProps.selectedRoleId;

// Get user role details
export const getUserRoleDetails = createSelector(
    [getAllRoles, getSelectedRoleId],
    (allRoles, roleId) => typeof allRoles !== 'undefined' && allRoles && typeof roleId !== 'undefined' && roleId
        ? typeof allRoles[roleId] !== 'undefined'
            ? allRoles[roleId]
            : null
        : null
);

// Get user roles and prepare it for options list
export const getAllRolesAsOptionsList = createSelector(
    [getAllRoles, getSelectedRoleId],
    (roles, roleId) => typeof roles !== 'undefined' && roles
        ? Object.values(roles).map((role) => ({
            key: 'role-' + role.id,
            value: role.id,
            label: role.name
        }))
        : []
);
