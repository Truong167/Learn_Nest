import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { DetailIngredient } from '../recipe/entities/detailIngredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, DetailIngredient])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
