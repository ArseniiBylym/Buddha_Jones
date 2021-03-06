import { observable, computed } from 'mobx';
import { Client, ClientContact } from 'types/clients';
import { NewClientRequest } from '../actions';

export class Clients {

    @observable public allClientsForStudio: Array<
        {
            id: number;
            name: string;
        }
    >;

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
        contacts: ClientContact[];
    }> = [];

    @computed
    public get clientsDetailsFlatIds(): number[] {
        return this.clientsDetails.map(client => client.id);
    }

    @observable public newClientsRequestList: NewClientRequest[] = [];
    @observable public newClientsRequestListLastFetchTimestamp: number = 0;
    @observable public newClientsRequestListLoading: boolean = false;

/*    @computed
    public get allClientsCreativeExecutives(): ClientContact[] {
        return this.clientsDetails.reduce((contacts: ClientContact[], clientDetails) => {
            if (clientDetails.customer !== null) {
                clientDetails.customer.contacts.map(creativeExecutive => {
                    contacts.push(creativeExecutive);
                });
            }

            return contacts;
        }, []);
    }*/

/*    @computed
    public get allClientsCreativeExecutivesFlatIds(): number[] {
        return this.allClientsCreativeExecutives.map(creativeExecutive => creativeExecutive.id);
    }*/
}
