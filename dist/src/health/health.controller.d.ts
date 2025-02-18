import { HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { PrismaService } from "src/prisma.service";
export declare class HealthController {
    private health;
    private http;
    private db;
    private prismaService;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, db: TypeOrmHealthIndicator, prismaService: PrismaService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
