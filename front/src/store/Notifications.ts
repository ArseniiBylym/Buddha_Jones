import { observable, computed } from 'mobx';
import { NotificationContent } from '../types/notifications';

export class Notifications {
    @observable public allNotifications: NotificationContent[] = [];
    @observable public visibleMenu: string | null = null;
    @observable public userNotifications: any = [];

    @computed
    public get allNotificationsSortedByDate(): NotificationContent[] {
        return this.allNotifications.sort(() => {
            return 1;
        });
    }

    @computed
    public get allNotificationsSortedByDateIds(): number[] {
        return this.allNotificationsSortedByDate.map(notice => notice.id);
    }

    @observable public liveNotifications: NotificationContent[] = [];

    @computed
    public get liveNotificationsIds(): number[] {
        return this.liveNotifications.map(notice => notice.id);
    }
}
