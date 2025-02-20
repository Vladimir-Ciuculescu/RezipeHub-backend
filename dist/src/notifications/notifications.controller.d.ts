import { NotificationsService } from "./notifications.service";
import { MarkAsReadDto, NotificationsDto, ResetBadgeCountDto, ToggleNotificationsDto } from "./notifications.dto";
import { DevicesService } from "../devices/devices.service";
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly devicesService;
    constructor(notificationsService: NotificationsService, devicesService: DevicesService);
    getNotifications(query: NotificationsDto): Promise<{
        data: any;
        id: number;
        createdAt: Date;
        title: string;
        body: string;
        read: boolean;
        actor: {
            id: number;
            firstName: string;
            lastName: string;
            photoUrl: string;
        };
    }[]>;
    resetBadgeCount(body: ResetBadgeCountDto): Promise<void>;
    markAsReadNotification(params: MarkAsReadDto): Promise<void>;
    toggleNotifications(params: ToggleNotificationsDto): Promise<{
        message: string;
    }>;
}
