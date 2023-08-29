import { Recipe } from 'src/modules/recipe/entities/recipe.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Step' })
export class Step {
  @PrimaryGeneratedColumn()
  stepId: number;

  @Column()
  description: string;

  @Column({ length: 300, nullable: true })
  image: string;

  @Column()
  recipeId: number;

  @Column()
  stepIndex: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'recipeId' })
  Recipe: Recipe;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
