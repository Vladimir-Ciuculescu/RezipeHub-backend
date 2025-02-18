import { PrismaService } from "src/prisma.service";
import { UnitDto } from "./dtos/units.dto";
export declare class UnitsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUnit(payload: UnitDto): Promise<{
        id: number;
        uri: string;
        label: string;
    }>;
    addUnit(payload: UnitDto): Promise<{
        id: number;
        uri: string;
        label: string;
    }>;
}
