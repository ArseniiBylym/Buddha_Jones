import { createSelector } from 'reselect';
import { getAllUsersGroupedByType } from './../../actions/UsersSelectors';

// Getters
const getAllUsers = (state) => state.users.people;
const getAllTypes = (state) => state.userTypes.types;
const getSelectedTypesIds = (state, ownProps) => ownProps.showUsersOfTypesIds;

// Get users limited by type
export const getAllUsersByType = createSelector(
    [getSelectedTypesIds, getAllTypes, getAllUsersGroupedByType],
    (typesIds, allTypes, allUsersGroupedByType) => {
        if (
            typeof typesIds === 'object' && typesIds &&
            typeof allTypes === 'object' && allTypes &&
            typeof allUsersGroupedByType === 'object' && allUsersGroupedByType
        ) {
            return typesIds.filter(typeId =>
                typeof allTypes[typeId] !== 'undefined' &&
                typeof allUsersGroupedByType[typeId] !== 'undefined'
            ).map((typeId) => {
                return {
                    value: typeId,
                    label: typeof allTypes[typeId] !== 'undefined'
                        && typeof allTypes[typeId].name !== 'undefined'
                        && allTypes[typeId].name
                            ? allTypes[typeId].name
                            : typeId.toString(),
                    options: typeof allUsersGroupedByType[typeId] !== 'undefined'
                        ? allUsersGroupedByType[typeId].map(user => ({
                            value: user.id,
                            label: typeof user.fullName !== 'undefined' && user.fullName
                                ? user.fullName
                                : typeof user.username !== 'undefined' && user.username
                                    ? user.username
                                    : typeof user.email !== 'undefined' && user.email
                                        ? user.email
                                        : '',
                        }))
                        : [],
                };
            });
        } else {
            return [];
        }
    }
);
