import {DateObjectFromApi} from "./api";

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
    customerId: number;
    name: string;
    title: string | null;
    email: string | null;
    mobilePhone: string | null;
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
    customerId: number;
    name: string;
    title: string | null;
    email: string | null;
}

export interface NewClientRequest {
    id: number;
    studio_id: number;
    studio_name: string | null;
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
    completed: 0 | 1;
    created_by: 0 | 1;
    updated_by: 0 | 1;
}

export interface NewClientRequestFromApi {
    id: number;
    studioId: number;
    studioName: string | null;
    name: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    email: string | null;
    phone: string | null;
    billingContact: string | null;
    billingEmail: string | null;
    billingPhone: string | null;
    completed: 0 | 1;
    createdBy: 0 | 1;
    updatedBy: 0 | 1;
    createdAt: DateObjectFromApi;
    updatedAt: DateObjectFromApi;
}
