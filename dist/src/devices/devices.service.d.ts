import { AddDeviceDto } from "./devices.dto";
import { PrismaService } from "../prisma.service";
import { ToggleNotificationsDto } from "../notifications/notifications.dto";
export declare class DevicesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    addDeviceToken(payload: AddDeviceDto): Promise<void>;
    toggleDeviceNotifications(payload: ToggleNotificationsDto): Promise<{
        message: string;
    }>;
}
