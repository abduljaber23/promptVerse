import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ConflictException } from '@nestjs/common';
import Stripe from 'stripe';
import { PurchasesService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';
import { PurchaseStatus } from '../../common/enums/purchase.enum';
import { PromptsService } from '../prompts/prompts.service';
import { UsersService } from '../users/users.service';
import { StripeService } from '../stripe/stripe.service';

describe('PurchasesService', () => {
  let service: PurchasesService;

  const findOnePurchase = jest.fn();
  const savePurchase = jest.fn();
  const createPurchase = jest.fn();
  const updatePurchase = jest.fn();

  const promptsService = {
    findByIdForPurchase: jest.fn(),
    hasCompletedPurchase: jest.fn(),
    incrementSalesCount: jest.fn(),
  };
  const usersService = {
    findById: jest.fn(),
    save: jest.fn(),
  };
  const stripeService = {
    createCheckoutSession: jest.fn(),
    constructWebhookEvent: jest.fn(),
  };

  const prompt = {
    id: 'prompt-1',
    slug: 'test-prompt',
    title: 'Test prompt',
    price: '10.00',
    sellerId: 'seller-1',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    createPurchase.mockImplementation((data: Partial<Purchase>) => data);
    savePurchase.mockImplementation((data: Partial<Purchase>) => ({
      id: 'purchase-1',
      ...data,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: {
            findOne: findOnePurchase,
            save: savePurchase,
            create: createPurchase,
            update: updatePurchase,
            find: jest.fn(),
          },
        },
        { provide: PromptsService, useValue: promptsService },
        { provide: UsersService, useValue: usersService },
        { provide: StripeService, useValue: stripeService },
        {
          provide: ConfigService,
          useValue: { getOrThrow: () => 'http://localhost:8080' },
        },
      ],
    }).compile();

    service = module.get(PurchasesService);
  });

  describe('createCheckoutSession', () => {
    it('rejects buying your own prompt', async () => {
      promptsService.findByIdForPurchase.mockResolvedValue(prompt);

      await expect(
        service.createCheckoutSession('seller-1', 'prompt-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects creating a Stripe session for a free prompt', async () => {
      promptsService.findByIdForPurchase.mockResolvedValue({
        ...prompt,
        price: '0.00',
      });

      await expect(
        service.createCheckoutSession('buyer-1', 'prompt-1'),
      ).rejects.toThrow(BadRequestException);
      expect(stripeService.createCheckoutSession).not.toHaveBeenCalled();
    });

    it('rejects buying an already-purchased prompt', async () => {
      promptsService.findByIdForPurchase.mockResolvedValue(prompt);
      promptsService.hasCompletedPurchase.mockResolvedValue(true);

      await expect(
        service.createCheckoutSession('buyer-1', 'prompt-1'),
      ).rejects.toThrow(ConflictException);
    });

    it('creates a new PENDING purchase and Stripe session on the happy path', async () => {
      promptsService.findByIdForPurchase.mockResolvedValue(prompt);
      promptsService.hasCompletedPurchase.mockResolvedValue(false);
      findOnePurchase.mockResolvedValue(null);
      stripeService.createCheckoutSession.mockResolvedValue({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/cs_test_123',
      });

      const result = await service.createCheckoutSession('buyer-1', 'prompt-1');

      expect(result.url).toBe('https://checkout.stripe.com/cs_test_123');
      expect(createPurchase).toHaveBeenCalledWith(
        expect.objectContaining({
          buyerId: 'buyer-1',
          promptId: 'prompt-1',
          sellerId: 'seller-1',
          amount: '10.00',
          status: PurchaseStatus.PENDING,
        }),
      );
      expect(savePurchase).toHaveBeenLastCalledWith(
        expect.objectContaining({ stripeCheckoutSessionId: 'cs_test_123' }),
      );
    });

    it('reuses an existing PENDING purchase instead of creating a new one', async () => {
      promptsService.findByIdForPurchase.mockResolvedValue(prompt);
      promptsService.hasCompletedPurchase.mockResolvedValue(false);
      findOnePurchase.mockResolvedValue({
        id: 'purchase-existing',
        buyerId: 'buyer-1',
        promptId: 'prompt-1',
        sellerId: 'seller-1',
        amount: '10.00',
        status: PurchaseStatus.PENDING,
      });
      stripeService.createCheckoutSession.mockResolvedValue({
        id: 'cs_test_456',
        url: 'https://checkout.stripe.com/cs_test_456',
      });

      await service.createCheckoutSession('buyer-1', 'prompt-1');

      expect(createPurchase).not.toHaveBeenCalled();
      expect(savePurchase).toHaveBeenCalledTimes(1);
      expect(savePurchase).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'purchase-existing',
          stripeCheckoutSessionId: 'cs_test_456',
        }),
      );
    });
  });

  describe('handleWebhookEvent', () => {
    it('throws on an invalid signature', async () => {
      stripeService.constructWebhookEvent.mockImplementation(() => {
        throw new Error('bad signature');
      });

      await expect(
        service.handleWebhookEvent(Buffer.from('{}'), 'sig'),
      ).rejects.toThrow(BadRequestException);
    });

    it('completes a PENDING purchase and credits the seller balance', async () => {
      const session = {
        id: 'cs_test_123',
        payment_intent: 'pi_123',
      } as Stripe.Checkout.Session;
      stripeService.constructWebhookEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: { object: session },
      });
      findOnePurchase.mockResolvedValue({
        id: 'purchase-1',
        promptId: 'prompt-1',
        sellerId: 'seller-1',
        amount: '10.00',
        status: PurchaseStatus.PENDING,
      });
      usersService.findById.mockResolvedValue({
        id: 'seller-1',
        balance: 5,
      });

      await service.handleWebhookEvent(Buffer.from('{}'), 'sig');

      expect(savePurchase).toHaveBeenCalledWith(
        expect.objectContaining({
          status: PurchaseStatus.COMPLETED,
          stripePaymentIntentId: 'pi_123',
        }),
      );
      expect(usersService.save).toHaveBeenCalledWith(
        expect.objectContaining({ balance: 15 }),
      );
      expect(promptsService.incrementSalesCount).toHaveBeenCalledWith(
        'prompt-1',
      );
    });

    it('is idempotent: a second completed event for the same session is a no-op', async () => {
      const session = { id: 'cs_test_123' } as Stripe.Checkout.Session;
      stripeService.constructWebhookEvent.mockReturnValue({
        type: 'checkout.session.completed',
        data: { object: session },
      });
      findOnePurchase.mockResolvedValue({
        id: 'purchase-1',
        promptId: 'prompt-1',
        sellerId: 'seller-1',
        amount: '10.00',
        status: PurchaseStatus.COMPLETED,
      });

      await service.handleWebhookEvent(Buffer.from('{}'), 'sig');

      expect(savePurchase).not.toHaveBeenCalled();
      expect(usersService.save).not.toHaveBeenCalled();
      expect(promptsService.incrementSalesCount).not.toHaveBeenCalled();
    });

    it('ignores unhandled event types without throwing', async () => {
      stripeService.constructWebhookEvent.mockReturnValue({
        type: 'payment_intent.created',
        data: { object: {} },
      });

      await expect(
        service.handleWebhookEvent(Buffer.from('{}'), 'sig'),
      ).resolves.toBeUndefined();
    });
  });
});
