import { BadGatewayException, Injectable } from "@nestjs/common";
import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";
import { NotificationsService } from "../notifications/notifications.service";
import { PrismaService } from "../prisma.service";

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async getFavorites(query: GetFavoritesDto) {
    const { limit, page, userId } = query;

    try {
      const favorites = await this.prismaService.users_favorites.findMany({
        select: {
          recipe: {
            select: {
              id: true,

              title: true,
              photoUrl: true,
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  photoUrl: true,
                },
              },
            },
          },
        },
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: limit * page,
        take: limit,
      });

      const formattedFavorites = favorites.map((favorite) => favorite.recipe);

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
      const recipeOwner = await this.prismaService.recipes.findFirst({ where: { id: recipeId } });

      const favoriteRecipe = await this.getIsInFavorites(body);

      if (favoriteRecipe) {
        await this.prismaService.users_favorites.delete({ where: { recipeId_userId: { recipeId, userId } } });

        return {
          message: "Recipe deleted from favorites !",
        };
      } else {
        await this.prismaService.users_favorites.create({ data: { recipeId, userId } });

        await this.notificationsService.addToFavoritesNotification(recipeOwner.userId, body.userId, recipeId);

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
