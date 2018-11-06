export interface ClientForStudio {
    id: number | null;
    name: string | null;
}

export interface ClientApiResponse {
    id: number;
    customerName: string;
    cardcode: string | null;
    cardname: string | null;
}

export interface CustomerContactApiResponse {
    id: number;
    customerId: number;
    name: string;
    email: string | null;
    mobilePhone: string | null;
    projectCampaign: number[];
}

export interface StudioApiResponse {
    id: number;
    studioName: string;
    cardcode: string | null;
}

export interface Client {
    id: number;
    name: string;
    cardcode: string | null;
}

export interface ClientDetailsApiResponse {
    id: number;
    studioId: number;
    cardcode: string | null;
    cardname: string | null;
    contact: Array<{
        id: number;
        customerId: number;
        name: string;
        title: string | null;
        email: string | null;
        mobilePhone: string | null;
    }>;
}

/*export interface ClientContactApiResponse {
    id: number;
    name: string;
    customerId: number;
    cardcode: string | null;
    email: string | null;
    mobilePhone: string | null;
    officePhone: string | null;
    postalAddress: string | null;
}*/

export interface ClientDetails {
    id: number;
    name: string | null;
    cardcode: string | null;
    contacts: ClientContact[];
}

export interface ClientContact {
    id: number;
    name: string;
    title: string | null;
    email: string | null;
}
