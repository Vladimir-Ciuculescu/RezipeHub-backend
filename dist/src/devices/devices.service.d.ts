import { PrismaService } from "prisma.service";
import { AddDeviceDto } from "./devices.dto";
import { ToggleNotificationsDto } from "src/notifications/notifications.dto";
export declare class DevicesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    addDeviceToken(payload: AddDeviceDto): Promise<void>;
    toggleDeviceNotifications(payload: ToggleNotificationsDto): Promise<{
        message: string;
    }>;
}
