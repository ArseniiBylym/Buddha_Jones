import { HeaderActions, NavigationActions } from 'actions';
import { history } from 'App';
import { Section } from 'components/Section';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';
import { NavigationGroupDetails, NavigationLinkDetails } from 'types/navigation';

// Styles
const s = require('./Dashboard.css');
const iconArrow = require('../../assets/images/pagination/arrow-right.svg');

// Props
interface DashboardProps {}

// Component
@inject('store')
@observer
export default class Dashboard extends React.Component<DashboardProps & AppOnlyStoreState, {}> {
    public componentDidMount() {
        HeaderActions.replaceMainHeaderContent({ title: 'Dashboard' });
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        return (
            <div>
                <Section className={s.navigation} title="Pages" noSeparator={true}>
                    {Object.keys(this.props.store.navigation.navigationGroups).map(groupKey => {
                        if (this.props.store) {
                            const group = this.props.store.navigation.navigationGroups[groupKey];
                            return (
                                <React.Fragment key={group.key}>
                                    {group.links.map(link => (
                                        <button key={link.key} onClick={this.handleNavigationLinkClick(group, link)}>
                                            <h5>
                                                {group.name !== link.name ? `${group.name} - ${link.name}` : link.name}
                                            </h5>
                                            <p>
                                                <img src={iconArrow} alt="" />
                                            </p>
                                        </button>
                                    ))}
                                </React.Fragment>
                            );
                        }

                        return null;
                    })}
                </Section>
            </div>
        );
    }

    private handleNavigationLinkClick = (group: NavigationGroupDetails, link: NavigationLinkDetails) => (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        if (this.props.store) {
            NavigationActions.changeActiveGroup(group);
            NavigationActions.changeActiveLink(link);
            NavigationActions.collapseSidebar();

            history.push(link.entry);
        }
    };
}
