import { createSelector } from 'reselect';

// Getters
const getGroups = (state, ownProps) => ownProps.groups;

// Get flat list of people
export const getFlatListOfOptions = createSelector(
    [getGroups],
    (groups) => {
        return typeof groups !== 'undefined' && groups
            ? groups.reduce((flatOptions, group) => {
                flatOptions = [
                    ...flatOptions,
                    ...(typeof group.options !== 'undefined' && group.options ? group.options : [])
                ];

                return flatOptions;
            }, [])
            : [];
    }
);
