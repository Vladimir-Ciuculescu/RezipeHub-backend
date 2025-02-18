export declare class NotificationsDto {
    userId: number;
    page: number;
    limit: number;
}
export declare class ResetBadgeCountDto {
    deviceToken: string;
}
export declare class MarkAsReadDto {
    notificationId: number;
}
export declare class ToggleNotificationsDto {
    expoPushToken: string;
}
