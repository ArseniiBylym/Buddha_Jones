import { action } from 'mobx';
import { ClientsStore } from 'store/AllStores';
import { API, APIPath } from 'fetch';
import { ClientApiResponse, ClientDetailsApiResponse, ClientForStudio, NewClientRequestFromApi } from 'types/clients';
import { DateHandler } from 'helpers/DateHandler';
import { ClientContact } from '../types/clients';

enum CustomersFetchType {
    None,
    All,
    ByLetter,
    BySearch,
}

export interface NewCustomerFormData {
    id?: number;
    studio_id: number | null;
    name: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    email: string | null;
    phone: string | null;
    billing_contact: string | null;
    billing_email: string | null;
    billing_phone: string | null;
}

export interface NewClientRequest extends NewCustomerFormData {
    studio_name: string | null;
    completed: 0 | 1;
}

export interface NewStudioContactFormData {
    customer_id: number | null;
    name: string;
    title: string;
    email: string;
    mobile_phone: string;
}

export class ClientsActionsClass {
    @action
    public createNewCustomer = async (customer: NewCustomerFormData | null): Promise<any> => {
        try {
            await API.postData(APIPath.CUSTOMER_NEW, customer as Object);
        } catch (error) {
            throw error;
        }
    };

    @action
    public editNewCustomer = async (customer: NewCustomerFormData | null): Promise<any> => {
        try {
            if (customer && customer.id) {
                for (let key in customer) {
                    if (customer[key] === null || customer[key] === 'null') {
                        delete customer[key];
                    }
                }
                await API.putData(APIPath.CUSTOMER_NEW + '/' + customer.id, customer as Object);
            }
        } catch (error) {
            throw error;
        }
    };

    @action
    public createNewStudioContact = async (studioContact: NewStudioContactFormData | null): Promise<any> => {
        try {
            await API.postData(APIPath.CUSTOMER_CONTACT , studioContact as Object);
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchClientsInitialsLetters = async (): Promise<string[]> => {
        try {
            ClientsStore.existingClientsInitials.loading = true;

            const response = (await API.getData(APIPath.CUSTOMER_FIRST_LETTERS)) as string[];
            ClientsStore.existingClientsInitials.letters = response;

            return response;
        } catch (error) {
            throw error;
        } finally {
            ClientsStore.existingClientsInitials.loading = false;
        }
    };

    @action
    public fetchCustomers = async (
        search: string = '',
        letter: string = '',
        offset: number = 0,
        length: number = 1000,
        forceFetch: boolean = false
    ): Promise<boolean> => {
        search = search.trim().toUpperCase();
        letter = letter.trim();

        try {
            let fetchType: CustomersFetchType = CustomersFetchType.None;

            // Prepare data for either grouping by search query or letter
            if (search !== '') {
                fetchType = CustomersFetchType.BySearch;
                const searchIndex = ClientsStore.clientsBySearchQueryFlat.indexOf(search);
                if (searchIndex !== -1) {
                    ClientsStore.clientsBySearchQuery[searchIndex].loading = true;
                } else {
                    ClientsStore.clientsBySearchQuery.push({
                        query: search,
                        loading: true,
                        clients: [],
                    });
                }
            } else if (letter !== '') {
                fetchType = CustomersFetchType.ByLetter;
                const letterIndex = ClientsStore.clientsByLetterFlat.indexOf(letter);
                if (letterIndex !== -1) {
                    ClientsStore.clientsByLetter[letterIndex].loading = false;
                } else {
                    ClientsStore.clientsByLetter.push({
                        letter: letter,
                        loading: true,
                        clients: [],
                    });
                }
            } else if (search === '' && letter === '') {
                fetchType = CustomersFetchType.All;
            }

            if (fetchType !== CustomersFetchType.None && fetchType !== CustomersFetchType.All) {
                // Fetch clients list
                const response = (await API.getData(APIPath.CUSTOMER, {
                    search: fetchType === CustomersFetchType.BySearch ? search : '',
                    first_letter: fetchType === CustomersFetchType.ByLetter ? letter : '',
                    offset,
                    length,
                })) as ClientApiResponse[];

                // Get index of clients group to update
                const index =
                    fetchType === CustomersFetchType.BySearch
                        ? ClientsStore.clientsBySearchQueryFlat.indexOf(search)
                        : ClientsStore.clientsByLetterFlat.indexOf(letter);

                if (index !== -1) {
                    // Update clients list
                    ClientsStore[
                        fetchType === CustomersFetchType.BySearch ? 'clientsBySearchQuery' : 'clientsByLetter'
                        ][index].clients = response.map(client => ({
                        id: client.id,
                        name: client.customerName,
                        cardcode: client.cardcode,
                    }));
                }
            } else if (fetchType === CustomersFetchType.All) {
                // Fetch only if it's not loading, forced or data might be too old
                if (
                    ClientsStore.allClients.loading === false &&
                    (forceFetch ||
                        DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, ClientsStore.allClients.lastFetchTimeStamp))
                ) {
                    ClientsStore.allClients.loading = true;

                    // Fetch all clients list
                    const response = (await API.getData(APIPath.CUSTOMER, {
                        search: '',
                        first_letter: '',
                        offset: 0,
                        length: 9999999,
                    })) as ClientApiResponse[];

                    // Map all clients
                    ClientsStore.allClients.clients = response.map(client => ({
                        id: client.id,
                        name: client.customerName,
                        cardcode: client.cardcode,
                    }));
                }
            }

            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            const searchIndex = ClientsStore.clientsBySearchQueryFlat.indexOf(search);
            if (searchIndex !== -1) {
                ClientsStore.clientsBySearchQuery[searchIndex].loading = false;
            }

            // Stop loading letter results
            const letterIndex = ClientsStore.clientsByLetterFlat.indexOf(letter);
            if (letterIndex !== -1) {
                ClientsStore.clientsByLetter[letterIndex].loading = false;
            }

            // Stop loading all clients results
            ClientsStore.allClients.loading = false;
        }
    };

    @action
    public fetchCustomerDetails = async (customerId: number, forceFetch: boolean = false): Promise<boolean> => {
        try {
            let toFetch: boolean = true;

            // Check if client data is cached and should not be updated
            let clientMatch = ClientsStore.clientsDetailsFlatIds.findIndex(id => id === customerId);
            if (clientMatch !== -1) {
                const clientDetails = ClientsStore.clientsDetails[clientMatch];
                if (
                    forceFetch === false &&
                    (clientDetails.loading ||
                        (clientDetails.loading === false && clientDetails.contacts.length === 0) ||
                        DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, clientDetails.lastFetchTimeStamp) === false)
                ) {
                    toFetch = false;
                }
            }

            if (toFetch) {
                if (clientMatch !== -1) {
                    ClientsStore.clientsDetails[clientMatch].loading = true;
                } else {
                    ClientsStore.clientsDetails.push({
                        id: customerId,
                        lastFetchTimeStamp: 0,
                        loading: true,
                        contacts: []
                    });
                    clientMatch = ClientsStore.clientsDetails.length - 1;
                }

                const client = ClientsStore.clientsDetails[clientMatch];
                const response = (await API.getData(APIPath.CUSTOMER_CONTACT, {
                    customer_id: customerId
                })) as ClientDetailsApiResponse[];

                client.lastFetchTimeStamp = Date.now();
                client.loading = false;
                client.contacts = response.map(contact => {
                    return {
                        id: contact.id,
                        customerId: contact.customerId,
                        name: contact.name,
                        title: contact.title,
                        email: contact.email,
                    };
                });
            }

            return true;
        } catch (error) {
            // TODO fix this kind of error handling all over the project
            setTimeout(() => {
                this.fetchCustomerDetails(customerId, true);
            }, 768);
            throw error;
        }
    };

    @action
    public fetchClientsForStudioOptions = async (studioId: number): Promise<ClientForStudio[]> => {
        try {

            const response = (await API.getData(APIPath.CUSTOMER, {
                studio_id: studioId,
                offset: 0,
                length: 9999999,
            })) as ClientApiResponse[];

            return response.map((client: ClientApiResponse) => {
                return {
                    id: client.id,
                    name: client.customerName
                };
            });
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchCustomerContactsForProjectCampaign = async (projectCampaignId: number): Promise<ClientContact[]> => {
        try {

            const response = (await API.getData(APIPath.PROJECT_CAMPAIGN_CUSTOMER_CONTACT + '/' + projectCampaignId)) as ClientDetailsApiResponse[];

            return response.map((contact: ClientDetailsApiResponse) => {
                delete contact.mobilePhone;
                return contact;
            });
        } catch (error) {
            throw error;
        }
    };

    @action
    public fetchNewClientList = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (ClientsStore.newClientsRequestListLoading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, ClientsStore.newClientsRequestListLastFetchTimestamp))
            ) {
                ClientsStore.newClientsRequestListLoading = true;

                const response = (await API.getData(APIPath.CUSTOMER_NEW, {
                    offset: 0,
                    length: 9999999,
                })) as NewClientRequestFromApi[];

                ClientsStore.newClientsRequestList = response
                    .map((client: NewClientRequestFromApi) => ({
                        id: client.id,
                        studio_id: client.studioId,
                        studio_name: client.studioName,
                        name: client.name,
                        street: client.street,
                        city: client.city,
                        state: client.state,
                        zip: client.zip,
                        email: client.email,
                        phone: client.phone,
                        billing_contact: client.billingContact,
                        billing_email: client.billingEmail,
                        billing_phone: client.billingPhone,
                        completed: client.completed,
                    }));
                ClientsStore.newClientsRequestListLastFetchTimestamp = Date.now();
                ClientsStore.newClientsRequestListLoading = false;
            }

            return true;
        } catch (error) {
            // TODO fix this kind of error handling all over the project
            setTimeout(() => {
                this.fetchNewClientList(true);
            }, 512);
            throw error;
        }
    };

}
