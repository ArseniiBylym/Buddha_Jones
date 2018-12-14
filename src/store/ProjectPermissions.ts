import { observable } from 'mobx';
import { UserPermission } from 'types/projectPermissions';

export class ProjectPermissions {
    @observable loggedInUserPermissions: { [key: string]: UserPermission } = {};
    @observable loadingCount: number = 0;
}
