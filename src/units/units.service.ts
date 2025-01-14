import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";
import { UnitDto } from "./dtos/units.dto";

@Injectable()
export class UnitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUnit(payload: UnitDto) {
    const { uri, label } = payload;

    const unit = await this.prismaService.units.findFirst({
      where: { AND: [{ uri }, { label }] },
    });

    return unit;
  }

  async addUnit(payload: UnitDto) {
    const unit = await this.prismaService.units.create({ data: payload });

    return unit;
  }
}
