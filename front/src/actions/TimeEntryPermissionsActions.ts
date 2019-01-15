import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { TimeEntryPermissionsStore } from '../store/AllStores';

export class TimeEntryPermissionsClass {
    @action
    public getTimeEntryPermissions = async (): Promise<boolean> => {
        try {
            TimeEntryPermissionsStore.loading = true;
            const response = (await API.getData(`${APIPath.TIME_ENTRY_PERMISSION}`, {}, false, true)) as {
                data: [{
                    id: number,
                    typeName: string,
                }]
            };
            TimeEntryPermissionsStore.data = response.data.map((item) => item.id);
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            TimeEntryPermissionsStore.loading = true;
        }
    };

    @action
    public changeTimeEntryPermission = (id: number) => {
        const index = TimeEntryPermissionsStore.data.indexOf(id);
        if (index === -1) {
            TimeEntryPermissionsStore.data.push(id);
        } else {
            TimeEntryPermissionsStore.data.splice(index, 1);
        }
        TimeEntryPermissionsStore.touched = true;
    };

    @action
    public saveTimeEntryPermissions = async (): Promise<boolean> => {
        TimeEntryPermissionsStore.saving = true;
        try {
            const response = (await API.postData(`${APIPath.TIME_ENTRY_PERMISSION}`, {
                user_type_ids: JSON.stringify(TimeEntryPermissionsStore.data)
            })) as [{
                id: number,
                typeName: string,
            }];
            TimeEntryPermissionsStore.data = response.map((item) => item.id);
            TimeEntryPermissionsStore.touched = false;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            TimeEntryPermissionsStore.saving = false;
        }
    };
}
