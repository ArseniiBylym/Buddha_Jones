import { action } from 'mobx';
import { NotificationsStore } from '../store/AllStores';
import {
    NotificationContent,
    DefaultNotificationContent,
    NotificationMinimalContent,
    NotificationContentType,
} from '../types/notifications';

export class NotificationsActionsClass {
    @action
    public NotifyUser = (notification: NotificationMinimalContent): void => {
        let id: number = Date.now();
        while (NotificationsStore.allNotificationsSortedByDateIds.indexOf(id) !== -1) {
            id++;
        }

        const preparedNotification: NotificationContent = {
            ...DefaultNotificationContent,
            ...notification,
            id,
            date: new Date(),
        };

        NotificationsStore.liveNotifications.push(preparedNotification);
        NotificationsStore.allNotifications.push(preparedNotification);
    };

    @action
    public AlertUser = (
        title: string,
        description: string | null = null,
        dismissAutomaticallyAfterXSeconds: number = 15
    ) => {
        this.NotifyUser({
            title,
            description,
            dismissable: true,
            dismissToHistory: false,
            dismissAutomaticallyAfterXSeconds,
            type: NotificationContentType.Error,
        });
    };

    @action
    public ClearLiveNotification = (notificationId: number) => {
        const notificationIndex = NotificationsStore.liveNotifications.findIndex(
            notice => notice.id === notificationId
        );

        if (notificationIndex !== -1) {
            NotificationsStore.liveNotifications = [
                ...NotificationsStore.liveNotifications.slice(0, notificationIndex),
                ...NotificationsStore.liveNotifications.slice(notificationIndex + 1),
            ];
        }
    };
}
