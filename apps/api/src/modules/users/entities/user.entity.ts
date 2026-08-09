import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles, UserStatus } from '../../../common/enums/user.enum';
import { UserProfile } from './user-profile.entity';
import { Prompt } from '../../prompts/entities/prompt.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: UserRoles;

  @Index()
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  verificationToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  verificationTokenExpiresAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  resetPasswordToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordTokenExpiresAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripeCustomerId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripeAccountId: string | null;

  @Column({ type: 'boolean', default: false })
  stripeOnboardingComplete: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;

  @OneToMany(() => Prompt, (prompt) => prompt.seller)
  prompts: Prompt[];
}
