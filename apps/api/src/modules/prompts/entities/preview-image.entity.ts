import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Prompt } from './prompt.entity';

@Entity('preview_images')
export class PreviewImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string;

  @Column({ type: 'integer', nullable: false, default: 1 })
  sortOrder: number;

  @Column({ type: 'uuid' })
  promptId: string;

  @ManyToOne(() => Prompt, (prompt) => prompt.previewImages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'promptId' })
  prompt: Prompt;
}
