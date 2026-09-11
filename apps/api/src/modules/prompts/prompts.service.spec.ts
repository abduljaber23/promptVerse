import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { Prompt } from './entities/prompt.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { PromptStatus } from '../../common/enums/prompt.enum';
import { CategoriesService } from '../categories/categories.service';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { UsersService } from '../users/users.service';
import { StorageService } from '../storage/storage.service';

describe('PromptsService', () => {
  let service: PromptsService;

  const findOnePrompt = jest.fn();
  const purchasesExists = jest.fn();

  const basePrompt: Prompt = {
    id: 'prompt-1',
    title: 'Test prompt',
    slug: 'test-prompt',
    promptContent: 'the secret sauce',
    previewResult: 'a public teaser',
    coverImage: null,
    price: '9.99',
    salesCount: 0,
    viewsCount: 0,
    favoritesCount: 0,
    averageRating: '0',
    isFeatured: false,
    status: PromptStatus.PUBLISHED,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    sellerId: 'seller-1',
    categoryId: 'cat-1',
    aiToolId: 'tool-1',
  } as Prompt;

  beforeEach(async () => {
    findOnePrompt.mockReset();
    purchasesExists.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromptsService,
        {
          provide: getRepositoryToken(Prompt),
          useValue: {
            findOne: findOnePrompt,
            find: jest.fn(),
            increment: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Purchase),
          useValue: { exists: purchasesExists },
        },
        { provide: CategoriesService, useValue: {} },
        { provide: AiToolsService, useValue: {} },
        { provide: UsersService, useValue: {} },
        { provide: StorageService, useValue: {} },
      ],
    }).compile();

    service = module.get(PromptsService);
  });

  describe('findOneBySlug', () => {
    it('throws NotFoundException when the prompt does not exist', async () => {
      findOnePrompt.mockResolvedValue(null);

      await expect(service.findOneBySlug('missing')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('hides promptContent from an anonymous visitor', async () => {
      findOnePrompt.mockResolvedValue({ ...basePrompt });

      const result = await service.findOneBySlug('test-prompt');

      expect(result.promptContent).toBeNull();
      expect(result.isPurchasedByCurrentUser).toBe(false);
      expect(purchasesExists).not.toHaveBeenCalled();
    });

    it('hides promptContent from a logged-in non-purchaser', async () => {
      findOnePrompt.mockResolvedValue({ ...basePrompt });
      purchasesExists.mockResolvedValue(false);

      const result = await service.findOneBySlug('test-prompt', 'buyer-1');

      expect(result.promptContent).toBeNull();
      expect(result.isPurchasedByCurrentUser).toBe(false);
    });

    it('reveals promptContent to the seller without checking purchases', async () => {
      findOnePrompt.mockResolvedValue({ ...basePrompt });

      const result = await service.findOneBySlug('test-prompt', 'seller-1');

      expect(result.promptContent).toBe('the secret sauce');
      expect(purchasesExists).not.toHaveBeenCalled();
    });

    it('reveals promptContent to a user with a completed purchase', async () => {
      findOnePrompt.mockResolvedValue({ ...basePrompt });
      purchasesExists.mockResolvedValue(true);

      const result = await service.findOneBySlug('test-prompt', 'buyer-1');

      expect(result.promptContent).toBe('the secret sauce');
      expect(result.isPurchasedByCurrentUser).toBe(true);
    });
  });
});
