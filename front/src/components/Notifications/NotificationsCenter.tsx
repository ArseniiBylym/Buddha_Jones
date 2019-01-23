import * as React from 'react';
import * as classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { Button } from '../Button';
import { Notification } from '.';
import { AppOnlyStoreState } from '../../store/AllStores';

// Styles
const s = require('./NotificationsCenter.css');
import { IconHamburgerMenu, IconClose } from '../Icons';
import { NotificationContent } from '../../types/notifications';

// Component
@inject('store')
@observer
export class NotificationsCenter extends React.Component<AppOnlyStoreState, {}> {
    private exists: boolean = true;

    @observable private showHistory: boolean = false;

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
                <Button
                    className={s.toggle}
                    onClick={() => this.handleNotificationsHistoryToggle()}
                    icon={{
                        size: 'large',
                        background: 'white',
                        element:
                            !this.showHistory ? (
                                <IconHamburgerMenu width={14} height={12}/>
                            ) : (
                                <IconClose width={12} height={12}/>
                            ),
                    }}
                    // tooltip={{
                    //     text: !this.showHistory ? 'Notifications' : 'Close',
                    //     on: 'left',
                    // }}
                />

                <div className={s.notificationsLive}>
                    {notifications &&
                    notifications.liveNotifications
                        .filter(notification => notification !== null && typeof notification.title !== 'undefined')
                        .map(notification => this.renderNotification(notification))}
                </div>

                <div className={s.notificationsHistory}>
                    {notifications &&
                    notifications.allNotifications
                        .filter(notification => notification !== null && typeof notification.title !== 'undefined')
                        .map(notification => this.renderNotification(notification))}

                    {notifications !== null &&
                    notifications.allNotifications.length <= 0 && (
                        <Notification
                            id={0}
                            title="You have no recent notifications"
                            showDate={false}
                            dismissable={{
                                allow: false,
                                onDismiss: null,
                                dismissAutomaticallyAfterXSeconds: null,
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }

    private renderNotification = (notification: NotificationContent) => {
        return (
            <Notification
                key={notification.id}
                id={notification.id}
                title={notification.title}
                description={
                    typeof notification.description !== 'undefined' && notification.description
                        ? notification.description
                        : undefined
                }
                type={notification.type}
                date={notification.date}
                dismissable={
                    typeof notification.dismissable !== 'undefined' && notification.dismissable
                        ? {
                            allow: notification.dismissable,
                            onDismiss: this.handleNotificationDismiss(notification.id),
                            dismissAutomaticallyAfterXSeconds:
                                typeof notification.dismissAutomaticallyAfterXSeconds !== 'undefined' &&
                                notification.dismissAutomaticallyAfterXSeconds
                                    ? notification.dismissAutomaticallyAfterXSeconds
                                    : null,
                        }
                        : undefined
                }
            />
        );
    };

    @action
    private handleNotificationDismiss = (id: number) => () => {
        setTimeout(() => {
            if (!this.props.store) {
                return;
            }

            const { notifications } = this.props.store;

            const liveNotificationIdMatch = notifications.liveNotificationsIds.indexOf(id);

            if (liveNotificationIdMatch !== -1) {
                const notification = notifications.liveNotifications[liveNotificationIdMatch];

                if (typeof notification.dismissToHistory !== 'undefined' && notification.dismissToHistory) {
                    notifications.allNotifications.push(notification);
                }

                notifications.liveNotifications = [
                    ...notifications.liveNotifications.slice(0, liveNotificationIdMatch),
                    ...notifications.liveNotifications.slice(liveNotificationIdMatch + 1),
                ];
            }
        }, 400);
    };

    private handleNotificationsHistoryToggle = () => {
        // Toggle hidden status of notifications history
        if (this.exists) {
            this.showHistory = !this.showHistory;
        }
    };
}
