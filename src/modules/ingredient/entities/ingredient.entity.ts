import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DetailIngredient } from '../../recipe/entities/detailIngredient.entity';

@Entity({ name: 'Ingredient' })
export class Ingredient {
  @PrimaryColumn()
  ingredientId: string;

  @Column()
  name: string;

  @Column({ length: 300 })
  image: string;

  @OneToMany(() => DetailIngredient, (ingredient) => ingredient.Ingredient)
  DetailIngredient: DetailIngredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
