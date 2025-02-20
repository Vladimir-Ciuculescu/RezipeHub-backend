import { FavoritesService } from "./favorites.service";
import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
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
    getIsInFavorites(query: IsFavoriteDto): Promise<0 | 1>;
    toggleFavoriteRecipe(body: IsFavoriteDto): Promise<{
        message: string;
    }>;
}
