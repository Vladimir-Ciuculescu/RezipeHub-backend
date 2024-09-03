import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { CreateIngredientDto } from './dtos/ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private readonly prsimaService: PrismaService) {}

  async getIngredient(foodId: string) {
    const ingredient = await this.prsimaService.ingredients.findUnique({
      where: { foodId },
    });

    return ingredient;
  }

  async addIngredient(payload: CreateIngredientDto) {
    const ingredient = await this.prsimaService.ingredients.create({
      data: payload,
    });

    return ingredient;
  }
}
