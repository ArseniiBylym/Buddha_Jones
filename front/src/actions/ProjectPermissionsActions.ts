import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { ProjectPermissionsStore } from 'store/AllStores';
import { UserPermission } from 'types/projectPermissions';
import { UserPermissionFromApi } from '../types/projectPermissions';

export class ProjectPermissionsActionsClass {
    @action
    public fetchLoggedInUserPermissions = async (): Promise<boolean> => {
        try {
            ProjectPermissionsStore.loadingCount++;

            const response = (await API.getData(APIPath.USER_PROJECT_PERMISSIONS)) as UserPermissionFromApi[];
            ProjectPermissionsStore.loggedInUserPermissions = response.reduce(
                (allPermissions: { [key: string]: UserPermission }, permission) => {
                    allPermissions[permission.projectPermsisionKey] = {
                        id: permission.projectPermissionId,
                        key: permission.projectPermsisionKey,
                        canView: permission.canView ? true : false,
                        canEdit: permission.canEdit ? true : false,
                    };
                    return allPermissions;
                },
                {}
            );

            ProjectPermissionsStore.loadingCount--;
            return true;
        } catch (error) {
            // TODO fix this kind of error handling all over the project
            setTimeout(() => {
                this.fetchLoggedInUserPermissions();
                ProjectPermissionsStore.loadingCount--;
            }, 512);
            throw error;
        }
    };
}
