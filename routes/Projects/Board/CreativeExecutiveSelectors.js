import { createSelector } from 'reselect';
import { getSelectedProjectsCustomerId } from './../../../actions/ProjectBoardSelectors';
import { getAllCustomers } from './../../../actions/CustomersSelectors';

// Getters
const getSelectedExecutiveId = (state, ownProps) => ownProps.executiveId;

// Get customer's creative executives
export const getCustomerCreativeExecutives = createSelector(
    [getSelectedProjectsCustomerId, getAllCustomers],
    (customerId, allCustomers) => customerId !== null && typeof allCustomers[customerId] !== 'undefined'
        ? allCustomers[customerId].contact
        : []
);

// Get selected creative executive details
export const getSelectedCustomerCreativeExecutiveDetails = createSelector(
    [getSelectedExecutiveId, getCustomerCreativeExecutives],
    (executiveId, executives) => executiveId !== null
            ? executives.find((executive) => executive.id === executiveId)
            : null
);

// Get selected creative executive contact info
export const getSelectedCustomerCreativeExecutiveContactInfo = createSelector(
    [getSelectedCustomerCreativeExecutiveDetails],
    (executive) => {
        const info = [];

        if (executive) {
            // Mobile phone
            if (typeof executive.mobilePhone !== 'undefined' && executive.mobilePhone) {
                info.push({
                    key: 'mobilePhone',
                    type: 'phone',
                    value: executive.mobilePhone,
                });
            }

            // Office phone
            if (typeof executive.officePhone !== 'undefined' && executive.officePhone) {
                info.push({
                    key: 'officePhone',
                    type: 'phone',
                    value: executive.officePhone,
                });
            }

            // Email address
            if (typeof executive.email !== 'undefined' && executive.email) {
                info.push({
                    key: 'email',
                    type: 'email',
                    value: executive.email,
                });
            }

            // Postal address
            if (typeof executive.postalAddress !== 'undefined' && executive.postalAddress) {
                info.push({
                    key: 'postalAddress',
                    type: 'address',
                    value: executive.postalAddress,
                });
            }
        }

        return info;
    }
);
