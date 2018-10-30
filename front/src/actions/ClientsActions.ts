import { action } from 'mobx';
import { ClientsStore } from 'store/AllStores';
import { API, APIPath } from 'fetch';
import { ClientApiResponse, ClientDetailsApiResponse, CustomerContactApiResponse } from 'types/clients';
import { DateHandler } from 'helpers/DateHandler';

enum CustomersFetchType {
    None,
    All,
    ByLetter,
    BySearch,
}

export class ClientsActionsClass {
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
                        (clientDetails.loading === false && clientDetails.customer === null) ||
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
                        customer: null,
                    });
                    clientMatch = ClientsStore.clientsDetails.length - 1;
                }

                const client = ClientsStore.clientsDetails[clientMatch];
                const response = (await API.getData(APIPath.CUSTOMER + '/' + customerId)) as ClientDetailsApiResponse;

                client.loading = false;
                client.lastFetchTimeStamp = Date.now();
                client.customer = {
                    id: customerId,
                    name: response.customerName,
                    cardcode: response.cardcode,
                    contacts: response.contact.map(creativeExecutive => ({
                        id: creativeExecutive.id,
                        clientId: customerId,
                        name: creativeExecutive.name,
                        cardcode: creativeExecutive.cardcode,
                        email: creativeExecutive.email,
                        mobilePhone: creativeExecutive.mobilePhone,
                        officePhone: creativeExecutive.officePhone,
                        postalAddress: creativeExecutive.postalAddress,
                    })),
                };
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchCustomerDetails(customerId, true);
            }, 768);
            throw error;
        }
    };

    @action
    public fetchClientsForStudioOptions = async (customerId: number): Promise<boolean> => {
        try {

            const response = (await API.getData(APIPath.CUSTOMER_CONTACT, {
                customer_id: customerId,
                offset: 0,
                length: 9999999,
            })) as CustomerContactApiResponse[];

            ClientsStore.allClientsForStudio = response.map((client: CustomerContactApiResponse) => {
                return {
                    id: client.id,
                    name: client.name
                };
            });
            return true;
        } catch (error) {
            throw error;
        }
    };

}
