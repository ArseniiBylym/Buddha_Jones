import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationsCenter from './../Notifications/NotificationsCenter';
import Modal from './../Modals/Modal';
import * as user from './../../actions/User';
import history from './../../core/history';
import { setBoardWidth } from './../../actions/Window';

// Styles
import s from './Layout.css';

// Component
class Layout extends React.Component {
    constructor(props, context) {
        super(props, context);

        // TODO Redirected if token is not set, It will do initial rendering while checking token and redirect,
        // so it should be done when initial routing
        if (!user.getAuthToken()) {
            history.replace('/user/login');
        } else {
            // Refresh token every 30 mim
            this.props.dispatch(
                user.actionRefreshToken()
            );
        }

        this.delayedWindowResize = debounce(function(e) {
            this.windowResizeDebounced(e);
        }, 256);

        this.openEvents = {
            window: []
        };
    }

    componentDidMount() {
        // Check login and store user info if brower keeps token only, but not user info
        if (!this.props.user) {
            this.props.dispatch(
                user.actionCheckLogin()
            );
        }

        // Create window resize event
        const windowResize = this.windowResize.bind(this);
        this.openEvents.window.push({ type: 'resize', handler: windowResize });
        window.addEventListener('resize', windowResize, false);

        // Update state wth board width
        if (typeof this.refs.board !== 'undefined') {
            this.props.dispatch(
                setBoardWidth(this.refs.board.offsetWidth)
            );
        }
    }

    componentWillUnmount() {
        // Remove window events
        this.openEvents.window.map(evt => {
            window.removeEventListener(evt.type, evt.handler);
        });
    }

    windowResize(e) {
        this.delayedWindowResize(e);
    }

    windowResizeDebounced(e) {
        if (typeof this.refs.board !== 'undefined') {
            this.props.dispatch(
                setBoardWidth(this.refs.board.offsetWidth)
            );
        }
    }

    render() {
        if (!this.props.user) {
            return null;
        } else {
            return (
                <div>

                    <main>
                        <div className={s.content}>
                            <Header ref="headerElement" />
                            <div className={s.contentInner}>
                                {this.props.children}
                            </div>
                        </div>
                    </main>

                    <Sidebar />

                    <NotificationsCenter />

                    <Modal />

                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Layout);
