import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Purchase } from './entities/purchase.entity';
import { PurchaseStatus } from '../../common/enums/purchase.enum';
import { ErrorCodes } from '../../common/errors/error-codes';
import { PromptsService } from '../prompts/prompts.service';
import { UsersService } from '../users/users.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(PurchasesService.name);

  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    private readonly promptsService: PromptsService,
    private readonly usersService: UsersService,
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService,
  ) {}

  private static eurosToCents(price: string): number {
    return Math.round(parseFloat(price) * 100);
  }

  async createCheckoutSession(
    buyerId: string,
    promptId: string,
  ): Promise<{ url: string }> {
    const prompt = await this.promptsService.findByIdForPurchase(promptId);

    if (prompt.sellerId === buyerId) {
      throw new BadRequestException({
        code: ErrorCodes.CANNOT_PURCHASE_OWN_PROMPT,
      });
    }

    const alreadyPurchased = await this.promptsService.hasCompletedPurchase(
      buyerId,
      promptId,
    );
    if (alreadyPurchased) {
      throw new ConflictException({
        code: ErrorCodes.PROMPT_ALREADY_PURCHASED,
      });
    }

    // Réutilise une tentative PENDING existante plutôt que d'empiler les
    // lignes à chaque nouveau clic sur "Acheter" (retry après abandon).
    let purchase = await this.purchasesRepository.findOne({
      where: { buyerId, promptId, status: PurchaseStatus.PENDING },
    });

    purchase ??= await this.purchasesRepository.save(
      this.purchasesRepository.create({
        buyerId,
        promptId,
        sellerId: prompt.sellerId,
        amount: prompt.price,
        stripeCheckoutSessionId: `pending-${buyerId}-${promptId}-${Date.now()}`,
        status: PurchaseStatus.PENDING,
      }),
    );

    const clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    let session: Stripe.Checkout.Session;
    try {
      session = await this.stripeService.createCheckoutSession({
        mode: 'payment',
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: PurchasesService.eurosToCents(prompt.price),
              product_data: { name: prompt.title },
            },
          },
        ],
        success_url: `${clientUrl}/purchases/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${clientUrl}/prompts/${prompt.slug}`,
        client_reference_id: buyerId,
        metadata: { buyerId, promptId, purchaseId: purchase.id },
      });
    } catch (error) {
      this.logger.error('Stripe checkout session creation failed', error);
      throw new InternalServerErrorException({
        code: ErrorCodes.CHECKOUT_SESSION_CREATION_FAILED,
      });
    }

    if (!session.url) {
      throw new InternalServerErrorException({
        code: ErrorCodes.CHECKOUT_SESSION_CREATION_FAILED,
      });
    }

    purchase.stripeCheckoutSessionId = session.id;
    await this.purchasesRepository.save(purchase);

    return { url: session.url };
  }

  async handleWebhookEvent(payload: Buffer, signature: string): Promise<void> {
    let event: Stripe.Event;
    try {
      event = this.stripeService.constructWebhookEvent(payload, signature);
    } catch (error) {
      this.logger.warn('Invalid Stripe webhook signature', error);
      throw new BadRequestException({
        code: ErrorCodes.INVALID_WEBHOOK_SIGNATURE,
      });
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.completePurchase(event.data.object);
        break;
      case 'checkout.session.expired':
        await this.failPurchase(event.data.object);
        break;
      default:
        // Type d'événement non géré : on ne fait rien, mais on répond 200
        // quand même (voir le contrôleur) pour que Stripe arrête de retenter.
        break;
    }
  }

  private async completePurchase(session: Stripe.Checkout.Session) {
    const purchase = await this.purchasesRepository.findOne({
      where: { stripeCheckoutSessionId: session.id },
    });

    if (!purchase) {
      this.logger.warn(
        `Aucun achat trouvé pour la session Stripe ${session.id}`,
      );
      return;
    }

    // Idempotence : Stripe peut renvoyer le même événement plusieurs fois.
    if (purchase.status === PurchaseStatus.COMPLETED) {
      return;
    }

    purchase.status = PurchaseStatus.COMPLETED;
    purchase.stripePaymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);
    await this.purchasesRepository.save(purchase);

    await this.promptsService.incrementSalesCount(purchase.promptId);

    const seller = await this.usersService.findById(purchase.sellerId);
    if (seller) {
      seller.balance = Number(seller.balance) + Number(purchase.amount);
      await this.usersService.save(seller);
    }
  }

  private async failPurchase(session: Stripe.Checkout.Session) {
    await this.purchasesRepository.update(
      {
        stripeCheckoutSessionId: session.id,
        status: PurchaseStatus.PENDING,
      },
      { status: PurchaseStatus.FAILED },
    );
  }

  findMyPurchases(buyerId: string) {
    return this.purchasesRepository.find({
      where: { buyerId, status: PurchaseStatus.COMPLETED },
      relations: { prompt: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findBySessionId(buyerId: string, sessionId: string): Promise<Purchase> {
    const purchase = await this.purchasesRepository.findOne({
      where: { stripeCheckoutSessionId: sessionId, buyerId },
      relations: { prompt: true },
    });

    if (!purchase) {
      throw new NotFoundException({
        code: ErrorCodes.PURCHASE_NOT_FOUND,
      });
    }

    return purchase;
  }
}
