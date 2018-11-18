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
            ? routes.filter(
                route =>
                    route.allowAllUsers ||
                    (this.data !== null
                        ? this.data.allowedRouteKeys.indexOf(route.accessKey) !== -1
                        : false)
            )
            : [];
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
