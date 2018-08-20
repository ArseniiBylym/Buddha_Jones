import { action } from 'mobx';
import { NavigationStore } from '../store/AllStores';
import { NavigationGroupDetails, NavigationLinkDetails } from 'types/navigation';
import { history } from 'App';
import { SearchHandler } from 'helpers/SearchHandler';
// import { startsWith as _startsWith } from 'lodash';

export class NavigationActionsClass {
    @action
    public toggleSidebarExpansion = (isExpanded?: boolean) => {
        NavigationStore.sidebarExpanded =
            typeof isExpanded !== 'undefined' ? isExpanded : !NavigationStore.sidebarExpanded;
    };

    @action
    public changeHoveredGroup = (group: NavigationGroupDetails | null) => {
        if (group === null) {
            NavigationStore.hoveredGroupKey = null;
            return;
        }

        NavigationStore.hoveredGroupKey = group.key;
    };

    @action
    public changeActiveGroup = (group: NavigationGroupDetails | null) => {
        if (group === null) {
            NavigationStore.activeGroupKey = null;
            return;
        }

        NavigationStore.activeGroupKey = group.key;

        if (typeof group.links !== 'undefined' && group.links && group.links.length === 1) {
            this.changeActiveLink(group.links[0]);
        }
    };

    @action
    public changeActiveLink = (link: NavigationLinkDetails | null) => {
        if (link === null) {
            NavigationStore.activeLinkKey = null;
            return;
        }

        NavigationStore.activeLinkKey = link.key;

        history.push(link.entry);
    };

    @action
    public collapseSidebar = () => {
        NavigationStore.sidebarExpanded = false;
        this.changeHoveredGroup(null);
    };

    @action
    public setActiveGroupIndexBasedOnPathname = (pathname: string) => {
        let navigationGroupKey: string | null = null;
        let navigationLinkKey: string | null = null;
        Object.keys(NavigationStore.navigationGroups).find(groupKey => {
            const group = NavigationStore.navigationGroups[groupKey];
            if (group) {
                const found = group.links.find(link => {
                    if (SearchHandler.urlPathMatchesRoute(pathname, link.path, link.exact)) {
                        navigationLinkKey = link.key;
                        return true;
                    }

                    return false;
                });

                if (found) {
                    navigationGroupKey = found.key;
                    return true;
                }
            }

            return false;
        });

        if (navigationGroupKey !== null && navigationLinkKey !== null) {
            NavigationStore.activeGroupKey = navigationGroupKey;
            NavigationStore.activeLinkKey = navigationLinkKey;
        }
    };

    @action
    public setPageNotListedInSidebarAsOpen = () => {
        NavigationStore.sidebarExpanded = false;
        // NavigationStore.activeNavigationGroupIndex = null;
        // NavigationStore.expandedNavigationGroupIndex = null;
    };
}
