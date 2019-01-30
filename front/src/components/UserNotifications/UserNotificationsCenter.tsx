import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from '../Button';
import { UserNotification } from '.';
import { AppOnlyStoreState } from '../../store/AllStores';

// Styles
const s = require('./UserNotificationsCenter.css');
import { IconBellMenu, IconClose } from '../Icons';
import { NotificationsActions } from 'actions';

// Component
@inject('store')
@observer
export class UserNotificationsCenter extends React.Component<AppOnlyStoreState, {}> {
    private exists: boolean = true;

    @observable private showHistory: boolean = false;

    componentDidMount = () => {
        NotificationsActions.getUserNotifications();
    }

    public componentWillUnmount() {
        this.exists = false;
    }

    render() {
        if (!this.props.store) {
            return null;
        }

        const { notifications } = this.props.store;

        return (
            <div
                className={classNames(s.notificationsCenter, {
                    [s.hideHistory]: !this.showHistory,
                })}
            >
                <div className={s.notificationButton__wrapper} onMouseEnter={this.buttonHoverHandler}>
                    <Button
                        className={notifications.visibleMenu === 'hamburgerMenu' ? s.toggleHidden : s.toggle }
                        onClick={this.showHistory ? () => this.handleNotificationsHistoryToggle() : null}
                        icon={{
                            size: 'large',
                            background: 'white',
                            element:
                            !this.showHistory ? (
                                <IconBellMenu width={25} height={25}/>
                                ) : (
                                    <IconClose width={12} height={12}/>
                                    ),
                                }}
                    />
                </div>

                {this.notificationsLength && !this.showHistory && notifications.visibleMenu !== 'hamburgerMenu' && <div className={s.notificationCounter}>{this.notificationsLength}</div>}

                <div className={s.notificationsHistory}>
                    <div className={s.notificationsHistory__header}>Notifications</div>
                    <div className={s.notificationsHistory__container}>
                        {notifications && notifications.userNotifications && notifications.userNotifications.length > 0 &&
                            notifications.userNotifications!.map(notification => this.renderNotification(notification))
                        }
                    </div>
                </div>
            </div>
        );
    }

    private buttonHoverHandler = (e) => {
        if (!this.showHistory) {
            this.handleNotificationsHistoryToggle();
        } else {
            return;
        }
    }

    private get notificationsLength() {
        const notifications = this.props.store!.notifications.userNotifications!;
        if (notifications && notifications.length > 0) {
            return notifications.length;
        } else {
            return null;
        }
    }

    private renderNotification = (notification: any) => {
        return (
            <UserNotification
                key={notification.id}
                id={notification.id}
                type={notification.type}
                date={notification.createdAt}
                isConfirm={notification.confirm}
                link={notification.link}
                messageTypeid={notification.messageTypeid}
                note={notification.note}
                message={notification.message}
            />
        );
    };

    private handleNotificationsHistoryToggle = () => {
        // Toggle hidden status of notifications history
        if (this.exists) {
            this.showHistory = !this.showHistory;
        }
        if (!this.showHistory) {
            NotificationsActions.openSidebarHandler(null);
        } else {
            NotificationsActions.openSidebarHandler('bellMenu');
        }
    };
}
