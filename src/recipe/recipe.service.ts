import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecipe(payload: CreateRecipeDto) {
    try {
      const { userId, title, servings, photoUrl, ingredients, steps } = payload;

      await this.prismaService.$transaction([
        this.prismaService.recipes.create({
          data: { title, userId, servings, photoUrl },
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
