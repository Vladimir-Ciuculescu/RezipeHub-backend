import { FavoritesService } from "./favorites.service";
import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
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
    getIsInFavorites(query: IsFavoriteDto): Promise<0 | 1>;
    toggleFavoriteRecipe(body: IsFavoriteDto): Promise<{
        message: string;
    }>;
}
