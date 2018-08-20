import { DateObjectFromApi } from './api';

export interface UserProjectRole {
    id: number;
    name: string;
}

export interface UserProjectRoleFromApi {
    id: number;
    role_name: string;
}

export interface UserType {
    id: number;
    name: string;
}

export interface OtherUserDetails {
    id: number;
    loading: boolean;
    lastFetchTimestamp: number;
    data: OtherUser | null;
}

export interface OtherUser {
    id: number;
    username: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    initials: string | null;
    image: string | null;
    typeId: number;
    typeName: string;
    status: boolean;
}

export interface OtherUsersFromApi {
    total_count: number;
    users: OtherUserFromApi[];
}

export interface OtherUserFromApi {
    id: number;
    username: string;
    email: string | null;
    image: string | null;
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    initials: string | null;
    type_id: number;
    type_name: string;
    salary_type?: string;
    salary_amount?: string;
    min_hour?: string | null;
    hourly_rate?: string | null;
    status: 1 | 0;
    last_login_date: DateObjectFromApi | null;
    created_date: DateObjectFromApi;
}

export interface UsersListFromApi {
    total_count: number;
    users: OtherUserFromApi[];
}

export interface UserTypeFromApi {
    id: number;
    type_name: string;
}
