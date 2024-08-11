import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  CreateRecipeDto,
  RecipeBriefInfoDto,
  RecipesPerUserDto,
} from './dtos/recipe.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor(RecipeBriefInfoDto))
  @HttpCode(200)
  @Get('/user-recipes')
  getRecipesByUser(@Query() query: RecipesPerUserDto) {
    return this.recipeService.getRecipesByUser(query);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor(RecipeBriefInfoDto))
  @HttpCode(201)
  @Post('/add')
  addRecipe(@Body() body: CreateRecipeDto) {
    return this.recipeService.createRecipe(body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/:id')
  getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(parseInt(id));
  }
}
