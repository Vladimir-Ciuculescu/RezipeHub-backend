import { Module } from "@nestjs/common";
import { UnitsController } from "./units.controller";
import { UnitsService } from "./units.service";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, PrismaService],
})
export class UnitsModule {}
