import { MarkAsReadDto, ResetBadgeCountDto } from "./notifications.dto";
import { PrismaService } from "../prisma.service";
import { ExpoService } from "../expo/expo.service";
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
            id: number;
            firstName: string;
            lastName: string;
            photoUrl: string;
        };
    }[]>;
    addToFavoritesNotification(userId: number, senderId: number, recipeId: number): Promise<void>;
    resetBadgeCountNotification(body: ResetBadgeCountDto): Promise<void>;
    markAsReadNotification(params: MarkAsReadDto): Promise<void>;
}
