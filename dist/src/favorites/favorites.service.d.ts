import { PrismaService } from "src/prisma.service";
import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";
import { NotificationsService } from "src/notifications/notifications.service";
export declare class FavoritesService {
    private readonly prismaService;
    private readonly notificationsService;
    constructor(prismaService: PrismaService, notificationsService: NotificationsService);
    getFavorites(query: GetFavoritesDto): Promise<{
        id: number;
        user: {
            firstName: string;
            lastName: string;
            id: number;
            photoUrl: string;
        };
        photoUrl: string;
        title: string;
    }[]>;
    getIsInFavorites(body: IsFavoriteDto): Promise<0 | 1>;
    toggleFavoriteRecipe(body: IsFavoriteDto): Promise<{
        message: string;
    }>;
}
