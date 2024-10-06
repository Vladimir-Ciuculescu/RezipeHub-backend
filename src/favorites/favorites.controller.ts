import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { IsFavoriteDto } from "./favorites.dto";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

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
