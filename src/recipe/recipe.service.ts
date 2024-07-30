import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecipe(payload: CreateRecipeDto) {
    console.log(333, payload);

    await this.prismaService.$transaction(async (tsx) => {
      // await tsx.recipes.create({data:{t}})
    });
  }
}
