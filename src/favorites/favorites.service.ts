import { BadGatewayException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";
import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFavorites(query: GetFavoritesDto) {
    const { limit, page, userId } = query;

    try {
      const favorites = await this.prismaService.users_favorites.findMany({
        where: {
          userId,
        },

        orderBy: {
          createdAt: "desc",
        },
        include: {
          recipe: true,
          user: true,
        },
        skip: limit * page,
        take: limit,
      });

      const formattedFavorites = favorites.map((favorite) => ({
        id: favorite.recipe.id,
        title: favorite.recipe.title,
        photoUrl: favorite.recipe.photoUrl,
        user: {
          id: favorite.user.id,
          firstName: favorite.user.firstName,
          lastName: favorite.user.lastName,
          photoUrl: favorite.user.photoUrl,
        },
      }));

      return formattedFavorites;
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async getIsInFavorites(body: IsFavoriteDto) {
    const { userId, recipeId } = body;

    try {
      const favoriteRecipe = await this.prismaService.users_favorites.findUnique({
        where: {
          recipeId_userId: {
            recipeId,
            userId,
          },
        },
      });

      if (favoriteRecipe) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async toggleFavoriteRecipe(body: IsFavoriteDto) {
    const { userId, recipeId } = body;

    try {
      const favoriteRecipe = await this.getIsInFavorites(body);

      if (favoriteRecipe) {
        await this.prismaService.users_favorites.delete({ where: { recipeId_userId: { recipeId, userId } } });

        return {
          message: "Recipe deleted from favorites !",
        };
      } else {
        await this.prismaService.users_favorites.create({ data: { recipeId, userId } });

        return {
          message: "Recipe added from favorites !",
        };
      }
    } catch (error) {
      console.log(error);
      throw new BadGatewayException();
    }
  }
}
