import { action } from 'mobx';
import { NotificationsStore } from '../store/AllStores';
import {
    NotificationContent,
    DefaultNotificationContent,
    NotificationMinimalContent,
    NotificationContentType,
} from '../types/notifications';
import { API, APIPath } from 'fetch';

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

    @action 
    public openSidebarHandler(type: string | null) {
        NotificationsStore.visibleMenu = type;
    }

    @action
    public getUserNotifications = async() => {
        const response = (await API.getData(APIPath.NOTIFICATIONS));
        NotificationsStore.userNotifications = response;
    }
}
