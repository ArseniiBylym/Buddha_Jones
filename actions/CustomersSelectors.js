import { createSelector } from 'reselect';

// Getters
export const getAllCustomers = (state) => state.customers.allCustomers;

// Array of all customer IDs
export const allCustomerIds = createSelector(
    [getAllCustomers],
    (customers) => {
        return Object.keys(customers).map((customerId) => customerId);
    }
);
