import { observable, computed } from 'mobx';
import {
    UserProjectRole,
    UsersRequestParams,
    UserType,
    OtherUserDetails,
    ProjectPermissionsType, PageableUsers, OtherUserFromApi,
} from 'types/users';
import { UserTypeClassId } from 'types/user';

export class Users {
    @observable public projectRolesLastFetchTimestamp: number = 0;
    @observable public projectRoles: UserProjectRole[] = [];
    @observable public projectRolesLoading: boolean = false;
    @observable public typesLastFetchTimestamp: number = 0;
    @observable public types: UserType[] = [];
    @observable public typesLoading: boolean = false;
    @observable public isPageableUsersListLoading: boolean = false;
    @observable public isCurrentSelectedUserSaveLoading: boolean = false;
    @observable public projectPermissionsTypesLastFetchTimestamp: number = 0;
    @observable public projectPermissionsTypes: ProjectPermissionsType[] = [];
    @observable public projectPermissionsTypesLoading: boolean = false;
    @observable public currentSelectedUser: OtherUserFromApi | null = null;
    @observable public people: OtherUserDetails[] = [];
    @observable public userTypePermissions: any = null;
    @observable public userTypePermissionsLoading: boolean = false;

    @observable
    public peopleFetchesByClass: Array<{
        classId: UserTypeClassId;
        userTypesIds: number[];
        loading: boolean;
        lastFetchTimestamp: number;
    }> = [];

    @observable
    public peopleFetchesByType: Array<{
        typeId: number;
        typeName: string;
        loading: boolean;
        lastFetchTimestamp: number;
    }> = [];

    @observable
    public usersListRequestParams: Partial<UsersRequestParams> = {
        search: '',
        length: 10,
        page: 1,
    };

    @observable
    public pageableUsersList: PageableUsers = {
        data: [],
        length: null,
        message: '',
        object_count: null,
        offset: null,
        page: null,
        status: null,
        total_count: null,
        totalPages: null
    };

    @computed
    public get loadingUsersProjectRoles(): boolean {
        return this.projectRolesLoading && this.projectRoles.length <= 0;
    }

    @computed
    public get updatingUsersProjectRoles(): boolean {
        return this.projectRolesLoading && this.projectRoles.length > 0;
    }

    @computed
    public get loadingUserTypes(): boolean {
        return this.typesLoading && this.types.length <= 0;
    }

    @computed
    public get loadingProjectPermissionsTypes(): boolean {
        return this.projectPermissionsTypesLoading && this.projectPermissionsTypes.length <= 0;
    }

    @computed
    public get updatingUserTypes(): boolean {
        return this.typesLoading && this.types.length > 0;
    }

    @computed
    public get peopleFlatIds(): number[] {
        return this.people.map(person => person.id);
    }

    @computed
    public get typesFlatIds(): number[] {
        return this.types.map(type => type.id);
    }

    @computed
    public get peopleFetchedByClassFlatIds(): UserTypeClassId[] {
        return this.peopleFetchesByClass.map(fetchClass => fetchClass.classId);
    }

    @computed
    public get peopleFetchedByTypeFlatIds(): number[] {
        return this.peopleFetchesByType.map(type => type.typeId);
    }
}
