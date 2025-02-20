import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";
import { NotificationsService } from "../notifications/notifications.service";
import { PrismaService } from "../prisma.service";
export declare class FavoritesService {
    private readonly prismaService;
    private readonly notificationsService;
    constructor(prismaService: PrismaService, notificationsService: NotificationsService);
    getFavorites(query: GetFavoritesDto): Promise<{
        id: number;
        photoUrl: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            photoUrl: string;
        };
        title: string;
    }[]>;
    getIsInFavorites(body: IsFavoriteDto): Promise<0 | 1>;
    toggleFavoriteRecipe(body: IsFavoriteDto): Promise<{
        message: string;
    }>;
}
