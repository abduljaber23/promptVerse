import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PromptStatus } from '../../../common/enums/prompt.enum';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { AiTool } from '../../ai-tools/entities/ai-tool.entity';
import { PreviewImage } from './preview-image.entity';

@Entity('prompts')
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  promptContent: string;

  @Column({ type: 'text', nullable: true })
  previewResult: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverImage: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @Column({ type: 'int', default: 0 })
  salesCount: number;

  @Column({ type: 'int', default: 0 })
  viewsCount: number;

  @Column({ type: 'int', default: 0 })
  favoritesCount: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  averageRating: string;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'enum', enum: PromptStatus, default: PromptStatus.PUBLISHED })
  status: PromptStatus;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid' })
  sellerId: string;

  @ManyToOne(() => User, (user) => user.prompts, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.prompts, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'uuid' })
  aiToolId: string;

  @ManyToOne(() => AiTool, (aiTool) => aiTool.prompts, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'aiToolId' })
  aiTool: AiTool;

  @OneToMany(() => PreviewImage, (previewImage) => previewImage.prompt, { cascade: true })
  previewImages: PreviewImage[];
}
