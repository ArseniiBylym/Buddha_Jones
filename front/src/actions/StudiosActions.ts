import { action } from 'mobx';
import { StudiosStore } from 'store/AllStores';
import { API, APIPath } from 'fetch';
import { StudioApiResponse } from 'types/clients';
import { DateHandler } from 'helpers/DateHandler';

enum StudiosFetchType {
    None,
    All,
    ByLetter,
    BySearch,
}

export class StudiosActionsClass {
    @action
    public fetchStudiosInitialsLetters = async (): Promise<string[]> => {
        try {
            StudiosStore.existingClientsInitials.loading = true;

            const response = (await API.getData(APIPath.STUDIO_FIRST_LETTERS)) as string[];
            StudiosStore.existingClientsInitials.letters = response;

            return response;
        } catch (error) {
            throw error;
        } finally {
            StudiosStore.existingClientsInitials.loading = false;
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
            let fetchType: StudiosFetchType = StudiosFetchType.None;

            // Prepare data for either grouping by search query or letter
            if (search !== '') {
                fetchType = StudiosFetchType.BySearch;
                const searchIndex = StudiosStore.clientsBySearchQueryFlat.indexOf(search);
                if (searchIndex !== -1) {
                    StudiosStore.clientsBySearchQuery[searchIndex].loading = true;
                } else {
                    StudiosStore.clientsBySearchQuery.push({
                        query: search,
                        loading: true,
                        clients: [],
                    });
                }
            } else if (letter !== '') {
                fetchType = StudiosFetchType.ByLetter;
                const letterIndex = StudiosStore.clientsByLetterFlat.indexOf(letter);
                if (letterIndex !== -1) {
                    StudiosStore.clientsByLetter[letterIndex].loading = false;
                } else {
                    StudiosStore.clientsByLetter.push({
                        letter: letter,
                        loading: true,
                        clients: [],
                    });
                }
            } else if (search === '' && letter === '') {
                fetchType = StudiosFetchType.All;
            }

            if (fetchType !== StudiosFetchType.None && fetchType !== StudiosFetchType.All) {
                // Fetch clients list
                const response = (await API.getData(APIPath.STUDIO, {
                    search: fetchType === StudiosFetchType.BySearch ? search : '',
                    first_letter: fetchType === StudiosFetchType.ByLetter ? letter : '',
                    offset,
                    length,
                })) as StudioApiResponse[];

                // Get index of clients group to update
                const index =
                    fetchType === StudiosFetchType.BySearch
                        ? StudiosStore.clientsBySearchQueryFlat.indexOf(search)
                        : StudiosStore.clientsByLetterFlat.indexOf(letter);

                if (index !== -1) {
                    // Update clients list
                    StudiosStore[
                        fetchType === StudiosFetchType.BySearch ? 'clientsBySearchQuery' : 'clientsByLetter'
                    ][index].clients = response.map(client => ({
                        id: client.id,
                        name: client.studioName,
                        cardcode: client.cardcode,
                    }));
                }
            } else if (fetchType === StudiosFetchType.All) {
                // Fetch only if it's not loading, forced or data might be too old
                if (
                    StudiosStore.allClients.loading === false &&
                    (forceFetch ||
                        DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, StudiosStore.allClients.lastFetchTimeStamp))
                ) {
                    StudiosStore.allClients.loading = true;

                    // Fetch all clients list
                    const response = (await API.getData(APIPath.STUDIO, {
                        search: '',
                        first_letter: '',
                        offset: 0,
                        length: 9999999,
                    })) as StudioApiResponse[];

                    // Map all clients
                    StudiosStore.allClients.clients = response.map(client => ({
                        id: client.id,
                        name: client.studioName,
                        cardcode: client.cardcode,
                    }));
                }
            }

            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            const searchIndex = StudiosStore.clientsBySearchQueryFlat.indexOf(search);
            if (searchIndex !== -1) {
                StudiosStore.clientsBySearchQuery[searchIndex].loading = false;
            }

            // Stop loading letter results
            const letterIndex = StudiosStore.clientsByLetterFlat.indexOf(letter);
            if (letterIndex !== -1) {
                StudiosStore.clientsByLetter[letterIndex].loading = false;
            }

            // Stop loading all clients results
            StudiosStore.allClients.loading = false;
        }
    };

}
