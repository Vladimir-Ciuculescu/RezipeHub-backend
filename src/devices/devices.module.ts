import { Module } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { PrismaService } from "../prisma.service";

@Module({
  providers: [DevicesService, PrismaService],
})
export class DevicesModule {}
