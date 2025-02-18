import { PrismaService } from "prisma.service";
import { ExpoService } from "src/expo/expo.service";
import { MarkAsReadDto, ResetBadgeCountDto } from "./notifications.dto";
export declare class NotificationsService {
    private readonly prismaService;
    private readonly expoService;
    constructor(prismaService: PrismaService, expoService: ExpoService);
    getNotifications(query: any): Promise<{
        data: any;
        id: number;
        createdAt: Date;
        title: string;
        body: string;
        read: boolean;
        actor: {
            firstName: string;
            lastName: string;
            id: number;
            photoUrl: string;
        };
    }[]>;
    addToFavoritesNotification(userId: number, senderId: number, recipeId: number): Promise<void>;
    resetBadgeCountNotification(body: ResetBadgeCountDto): Promise<void>;
    markAsReadNotification(params: MarkAsReadDto): Promise<void>;
}
