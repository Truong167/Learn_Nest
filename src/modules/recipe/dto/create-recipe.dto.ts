import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateIngredientDto {
  recipeId: number;
  ingredientId: string;
  amount: string;
}

class CreateStepDto {
  recipeId: number;
  description: string;
  image: string;
  stepIndex: number;
}

export class CreateRecipeDto {
  @ApiProperty()
  @IsNotEmpty()
  recipeName: string;

  @ApiProperty({ default: 'CK' })
  status: string;

  @ApiProperty({ default: 10 })
  amount: number;

  @ApiProperty({ default: 10 })
  preparationTime: number;

  @ApiProperty({ default: 10 })
  cookingTime: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  video: string;

  @ApiProperty({
    description: 'Ingredient payload',
    example: [
      {
        ingredientId: 'trungga',
        amount: 'string',
      },
      {
        ingredientId: 'bo',
        amount: 'string',
      },
    ],
  })
  DetailIngredients: CreateIngredientDto[];

  @ApiProperty({
    description: 'Step payload',
    example: [
      {
        description: 'string',
        image: 'string',
        stepIndex: 1,
      },
      {
        description: 'string',
        image: 'string',
        stepIndex: 2,
      },
    ],
  })
  Steps: CreateStepDto[];
}
