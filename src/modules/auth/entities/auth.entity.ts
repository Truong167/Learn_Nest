import { User } from '../../users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Account' })
export class Auth {
  @PrimaryColumn({ length: 20 })
  accountName: string;

  @Column({ length: 100 })
  password: string;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.userId)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
