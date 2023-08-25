import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullName: string;

  @Column({ type: 'timestamp without time zone' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  address: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  introduce: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  dateUpdatedRecipe: Date;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
