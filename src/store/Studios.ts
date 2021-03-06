import { observable, computed } from 'mobx';
import { Client, ClientDetails, ClientContact, ClientsSearch } from 'types/clients';

export class Studios {
    @observable currentStudioId: number | null = null;

    @observable
    public existingClientsInitials: {
        loading: boolean;
        letters: string[];
    } = {
        loading: false,
        letters: [],
    };

    @observable
    public clientsByLetter: Array<{
        letter: string;
        loading: boolean;
        clients: Client[];
    }> = [];

    @computed
    public get clientsByLetterFlat(): string[] {
        return this.clientsByLetter.map(group => group.letter);
    }

    @observable
    public clientsBySearchQuery: Array<{
        query: string;
        loading: boolean;
        clients: Client[];
    }> = [];

    @observable
    public clientsBySearch: ClientsSearch = {
        loading: false,
        totalCount: 0,
        clients: [],
    };

    @computed
    public get clientsBySearchQueryFlat(): string[] {
        return this.clientsBySearchQuery.map(group => group.query);
    }

    @observable
    public allClients: {
        loading: boolean;
        lastFetchTimeStamp: number;
        clients: Client[];
    } = {
        loading: false,
        lastFetchTimeStamp: 0,
        clients: [],
    };

    @observable
    public clientsDetails: Array<{
        id: number;
        loading: boolean;
        lastFetchTimeStamp: number;
        customer: ClientDetails | null;
    }> = [];

    @computed
    public get clientsDetailsFlatIds(): number[] {
        return this.clientsDetails.map(client => client.id);
    }

    @computed
    public get allClientsCreativeExecutives(): ClientContact[] {
        return this.clientsDetails.reduce((contacts: ClientContact[], clientDetails) => {
            if (clientDetails.customer !== null) {
                clientDetails.customer.contacts.map(creativeExecutive => {
                    contacts.push(creativeExecutive);
                });
            }

            return contacts;
        }, []);
    }

    @computed
    public get allClientsCreativeExecutivesFlatIds(): number[] {
        return this.allClientsCreativeExecutives.map(creativeExecutive => creativeExecutive.id);
    }
}
