"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let FavoritesService = class FavoritesService {
    constructor(prismaService, notificationsService) {
        this.prismaService = prismaService;
        this.notificationsService = notificationsService;
    }
    async getFavorites(query) {
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
    async getIsInFavorites(body) {
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
            }
            else {
                return 0;
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
    async toggleFavoriteRecipe(body) {
        const { userId, recipeId } = body;
        try {
            const recipeOwner = await this.prismaService.recipes.findFirst({ where: { id: recipeId } });
            const favoriteRecipe = await this.getIsInFavorites(body);
            if (favoriteRecipe) {
                await this.prismaService.users_favorites.delete({ where: { recipeId_userId: { recipeId, userId } } });
                return {
                    message: "Recipe deleted from favorites !",
                };
            }
            else {
                await this.prismaService.users_favorites.create({ data: { recipeId, userId } });
                await this.notificationsService.addToFavoritesNotification(recipeOwner.userId, body.userId, recipeId);
                return {
                    message: "Recipe added from favorites !",
                };
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadGatewayException();
        }
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map