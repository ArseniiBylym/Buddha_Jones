import { action } from 'mobx';
import { ActivitiesStore, UsersStore } from 'store/AllStores';
import { API, APIPath } from 'fetch';
import { ActivityFromApi, ActivityTypeFromApi, ActivityData, Activity } from 'types/activities';
import { DateHandler } from 'helpers/DateHandler';

export class ActivitiesActionsClass {
    @action
    public fetchActivityList = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (ActivitiesStore.activitiesLoading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(5, ActivitiesStore.activitiesLastFetchTimestamp))
            ) {
                ActivitiesStore.activitiesLoading = true;

                const response = (await API.getData(APIPath.ACTIVITY)) as ActivityFromApi[];

                ActivitiesStore.activities = response
                    .sort(
                        (activityA, activityB) =>
                            activityA.id > activityB.id ? 1 : activityB.id > activityA.id ? -1 : 0
                    )
                    .map(activity => ({
                        id: activity.id,
                        name: activity.name || '',
                        typeId: activity.type && activity.type.length > 0 ? activity.type[0].id : 0,
                        typeName: activity.type && activity.type.length > 0 ? activity.type[0].activityType : '',
                        userTypes: activity.userType.map(type => ({
                            id: type.id,
                            name: type.typeName,
                        })),
                        isBillable: activity.billable ? true : false,
                        isDescriptionRequired: activity.descriptionRequired ? true : false,
                        isProjectCampaignRequired: activity.projectCampaignRequired ? true : false,
                        isSpotVersionRequired: activity.projectCampaignSpotVersionRequired ? true : false,
                        areFilesRequired: activity.filesIncluded ? true : false,
                        isActive: activity.status ? true : false,
                    }));
                ActivitiesStore.activitiesLastFetchTimestamp = Date.now();
                ActivitiesStore.activitiesLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchActivityList(true);
            }, 512);

            throw error;
        }
    };

    @action
    public fetchActivitiesTypes = async (forceFetch: boolean = false): Promise<boolean> => {
        try {
            if (
                forceFetch ||
                (ActivitiesStore.activitiesTypesLoading === false &&
                    DateHandler.checkIfTimeStampIsOlderThanXMinutes(
                        5,
                        ActivitiesStore.activitiesTypesLastFetchTimestamp
                    ))
            ) {
                ActivitiesStore.activitiesTypesLoading = true;

                const response = (await API.getData(APIPath.ACTIVITY_LEVEL)) as ActivityTypeFromApi[];

                ActivitiesStore.activitiesTypes = response.map(type => ({
                    id: type.id,
                    name: type.activityType,
                }));
                ActivitiesStore.activitiesTypesLastFetchTimestamp = Date.now();
                ActivitiesStore.activitiesTypesLoading = false;
            }

            return true;
        } catch (error) {
            setTimeout(() => {
                this.fetchActivitiesTypes(true);
            }, 512);

            throw error;
        }
    };

    @action
    public saveActivity = async (activityData: ActivityData): Promise<boolean> => {
        try {
            const activity = {
                name: activityData.name,
                type_id: JSON.stringify([activityData.activityType]),
                user_type_id: JSON.stringify(activityData.selectedUserTypesIds),
                description_required: activityData.isDescriptionRequired ? 1 : 0,
                project_campaign_required: activityData.isProjectCampaignRequired ? 1 : 0,
                project_campaign_spot_version_required: activityData.isSpotVersionRequired ? 1 : 0,
                files_included: activityData.areFilesRequired ? 1 : 0,
                status: activityData.isActive ? 1 : 0,
            };

            const activityTypeFound = ActivitiesStore.activitiesTypes.find(t => t.id === activityData.activityType);

            const activityUpdate: Activity = {
                id: 0,
                name: activityData.name,
                typeId: activityData.activityType,
                typeName: activityTypeFound ? activityTypeFound.name : '',
                userTypes: activityData.selectedUserTypesIds.map(userTypeId => {
                    const userTypeFound = UsersStore.types.find(t => t.id === userTypeId);

                    return {
                        id: userTypeId,
                        name: userTypeFound ? userTypeFound.name : '',
                    };
                }),
                isDescriptionRequired: activityData.isDescriptionRequired,
                isProjectCampaignRequired: activityData.isProjectCampaignRequired,
                isSpotVersionRequired: activityData.isSpotVersionRequired,
                areFilesRequired: activityData.areFilesRequired,
                isBillable: false,
                isActive: activityData.isActive,
            };

            if (activityData.id !== null) {
                await API.putData(APIPath.ACTIVITY + '/' + activityData.id, activity);
                let activityFound = ActivitiesStore.activities.find(a => a.id === activityData.id);
                if (activityFound) {
                    activityFound.name = activityUpdate.name;
                    activityFound.typeId = activityUpdate.typeId;
                    activityFound.typeName = activityUpdate.typeName;
                    activityFound.userTypes = activityUpdate.userTypes;
                    activityFound.isDescriptionRequired = activityUpdate.isDescriptionRequired;
                    activityFound.isProjectCampaignRequired = activityUpdate.isProjectCampaignRequired;
                    activityFound.isSpotVersionRequired = activityUpdate.isSpotVersionRequired;
                    activityFound.areFilesRequired = activityUpdate.areFilesRequired;
                    activityFound.isBillable = activityUpdate.isBillable;
                    activityFound.isActive = activityUpdate.isActive;
                }
            } else {
                const response = (await API.postData(APIPath.ACTIVITY, activity)) as {
                    activity_id: number;
                };
                ActivitiesStore.activities.push({
                    ...activityUpdate,
                    id: response.activity_id,
                });
            }

            return true;
        } catch (error) {
            throw error;
        }
    };

    @action
    public changeActivitiesFilterBySearch = (query: string) => {
        ActivitiesStore.filterActivitiesBySearch = query;
    };

    @action
    public changeActivitiesFilterByTypeId = (typeId: number | null) => {
        ActivitiesStore.filterActivitiesByTypeId = typeId;
    };
}
