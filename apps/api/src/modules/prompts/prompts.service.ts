import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prompt } from './entities/prompt.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PromptStatus } from '../../common/enums/prompt.enum';
import { PurchaseStatus } from '../../common/enums/purchase.enum';
import { ErrorCodes } from '../../common/errors/error-codes';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { StorageService } from '../storage/storage.service';
import { StorageFolder } from '../../common/enums/storage-folder.enum';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { PreviewImage } from './entities/preview-image.entity';
import slugify from 'slugify';
import { randomUUID } from 'crypto';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptsRepository: Repository<Prompt>,
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    private readonly categoriesService: CategoriesService,
    private readonly aiToolsService: AiToolsService,
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
  ) {}

  // `promptContent` (le texte payant) est volontairement exclu des vues liste :
  // ce sont des routes publiques, aucune ne doit jamais le faire fuiter.
  private static readonly LIST_SELECT: FindOptionsSelect<Prompt> = {
    id: true,
    title: true,
    slug: true,
    previewResult: true,
    coverImage: true,
    price: true,
    salesCount: true,
    viewsCount: true,
    favoritesCount: true,
    averageRating: true,
    isFeatured: true,
    status: true,
    deletedAt: true,
    createdAt: true,
    updatedAt: true,
    sellerId: true,
    categoryId: true,
    aiToolId: true,
  };

  findAll(pageNumber: number, promptsPerPage: number) {
    return this.promptsRepository.find({
      select: PromptsService.LIST_SELECT,
      where: { status: PromptStatus.PUBLISHED },
      skip: promptsPerPage * (pageNumber - 1),
      take: promptsPerPage,
      order: { createdAt: 'DESC' },
    });
  }

  findAllByCurrentUser(userId: string) {
    return this.promptsRepository.find({
      where: { sellerId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneBySlug(slug: string, currentUserId?: string) {
    const normalizedSlug = slug.trim().toLowerCase();
    const prompt = await this.promptsRepository.findOne({
      where: { slug: normalizedSlug, status: PromptStatus.PUBLISHED },
      relations: { previewImages: true },
    });

    if (!prompt) {
      throw new NotFoundException({
        code: ErrorCodes.PROMPT_NOT_FOUND,
      });
    }

    const isOwner = currentUserId === prompt.sellerId;
    const hasPurchased =
      !isOwner && currentUserId
        ? await this.hasCompletedPurchase(currentUserId, prompt.id)
        : false;
    const canViewFullContent = isOwner || hasPurchased;

    return {
      ...prompt,
      promptContent: canViewFullContent ? prompt.promptContent : null,
      isPurchasedByCurrentUser: hasPurchased,
    };
  }

  hasCompletedPurchase(buyerId: string, promptId: string): Promise<boolean> {
    return this.purchasesRepository.exists({
      where: { buyerId, promptId, status: PurchaseStatus.COMPLETED },
    });
  }

  async incrementSalesCount(id: string): Promise<void> {
    await this.promptsRepository.increment({ id }, 'salesCount', 1);
  }

  // Utilisé par PurchasesService avant de créer une session Checkout :
  // vérifie existence + statut publié, sans les à-côtés (gating, previewImages)
  // de `findOneBySlug`.
  async findByIdForPurchase(id: string): Promise<Prompt> {
    const prompt = await this.promptsRepository.findOne({ where: { id } });

    if (!prompt) {
      throw new NotFoundException({
        code: ErrorCodes.PROMPT_NOT_FOUND,
      });
    }

    if (prompt.status !== PromptStatus.PUBLISHED) {
      throw new BadRequestException({
        code: ErrorCodes.PROMPT_NOT_PUBLISHED,
      });
    }

    return prompt;
  }

  async findAllByCategory(categorySlug: string) {
    const category = await this.categoriesService.findBySlug(categorySlug);
    if (!category) {
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });
    }

    return this.promptsRepository.find({
      select: PromptsService.LIST_SELECT,
      where: { categoryId: category.id, status: PromptStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByAiTool(aiToolSlug: string) {
    const aiTool = await this.aiToolsService.findBySlug(aiToolSlug);
    if (!aiTool) {
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });
    }

    return this.promptsRepository.find({
      select: PromptsService.LIST_SELECT,
      where: { aiToolId: aiTool.id, status: PromptStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
    });
  }

  async create(
    userId: string,
    createPromptDto: CreatePromptDto,
    file?: Express.Multer.File,
  ) {
    await this.usersService.currentUser(userId);

    const [category, aiTool] = await Promise.all([
      this.categoriesService.findById(createPromptDto.categoryId),
      this.aiToolsService.findById(createPromptDto.aiToolId),
    ]);

    if (!category) {
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });
    }

    if (!aiTool) {
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });
    }

    const title = createPromptDto.title.trim();

    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
    });

    const slug = `${baseSlug}-${randomUUID().split('-')[0]}`;

    const uploadedKeys: string[] = [];

    try {
      let coverImageKey: string | null = null;

      if (file) {
        coverImageKey = await this.storageService.uploadFile(
          file,
          StorageFolder.PROMPT_COVERS,
        );

        uploadedKeys.push(coverImageKey);
      }

      const previewImages = await Promise.all(
        (createPromptDto.previewImages ?? []).map(
          async (previewFile, index) => {
            const previewKey = await this.storageService.uploadFile(
              previewFile,
              StorageFolder.PROMPT_PREVIEWS,
            );

            uploadedKeys.push(previewKey);

            const previewImage = new PreviewImage();
            previewImage.url = previewKey;
            previewImage.sortOrder = index + 1;

            return previewImage;
          },
        ),
      );

      const prompt = this.promptsRepository.create({
        title,
        slug,
        promptContent: createPromptDto.promptContent,
        previewResult: createPromptDto.previewResult ?? null,
        coverImage: coverImageKey,
        price: createPromptDto.price.toFixed(2),
        sellerId: userId,
        categoryId: category.id,
        aiToolId: aiTool.id,
        status: PromptStatus.PUBLISHED,
        previewImages,
      });

      return await this.promptsRepository.save(prompt);
    } catch (error) {
      await Promise.allSettled(
        uploadedKeys.map((key) => this.storageService.deleteFile(key)),
      );

      throw error;
    }
  }
}
