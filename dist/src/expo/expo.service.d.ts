import Expo from "expo-server-sdk";
interface NotificationPayload {
    title?: string;
    body: string;
    data?: Record<string, unknown>;
}
interface DeviceToken {
    deviceToken: string;
    badge: number;
}
export declare class ExpoService {
    private readonly expo;
    constructor(expo: Expo);
    sendExpoPushNotification(deviceTokens: DeviceToken[], notificationPayload: NotificationPayload): Promise<void>;
}
export {};
