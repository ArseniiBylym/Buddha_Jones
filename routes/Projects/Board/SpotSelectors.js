import { createSelector } from 'reselect';
import { get as _get } from 'lodash';

// Getters
const getSpotVersions = (state, ownProps) => _get(ownProps, 'versions', []);
const getAllVersions = (state) => _get(state, 'projectsVersions.allVersions', []);

// Get IDs of spot versions
export const getSpotVersionsIds = createSelector(
    [getSpotVersions],
    (versions) => versions.map((v) => v.id)
);

// Get available to select versions
export const getRemainingVersions = createSelector(
    [getSpotVersionsIds, getAllVersions],
    (selectedVersionsIds, allVersions) => allVersions.filter((v) => selectedVersionsIds.indexOf(v.value) === -1)
);
