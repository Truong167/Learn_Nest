import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class UpdateIngredientDto {
  recipeId: number;
  ingredientId: string;
  amount: string;
}

class UpdateStepDto {
  stepId: number;
  recipeId: number;
  description: string;
  image: string;
  stepIndex: number;
}

export class UpdateRecipeDto {
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
  DetailIngredients: UpdateIngredientDto[];

  @ApiProperty({
    description: 'Step payload',
    example: [
      {
        stepId: 1,
        description: 'string',
        image: 'string',
        stepIndex: 1,
      },
      {
        stepId: 2,
        description: 'string',
        image: 'string',
        stepIndex: 2,
      },
    ],
  })
  Steps: UpdateStepDto[];
}
