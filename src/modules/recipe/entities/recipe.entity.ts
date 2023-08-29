import { Step } from 'src/modules/recipe/entities/step.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DetailIngredient } from 'src/modules/recipe/entities/detailIngredient.entity';

@Entity({ name: 'Recipe' })
export class Recipe {
  @PrimaryGeneratedColumn()
  recipeId: number;

  @Column({ length: 20 })
  recipeName: string;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column({ length: 2, enum: ['CK', 'RT'] })
  status: string;

  @Column()
  amount: number;

  @Column()
  preparationTime: number;

  @Column()
  cookingTime: number;

  @Column({ length: 300 })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, length: 300 })
  video: string;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  User: User;

  @OneToMany(() => Step, (step) => step.Recipe)
  Step: Step[];

  @OneToMany(
    () => DetailIngredient,
    (detailIngredient) => detailIngredient.Recipe,
  )
  DetailIngredient: DetailIngredient[];

  @CreateDateColumn({ default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
