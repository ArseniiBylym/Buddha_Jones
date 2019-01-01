import { action } from 'mobx';
import { API, APIPath } from 'fetch';
import { TimeApprovalPermissionsStore } from '../store/AllStores';

export class TimeApprovalPermissionsClass {
    @action
    public getTimeApprovalPermissions = async (): Promise<boolean> => {
        try {
            TimeApprovalPermissionsStore.loading = true;
            const response = (await API.getData(`${APIPath.TIME_APPROVAL_PERMISSION}`, {}, false, true)) as {
                data: [{
                    approverUserTypeId: number,
                    approverUserTypeName: string,
                    submittingUserType: [{
                        submittingUserTypeId: number,
                        submittingUserTypeName: string,
                    }]
                }]
            };
            const mappedData = {};

            response.data.forEach((item) => {
                mappedData[item.approverUserTypeId] = item.submittingUserType.map((ut) => ut.submittingUserTypeId);
            });

            TimeApprovalPermissionsStore.data = mappedData;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            TimeApprovalPermissionsStore.loading = false;
        }
    };

    @action
    public changeTimeApprovalPermission = (submitterId: number, id: number) => {
        const submitter = TimeApprovalPermissionsStore.data[submitterId];
        if (submitter) {
            const index = submitter.indexOf(id);
            const dataClone = {...TimeApprovalPermissionsStore.data};
            if (index === -1) {
                dataClone[submitterId].push(id);
            } else {
                dataClone[submitterId].splice(index, 1);
            }
            TimeApprovalPermissionsStore.data = dataClone;
        } else {
            TimeApprovalPermissionsStore.data[submitterId] = [id];
        }
        TimeApprovalPermissionsStore.touched = true;
    };

    @action
    public saveTimeApprovalPermission = async (id: number): Promise<boolean> => {
        TimeApprovalPermissionsStore.saving = true;
        try {
            const response = (await API.putData(`${APIPath.TIME_APPROVAL_PERMISSION}/${id}`, {
                approver_user_type_id: JSON.stringify(TimeApprovalPermissionsStore.data[id])
            })) as [{
                approverUserTypeId: number,
                approverUserTypeName: string,
                submittingUserType: [{
                    submittingUserTypeId: number,
                    submittingUserTypeName: string,
                }]
            }];
            const mappedData = {};
            response.forEach((item) => {
                mappedData[item.approverUserTypeId] = item.submittingUserType.map((ut) => ut.submittingUserTypeId);
            });

            TimeApprovalPermissionsStore.data = mappedData;

            TimeApprovalPermissionsStore.touched = false;
            return true;
        } catch (error) {
            throw error;
        } finally {
            // Stop loading search results
            TimeApprovalPermissionsStore.saving = false;
        }
    };
}
