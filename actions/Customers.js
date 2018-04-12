import * as actions from './ActionTypes';
import * as API from './api';
import { toNumber as _toNumber, get as _get, isNil as _isNil, merge as _merge } from 'lodash';

// Selectors
import { allCustomerIds } from './CustomersSelectors';

const initialContactState = {
    customerId: null,
    id: null,
    name: null,
    email: null,
    mobilePhone: null,
    officePhone: null,
    postalAddress: null,
};

const initialCustomerState = {
    id: null,
    customerName: null,
    contact: [],
    lastFetchTimestamp: 0
};

export default function ActionsCustomers(state = {
    allCustomers: {}
}, action) {
    switch (action.type) {
        case actions.CUSTOMER_SET_CUSTOMER_DETAILS:
            return !_isNil(action.id)
                ? {
                    ...state,
                    allCustomers: {
                        ...state.allCustomers,
                        [action.id]: typeof state.allCustomers[action.id] !== 'undefined'
                            ? _merge(state.allCustomers[action.id], action.payload)
                            : _merge(initialCustomerState, action.payload)
                    }
                }
                : state;
            break;

        default:
            return state;
    }
}

/**
 * Fetches customer details
 *
 * @param {number} customerId - ID of the customer profile
 * @param {boolean} [forceFetch = false] - Ignore last fetch timestamp and fetch new customer data
 * @returns Promise
 */
export const fetchCustomerDetails = (customerId, forceFetch) => {
    forceFetch = typeof forceFetch !== 'undefined' ? forceFetch : false;

    return (dispatch, getState) => {
        if (typeof customerId !== 'undefined' && customerId) {
            if (!forceFetch) {
                const { customers: { allCustomers } } = getState();

                // Check if customer has been fetched in the past and find out if re-fetch is needed
                if (typeof allCustomers[customerId] !== 'undefined' && typeof allCustomers[customerId].lastFetchTimestamp !== 'undefined') {
                    const now = Date.now();
                    if (now - allCustomers[customerId].lastFetchTimestamp > 1000 * 60 * 5) {
                        return Promise.resolve();
                    }
                }
            }

            return API.get(API.CUSTOMER + '/' + customerId).then((customer) => {
                console.log(`Customer #${customerId} fetch: `, customer);

                dispatch({
                    type: actions.CUSTOMER_SET_CUSTOMER_DETAILS,
                    id: customerId,
                    payload: {
                        ...customer,
                        lastFetchTimestamp: Date.now(),
                    }
                });

                return Promise.resolve();
            }).catch((error) => {
                console.error('Could not fetch customer #' + customerId + ' details: ', error);
                throw error;
            });
        } else {
            throw new Error('Customer ID is required to fetch customer details');
        }
    };
};

/**
 * Create customer contact and save it to databsae
 *
 * @param {number} customerId - ID of the customer / studio
 * @param {object} details - Detailed information of the contact
 * @param {string} details.name - Full name of the contact
 * @param {string} [details.email = undefined] - Email address of the contact
 * @param {string} [details.phoneMobile = undefined] - Mobile phone number of the contact
 * @param {string} [details.phoneOffice = undefined] - Office phone number of the contact
 * @param {string} [details.address = undefined] - As detailed as needed address of the contact
 * @param {number[]} projectsAndCampaigns - IDs of project + campaigns contact is assigned to
 * @returns Promise
 */
export const actionCreateCustomerContact = (customerId, details, projectsAndCampaigns) => {
    return (dispatch, getState) => {
        if (typeof customerId !== 'undefined' && typeof details.name !== 'undefined' && details.name) {
            return API.post(API.CUSTOMER_CONTACT, API.makePostData({
                customer_id: customerId,
                name: details.name,
                email: _get(details, 'name', undefined),
                mobile_phone: _get(details, 'phoneMobile', undefined),
                office_phone: _get(details, 'phoneOffice', undefined),
                postal_address: _get(details, 'address', undefined),
                project_campaign: !_isNil(projectsAndCampaigns) ? projectsAndCampaigns : undefined
            })).then((response) => {
                dispatch(
                    fetchCustomerDetails(customerId)).then(() => {
                        dispatch({
                            type: actions.CUSTOMER_TOGGLE_SAVING_CONTACT,
                            payload: false
                        });

                        return Promise.resolve();
                    }
                );
            }).catch((error) => {
                throw new Error('Customer ID and at least name in details are required');
            });
        }

        return Promise.resolve();
    };
};
