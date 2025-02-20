import { Body, Controller, Get, HttpCode, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { GetFavoritesDto, IsFavoriteDto } from "./favorites.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get("/")
  getFavorites(@Query() query: GetFavoritesDto) {
    return this.favoritesService.getFavorites(query);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get("/is-favorite")
  getIsInFavorites(@Query() query: IsFavoriteDto) {
    return this.favoritesService.getIsInFavorites(query);
  }
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post("/toggle-favorite")
  toggleFavoriteRecipe(@Body() body: IsFavoriteDto) {
    return this.favoritesService.toggleFavoriteRecipe(body);
  }
}
