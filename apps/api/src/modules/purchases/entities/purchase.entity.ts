import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurchaseStatus } from '../../../common/enums/purchase.enum';
import { User } from '../../users/entities/user.entity';
import { Prompt } from '../../prompts/entities/prompt.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  buyerId: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @Column({ type: 'uuid' })
  promptId: string;

  @ManyToOne(() => Prompt, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'promptId' })
  prompt: Prompt;

  // Copie de `prompt.sellerId` au moment de l'achat : garde un historique de
  // vente stable et évite une jointure via `prompts` pour les requêtes vendeur.
  @Column({ type: 'uuid' })
  sellerId: string;

  // Prix payé, copié au moment de l'achat (indépendant d'un futur changement
  // de `prompt.price`), même convention que `Prompt.price`.
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  stripeCheckoutSessionId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripePaymentIntentId: string | null;

  @Column({
    type: 'enum',
    enum: PurchaseStatus,
    default: PurchaseStatus.PENDING,
  })
  status: PurchaseStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
