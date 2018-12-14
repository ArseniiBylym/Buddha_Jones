export enum NotificationContentType {
    Default = 'default',
    Success = 'success',
    Error = 'error',
}

export interface NotificationBase {
    title: string;
    description?: string | null;
}

export interface NotificationMinimalContent extends NotificationBase {
    showDate?: boolean;
    dismissable?: boolean;
    dismissToHistory?: boolean;
    dismissAutomaticallyAfterXSeconds?: number | null;
    type: NotificationContentType;
}

export interface NotificationContent extends NotificationMinimalContent {
    id: number;
    date: Date;
}

export const DefaultNotificationContent: NotificationContent = {
    id: 0,
    title: '',
    description: null,
    date: new Date(),
    showDate: true,
    dismissable: true,
    dismissToHistory: true,
    dismissAutomaticallyAfterXSeconds: null,
    type: NotificationContentType.Default,
};
