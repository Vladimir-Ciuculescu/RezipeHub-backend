import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";
import { HttpModule } from "@nestjs/axios";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthModule {}
