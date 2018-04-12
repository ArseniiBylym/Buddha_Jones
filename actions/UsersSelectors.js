import { createSelector } from 'reselect';

// Getters
const getAllUsers = (state) => state.users.people;

// Get all users grouped by user type
export const getAllUsersGroupedByType = createSelector(
    [getAllUsers],
    (allUsers) => {
        if (typeof allUsers === 'object' && allUsers) {
            return Object.values(allUsers).reduce((userGroups, user) => {
                if (typeof user.typeId !== 'undefined' && user.typeId) {
                    if (typeof userGroups[user.typeId] === 'undefined') {
                        userGroups[user.typeId] = [];
                    }

                    userGroups[user.typeId].push(user);
                }

                return userGroups;
            }, {});
        }

        return {};
    }
);
