import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Switch, Route } from 'react-router';
import { AuthorizeUser } from '../Authorization';
import { NotificationsCenter } from '../Notifications';
import { Sidebar, Header } from '.';
import { AppState } from '../../store/AllStores';
import { computed } from '../../../node_modules/mobx';

// Styles
const s = require('./Layout.css');

// Component
@inject('store')
@observer
export class Layout extends React.Component<AppState, {}> {
    @computed
    private get isBackgroundDarker(): boolean {
        // Make background of the layout different for time entry page
        if (this.props.location && this.props.location.pathname) {
            const test = '/time/entry';
            const index = this.props.location.pathname.indexOf(test);
            if (index !== -1) {
                return index + test.length >= this.props.location.pathname.length ? true : false;
            }
        }

        return false;
    }

    public render() {
        if (!this.props.store) {
            return null;
        }

        return (
            <AuthorizeUser history={this.props.history} location={this.props.location} match={this.props.match}>
                <main>
                    <div className={s.content}>
                        <Header />
                        <div
                            className={classNames(s.contentInner, {
                                [s.contentInnerDarker]: this.isBackgroundDarker,
                            })}
                        >
                            <Switch>
                                {this.props.store.user.routes.map(route => (
                                    <Route
                                        key={typeof route.key !== 'undefined' && route.key ? route.key : route.path}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                    />
                                ))}
                            </Switch>
                        </div>
                    </div>
                </main>

                {this.props.store.user.isLoggedIn && <Sidebar />}

                {this.props.store.user.isLoggedIn && <NotificationsCenter />}
            </AuthorizeUser>
        );
    }
}
