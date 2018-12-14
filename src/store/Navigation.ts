import { observable, computed } from 'mobx';
import { NavigationGroupDetails, NavigationLinkDetails } from '../types/navigation';
import { UserStore } from './AllStores';

export class Navigation {
    @observable public sidebarExpanded: boolean = false;
    @observable public hoveredGroupKey: string | null = null;
    @observable public activeGroupKey: string | null = null;
    @observable public activeLinkKey: string | null = null;

    @computed
    public get navigationGroups(): { [groupKey: string]: NavigationGroupDetails } {
        let groupIndex: number = 0;
        let linkIndex: number = 0;
        return UserStore.routes.reduce((groups: { [groupKey: string]: NavigationGroupDetails }, route) => {
            if (
                typeof route.entry !== 'undefined' &&
                route.entry &&
                typeof route.group !== 'undefined' &&
                route.group
            ) {
                const link: NavigationLinkDetails = {
                    key: route.key,
                    index: linkIndex,
                    name: route.name,
                    path: route.path,
                    exact: route.exact,
                    entry: route.entry,
                    isActive: route.key === this.activeLinkKey,
                };
                linkIndex++;

                if (typeof groups[route.group.key] !== 'undefined') {
                    groups[route.group.key] = {
                        ...groups[route.group.key],
                        links: [...groups[route.group.key].links, link],
                    };
                } else {
                    groups[route.group.key] = {
                        key: route.group.key,
                        index: groupIndex,
                        name: route.group.name,
                        icon: route.group.icon,
                        isActive: route.group.key === this.activeGroupKey,
                        links: [link],
                    };
                    groupIndex++;
                }
            }

            return groups;
        }, {});
    }

    @computed
    public get hoveredGroup(): NavigationGroupDetails | null {
        const activeGroupKey = Object.keys(this.navigationGroups).find(groupKey => {
            return groupKey === this.hoveredGroupKey && typeof this.navigationGroups[groupKey] !== 'undefined';
        });
        return typeof activeGroupKey !== 'undefined' ? this.navigationGroups[activeGroupKey] : null;
    }

    @computed
    public get activeGroup(): NavigationGroupDetails | null {
        const activeGroupKey = Object.keys(this.navigationGroups).find(groupKey => {
            return typeof this.navigationGroups[groupKey] !== 'undefined' && this.navigationGroups[groupKey].isActive;
        });
        return typeof activeGroupKey !== 'undefined' ? this.navigationGroups[activeGroupKey] : null;
    }
}
