import { Injectable } from "@nestjs/common";
import Expo, { ExpoPushMessage } from "expo-server-sdk";

interface NotificationPayload {
  title?: string;
  body: string;
  data?: Record<string, unknown>;
}

interface DeviceToken {
  deviceToken: string;
  badge: number;
}

@Injectable()
export class ExpoService {
  constructor(private readonly expo: Expo) {}

  async sendExpoPushNotification(deviceTokens: DeviceToken[], notificationPayload: NotificationPayload) {
    const { title, body, data } = notificationPayload;

    try {
      let notifications: ExpoPushMessage[] = [];

      for (let deviceToken of deviceTokens) {
        if (!Expo.isExpoPushToken(deviceToken.deviceToken)) {
          console.error(`Push token ${deviceToken.deviceToken} not valid !`);
          continue;
        }

        notifications.push({
          to: deviceToken.deviceToken,

          //* Vladi iPhone DEV Build App token
          //to: "ExponentPushToken[TrS9XBLNre6qaT-5k8cy1o]",
          //* Vladi iPhone Productiuon app token
          //to: "ExponentPushToken[MqZ_ElJdA1E1SnWhngbQ7R]",
          sound: "default",
          title,
          body,
          data: data || {},
          badge: deviceToken.badge,
        });
      }

      let chunks = this.expo.chunkPushNotifications(notifications);

      for (let chunk of chunks) {
        try {
          await this.expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
          console.log("Error sending certain notification", error);
        }
      }
    } catch (error) {
      console.log("Error sending notifications");
    }
  }
}
