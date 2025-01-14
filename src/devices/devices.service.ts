import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";
import { AddDeviceDto } from "./devices.dto";

@Injectable()
export class DevicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addDeviceToken(payload: AddDeviceDto) {
    try {
      const existentDevice = await this.prismaService.user_devices.findFirst({
        where: { deviceToken: payload.deviceToken },
      });

      if (!existentDevice) {
        await this.prismaService.user_devices.create({
          data: payload,
        });
        //If there is another userd logged in on the same device
      } else if (existentDevice && existentDevice.id !== payload.userId) {
        await this.prismaService.user_devices.update({
          where: { deviceToken: payload.deviceToken },
          data: {
            userId: payload.userId,
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }
}
