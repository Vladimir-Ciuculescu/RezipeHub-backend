import { Controller, Get } from "@nestjs/common";
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { PrismaService } from "prisma.service";
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private prismaService: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    //* Check server health
    // return this.health.check([() => this.http.pingCheck("nestjs-docs", "https://docs.nestjs.com")]);

    return this.health.check([
      async () => {
        // Test database with a simple query
        try {
          await this.prismaService.$queryRaw`SELECT 1`;
          return {
            database: {
              status: "up",
            },
          };
        } catch (error) {
          return {
            database: {
              status: "down",
              error: error.message,
            },
          };
        }
      },
    ]);
  }
}
