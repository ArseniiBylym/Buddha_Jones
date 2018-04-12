import { createSelector } from 'reselect';
import { isNil as _isNil, get as _get } from 'lodash';
import { getSelectedProjectsCustomerId } from './../../../actions/ProjectBoardSelectors';
import { getAllCustomers } from './../../../actions/CustomersSelectors';

// Getters
const getCreativeExecutiveId = (state, ownProps) => _get(ownProps, 'campaign.firstPointOfContactId', null);
const getCampaignSpots = (state, ownProps) => _get(ownProps, 'campaign.spots', []);

// Get customer details that match the campaign
export const getCampaignCustomer = createSelector(
    [getSelectedProjectsCustomerId, getAllCustomers],
    (customerId, allCustomers) => customerId !== null && typeof allCustomers[customerId] !== 'undefined'
        ? allCustomers[customerId]
        : null
);

// Check if creative executive is assigned
export const getHasCreativeExecutiveAssigned = createSelector(
    [getCreativeExecutiveId],
    (creativeExecutiveId) => creativeExecutiveId ? true : false
);

// Check if campaign has spots assigned
export const getHasSpotsAssigned = createSelector(
    [getCampaignSpots],
    (spots) => spots && typeof spots.length !== 'undefined' && spots.length > 0 ? true : false
);
