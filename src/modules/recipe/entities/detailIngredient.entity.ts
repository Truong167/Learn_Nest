import { Recipe } from 'src/modules/recipe/entities/recipe.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';

@Entity({ name: 'DetailIngredient' })
export class DetailIngredient {
  @PrimaryColumn()
  ingredientId: string;

  @PrimaryColumn()
  recipeId: number;

  @Column()
  amount: string;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'recipeId' })
  Recipe: Recipe;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredientId', referencedColumnName: 'ingredientId' })
  Ingredient: Ingredient;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
