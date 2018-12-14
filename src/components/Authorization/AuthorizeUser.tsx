import * as React from 'react';
import * as H from 'history';
import { match } from 'react-router';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { AppOnlyStoreState } from '../../store/AllStores';
import { LoadingPage } from 'routes/Loading/LoadingPage';
import { UserActions, NavigationActions } from 'actions';
import { Redirect } from 'react-router';
import { SearchHandler } from 'helpers/SearchHandler';

// Props
interface AuthorizeUserProps extends AppOnlyStoreState {
    history?: H.History;
    location?: H.Location;
    match?: match<string>;
}

// Component
@inject('store')
@observer
export class AuthorizeUser extends React.Component<AuthorizeUserProps, {}> {
    @observable private isUserLoggedIn: boolean = false;
    @observable private authorizingUser: boolean = true;
    @observable private isRouteAllowed: boolean = false;

    public componentWillReceiveProps(nextProps: AuthorizeUserProps) {
        if (this.isUserLoggedIn && this.authorizingUser === false) {
            if (typeof this.props.location !== 'undefined' && typeof nextProps.location !== 'undefined') {
                if (this.props.location.pathname !== nextProps.location.pathname) {
                    const isRouteAllowed = this.validateRoute(nextProps.location.pathname);
                    if (typeof this.props.history !== 'undefined' && isRouteAllowed === false) {
                        this.props.history.push('/not-allowed');
                    }
                }
            }
        }
    }

    public componentDidMount() {
        this.authorizeUser()
            .then(() => {
                if (
                    typeof this.props.store !== 'undefined' &&
                    this.props.store !== null &&
                    typeof this.props.location !== 'undefined' &&
                    this.props.location !== null
                ) {
                    const pathname = window.location.pathname;
                    this.isRouteAllowed = this.validateRoute(pathname);
                    this.isUserLoggedIn = true;
                    this.authorizingUser = false;
                    NavigationActions.setActiveGroupIndexBasedOnPathname(this.props.location.pathname);
                }

                setInterval(() => {
                    UserActions.refreshToken();
                }, 1000 * 60 * 20);
            })
            .catch(() => {
                this.isUserLoggedIn = false;
                this.isRouteAllowed = false;
                this.authorizingUser = false;
            });
    }

    public render() {
        return this.authorizingUser ? (
            <LoadingPage/>
        ) : this.isUserLoggedIn && this.isRouteAllowed ? (
            this.props.children
        ) : this.isUserLoggedIn && this.isRouteAllowed === false ? (
            <Redirect to="/"/>
        ) : this.isUserLoggedIn === false && this.authorizingUser === false ? (
            <Redirect
                to={{
                    pathname: '/user/login',
                    state: { from: window.location.pathname },
                }}
            />
        ) : null;
    }

    private validateRoute = (pathname: string): boolean => {
        if (typeof this.props.store !== 'undefined' && this.props.store !== null) {
            return this.props.store.user.routes.some(route => {
                return SearchHandler.urlPathMatchesRoute(
                    pathname,
                    route.path,
                    typeof route.exact !== 'undefined' && route.exact ? true : false
                );
            });
        }

        return false;
    };

    private authorizeUser = async (): Promise<boolean> => {
        try {
            await UserActions.refreshToken();
            await UserActions.verifyLoggedInUserData();
            return true;
        } catch (error) {
            throw error;
        }
    };
}
