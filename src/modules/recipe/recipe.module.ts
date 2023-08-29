import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Step } from './entities/step.entity';
import { DetailIngredient } from './entities/detailIngredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Step, DetailIngredient])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
