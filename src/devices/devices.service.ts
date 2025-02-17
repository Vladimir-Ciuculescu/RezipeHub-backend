import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";
import { AddDeviceDto } from "./devices.dto";
import { ToggleNotificationsDto } from "src/notifications/notifications.dto";

@Injectable()
export class DevicesService {
  constructor(private readonly prismaService: PrismaService) {}

  // async addDeviceToken(payload: AddDeviceDto) {
  //   try {
  //     const existentDevice = await this.prismaService.user_devices.findFirst({
  //       where: { deviceToken: payload.deviceToken },
  //     });

  //     if (!existentDevice) {
  //       await this.prismaService.user_devices.create({
  //         data: payload,
  //       });
  //       //If there is another userd logged in on the same device
  //     } else if (existentDevice && existentDevice.userId !== payload.userId) {
  //       await this.prismaService.user_devices.update({
  //         where: { deviceToken: payload.deviceToken },
  //         data: {
  //           userId: payload.userId,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new BadGatewayException();
  //   }
  // }

  async addDeviceToken(payload: AddDeviceDto) {
    const { userId, deviceToken, deviceType } = payload;

    const existingDevice = await this.prismaService.user_devices.findFirst({
      where: {
        userId: userId,
        deviceType: deviceType,
      },
    });

    // 2. Check if another user already has this token
    const conflictingDevice = await this.prismaService.user_devices.findFirst({
      where: {
        deviceToken: deviceToken,
      },
    });

    if (conflictingDevice) {
      // If the token is associated with another user/device, delete it
      await this.prismaService.user_devices.delete({
        where: { id: conflictingDevice.id },
      });
    }

    if (existingDevice) {
      // 3. Update existing device record with the new token
      await this.prismaService.user_devices.update({
        where: { id: existingDevice.id },
        data: { deviceToken: deviceToken },
      });
    } else {
      // 4. Create a new device entry if it doesn’t exist
      await this.prismaService.user_devices.create({
        data: {
          userId: userId,
          deviceToken: deviceToken,
          deviceType: deviceType,
          notificationsEnabled: true,
        },
      });
    }
  }

  async toggleDeviceNotifications(payload: ToggleNotificationsDto) {
    try {
      const { expoPushToken } = payload;

      const device = await this.prismaService.user_devices.findFirst({ where: { deviceToken: expoPushToken } });

      await this.prismaService.user_devices.update({
        where: { deviceToken: expoPushToken },
        data: { notificationsEnabled: !device.notificationsEnabled },
      });

      return {
        message: `Notifications ${device.notificationsEnabled ? "disabled" : "enabled"} !`,
      };
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }
}
