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

export interface ProjectPermissionsType {
    projectPermissionId: number;
    projectPermsisionKey: string;
    projectPermissionLabel: string;
    canView: 1 | 0;
    canEdit: 1 | 0;
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
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    initials: string | null;
    typeId: number;
    typeName: string;
    salaryType?: string;
    salaryAmount?: string;
    minHour?: string | null;
    hourlyRate?: string | null;
    status: 1 | 0;
    lastLoginDate: DateObjectFromApi | null;
    createdDate: DateObjectFromApi;
}

export interface UsersListFromApi {
    total_count: number;
    users: OtherUserFromApi[];
}

export interface UserTypeFromApi {
    id: number;
    type_name: string;
}

export interface ProjectPermissionsTypeFromApi {
    permissions: ProjectPermissionsTypeSingleFromApi[];
}

export interface ProjectPermissionsTypeSingleFromApi {
    userTypeId: number;
    projectPermissionId: number;
    projectPermsisionKey: string;
    projectPermissionLabel: string;
    canView: 1 | 0;
    canEdit: 1 | 0;
}

export interface ProjectPermissionData {
    user_type_id: number;
    permissions: string;
}

export interface ProjectPermissionDataSingle {
    project_permission_id: number;
    can_view: 1 | 0;
    can_edit: 1 | 0;
}
