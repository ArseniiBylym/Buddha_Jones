import { createSelector } from 'reselect';
import { get as _get } from 'lodash';

// Getters
const getVersionName = (state, ownProps) => _get(ownProps, 'name', '');
