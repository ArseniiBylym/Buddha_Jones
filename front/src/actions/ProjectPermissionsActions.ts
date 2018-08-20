import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { ProjectPermissionsStore } from 'store/AllStores';
import { UserPermissionsResponse, UserPermission } from 'types/projectPermissions';

export class ProjectPermissionsActionsClass {
    @action
    public fetchLoggedInUserPermissions = async (): Promise<boolean> => {
        try {
            ProjectPermissionsStore.loadingCount++;

            const response = (await API.getData(APIPath.USER_PROJECT_PERMISSIONS)) as UserPermissionsResponse;
            ProjectPermissionsStore.loggedInUserPermissions = response.permissions.reduce(
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
            setTimeout(() => {
                this.fetchLoggedInUserPermissions();
                ProjectPermissionsStore.loadingCount--;
            }, 512);
            throw error;
        }
    };
}
