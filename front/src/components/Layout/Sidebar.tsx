import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
// import { has as _has } from 'lodash';
import { NavigationActions } from '../../actions';
import { AppOnlyStoreState } from '../../store/AllStores';
import { Link } from 'react-router-dom';
import { NavigationGroupDetails, NavigationLinkDetails } from '../../types/navigation';
import { observable, reaction, computed } from 'mobx';

// Styles
const s = require('./Sidebar.css');
const buddhaJonesLogoSmall = require('../../assets/images/logos/buddha-jones-logo-small.png');
const buddhaJonesLogoLarge = require('../../assets/images/logos/buddha-jones-logo-large.png');
const emptyUserProfileImage = require('../../assets/images/account/empty-user-profile-picture.png');

// Props
interface SidebarProps {}

// Types
type SidebarPropsTypes = SidebarProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class Sidebar extends React.Component<SidebarPropsTypes, {}> {
    @observable private hoveredGroupCenterPosition: number = 0;
    @observable private hoveredSubNavigationPosition: number = 0;

    @computed
    private get isSubNavigationActive(): boolean {
        if (this.props.store && this.props.store.navigation.hoveredGroupKey) {
            return (
                this.props.store.navigation.sidebarExpanded &&
                this.props.store.navigation.hoveredGroup !== null &&
                this.props.store.navigation.hoveredGroup.links.length > 1
            );
        }

        return false;
    }

    private groupsList: HTMLUListElement | null = null;
    private subLinksList: HTMLOListElement | null = null;

    public constructor(props: SidebarPropsTypes) {
        super(props);

        reaction(
            () => this.props.store!.navigation.hoveredGroup,
            group => {
                if (group && this.groupsList) {
                    const navigationListEntries = this.groupsList.querySelectorAll('li');

                    if (typeof navigationListEntries[group.index] !== 'undefined') {
                        const hoveredGroupEntry = navigationListEntries[group.index];
                        if (hoveredGroupEntry) {
                            const expandedGroupPos = hoveredGroupEntry.offsetTop;
                            const expandedGroupHeight = hoveredGroupEntry.offsetHeight;
                            this.hoveredGroupCenterPosition = expandedGroupPos + expandedGroupHeight / 2;
                        }
                    }
                }
            }
        );

        reaction(
            () => this.hoveredGroupCenterPosition,
            groupCenterPosition => {
                this.repositionSubNavigation();
            }
        );

        reaction(
            () => this.isSubNavigationActive,
            isSubNavActive => {
                if (isSubNavActive) {
                    this.repositionSubNavigation();
                }
            }
        );
    }

    render() {
        if (!this.props.store) {
            return null;
        }

        const { navigation, user } = this.props.store;

        return (
            <div
                onMouseEnter={this.handleSidebarHover(true)}
                onMouseLeave={this.handleSidebarHover(false)}
                className={classNames(s.sidebarNavigation, {
                    [s.sidebarNavigationActive]: navigation.sidebarExpanded,
                    [s.sidebarNavigationActiveWithSubNav]:
                        navigation.sidebarExpanded &&
                        navigation.hoveredGroup &&
                        navigation.hoveredGroup.links.length > 1,
                })}
            >
                <nav
                    className={classNames(s.sidebarPane, s.mainNav, {
                        [s.mainNavActive]: navigation.sidebarExpanded,
                    })}
                >
                    <div>
                        <img className={classNames(s.sidebarLogo, s.sidebarLogoSmall)} src={buddhaJonesLogoSmall} />
                        <img className={classNames(s.sidebarLogo, s.sidebarLogoLarge)} src={buddhaJonesLogoLarge} />
                    </div>

                    <hr className={s.sidebarSeparator} />

                    <ul ref={this.referenceGroupsList} className={s.sidebarLinksList}>
                        {Object.keys(navigation.navigationGroups).map(groupKey => {
                            const group: NavigationGroupDetails = navigation.navigationGroups[groupKey];
                            return (
                                <li
                                    key={group.key}
                                    className={classNames({
                                        [s.sidebarLinksListEntryActive]:
                                            group.isActive || (group.links.length === 0 && group.links[0].isActive),
                                        [s.sidebarLinksListEntryExpanded]: group.isActive && group.links.length > 1,
                                        [s.sidebarLinksListEntryHovered]: group.key === navigation.hoveredGroupKey,
                                    })}
                                >
                                    <a
                                        href={group.links[0].entry}
                                        onClick={this.handleSidebarGroupClick(group)}
                                        onMouseEnter={this.handleSidebarGroupHover(group)}
                                    >
                                        <img width="24" src={group.icon} />
                                        <span>{group.links.length === 1 ? group.links[0].name : group.name}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className={classNames(s.sidebarLinksList, s.sidebarSettingsList)}>
                        <li className={s.sidebarAccountEntry}>
                            <Link to="/portal/user/account" onClick={this.handleMyAccountClick}>
                                <img
                                    className={classNames(s.sidebarAccountImage, s.sidebarAccountDefaultImage)}
                                    src={user.data && user.data.image ? user.data.image : emptyUserProfileImage}
                                    onError={this.handleUserProfileImageNotLoading}
                                    height="36"
                                    width="36"
                                />
                                <span>
                                    {user.data
                                        ? user.data.name.full
                                            ? user.data.name.full
                                            : user.data.username
                                        : 'My Account'}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <nav
                    className={classNames(s.sidebarPane, s.subNav, {
                        [s.subNavActive]: this.isSubNavigationActive,
                    })}
                >
                    <ol
                        ref={this.referenceSubLinksList}
                        className={s.sidebarSubLinksList}
                        style={{
                            transform: this.hoveredSubNavigationPosition
                                ? `translateY(${this.hoveredSubNavigationPosition}px)`
                                : undefined,
                        }}
                    >
                        {this.isSubNavigationActive &&
                            navigation.hoveredGroup &&
                            navigation.hoveredGroup.links.map((link, linkIndex) => (
                                <li
                                    key={link.key}
                                    className={classNames({
                                        [s.subNavigationLinkActive]: link.isActive,
                                    })}
                                >
                                    <Link
                                        to={link.entry}
                                        title={link.name}
                                        onClick={this.handleSidebarLinkClick(navigation.hoveredGroup, link)}
                                    >
                                        <span>{linkIndex + 1}.</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                    </ol>
                </nav>
            </div>
        );
    }

    private referenceGroupsList = (ref: HTMLUListElement) => (this.groupsList = ref);
    private referenceSubLinksList = (ref: HTMLOListElement) => (this.subLinksList = ref);

    private handleSidebarHover = (enter: boolean) => (e: React.MouseEvent<HTMLDivElement>) => {
        if (enter) {
            NavigationActions.toggleSidebarExpansion(true);
        } else {
            NavigationActions.collapseSidebar();
        }
    };

    private handleSidebarGroupClick = (group: NavigationGroupDetails) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (group.links.length <= 1) {
            NavigationActions.collapseSidebar();
            NavigationActions.changeHoveredGroup(null);
        } else {
            NavigationActions.changeHoveredGroup(group);
            NavigationActions.toggleSidebarExpansion(true);
        }

        NavigationActions.changeActiveGroup(group);
    };

    private handleSidebarGroupHover = (group: NavigationGroupDetails) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        NavigationActions.changeHoveredGroup(group);
    };

    private handleSidebarLinkClick = (group: NavigationGroupDetails | null, link: NavigationLinkDetails) => (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        NavigationActions.changeActiveGroup(group);
        NavigationActions.changeActiveLink(link);
        NavigationActions.collapseSidebar();
    };

    private handleMyAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        NavigationActions.changeActiveGroup(null);
        NavigationActions.changeActiveLink(null);
        NavigationActions.collapseSidebar();
    };

    private repositionSubNavigation = () => {
        setTimeout(() => {
            if (this.subLinksList) {
                const listHeight = this.subLinksList.offsetHeight;
                const sidebarHeight = window.innerHeight;

                // Calculate list position and check if it isn't off screen
                let listPosition = this.hoveredGroupCenterPosition - listHeight / 2;
                if (listPosition + listHeight > sidebarHeight) {
                    const difference = sidebarHeight - (listPosition + listHeight);
                    listPosition = listPosition - difference;
                }
                if (listPosition < 0) {
                    listPosition = 0;
                }

                // Modify the position
                this.hoveredSubNavigationPosition = listPosition;
            }
        }, 128);
    };

    private handleUserProfileImageNotLoading = (e: React.InvalidEvent<HTMLImageElement>) => {
        e.target.src = emptyUserProfileImage;
    };
}
