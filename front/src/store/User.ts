import { observable, computed, observe } from 'mobx';
import { UserData } from '../types/user';
import { Route } from 'types/routes';
import { routes } from 'routes';
import { ProjectsCampaignsSpotsActions, TimeEntryActions } from 'actions';

export class User {
    @observable public token: string | null = null;
    @observable public data: UserData | null = null;

    @computed
    public get isLoggedIn(): boolean {
        return this.token !== null && this.token !== '' && this.data !== null && Boolean(this.data.status);
    }
    @computed
    public get routes(): Route[] {
        return this.isLoggedIn
            ? routes.filter(route => {
                if (route.allowAllUsers) {
                    return true;
                }
                if (this.data !== null && route.moduleAccess && route.subModuleAccess && this.getSubmoduleAccess(route.moduleAccess, route.subModuleAccess, this.data.moduleAccess)) {
                    return true;
                }
                // if (this.data !== null && this.data.allowedRouteKeys.indexOf(route.accessKey) !== -1) {
                //     return true;
                // }
                return false;
            })
            : [];
    }

    getSubmoduleAccess = (moduleAccess, subModuleAccess, subModulesArr) => {

        const moduleItem = subModulesArr.find((item, i) => {
            return moduleAccess === item.moduleName;
        });
        if (!moduleItem) {
            return false;
        }

        const subModuleItem = moduleItem.subModule.find((item, i) => {
            return subModuleAccess === item.subModuleName;
        });
        if (!subModuleItem) {
            return false;
        }

        return subModuleItem.canAccess;
    }

    constructor() {
        // React to user logouts
        // @ts-ignore
        observe(this, 'data', (newUserData, oldUserData) => {
            if (newUserData === null && oldUserData !== null) {
                ProjectsCampaignsSpotsActions.removeFetchedProjectsCampaignsAndSpotsOfUser(oldUserData.id);
                TimeEntryActions.resetTimeEntry();
            }
        });
    }
}
