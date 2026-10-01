typescript
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

  // les champs qu'on retourne dans les listes
  // on met pas promptContent car c'est le contenu payant
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

  
  static isFree(price: string): boolean {
    return Number.parseFloat(price) === 0;
  }

  
  async incrementSalesCount(id: string): Promise<void> {
    await this.promptsRepository.increment(
      { id },
      'salesCount',
      1,
    );
  }


  findAll(pageNumber: number, promptsPerPage: number) {
    return this.promptsRepository.find({
      select: PromptsService.LIST_SELECT,

      where: {
        status: PromptStatus.PUBLISHED,
      },

      skip: promptsPerPage * (pageNumber - 1),
      take: promptsPerPage,

    
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // recupere les prompts du user connecter
  findAllByCurrentUser(userId: string) {
    return this.promptsRepository.find({
      where: {
        sellerId: userId,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  // filtre les prompts par categorie
  async findAllByCategory(categorySlug: string) {
    
    const category =
      await this.categoriesService.findBySlug(categorySlug);

    if (!category) {
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });
    }

    // ensuite on recupere les prompts de cette categorie
    return this.promptsRepository.find({
      select: PromptsService.LIST_SELECT,

      where: {
        categoryId: category.id,
        status: PromptStatus.PUBLISHED,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  // Filtre ia
  async findAllByAiTool(aiToolSlug: string) {
    
    const aiTool =
      await this.aiToolsService.findBySlug(aiToolSlug);

    if (!aiTool) {
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });
    }

  
    return this.promptsRepository.find({
      select: PromptsService.LIST_SELECT,

      where: {
        aiToolId: aiTool.id,
        status: PromptStatus.PUBLISHED,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  // verifie si le user a deja acheter le prompt
  async hasCompletedPurchase(
    buyerId: string,
    promptId: string,
  ): Promise<boolean> {
    return this.purchasesRepository.exists({
      where: {
        buyerId,
        promptId,
        status: PurchaseStatus.COMPLETED,
      },
    });
  }

  // recupere un prompt avec son id pour faire un achat
  async findByIdForPurchase(id: string): Promise<Prompt> {
    const prompt = await this.promptsRepository.findOne({
      where: {
        id,
      },
    });

    
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

  // recupere un prompt avec son slug
  async findOneBySlug(
    slug: string,
    currentUserId?: string,
  ) {
    
    const normalizedSlug = slug.trim().toLowerCase();

    const prompt = await this.promptsRepository.findOne({
      where: {
        slug: normalizedSlug,
        status: PromptStatus.PUBLISHED,
      },

      // on recupere aussi les images
      relations: {
        previewImages: true,
      },
    });

    if (!prompt) {
      throw new NotFoundException({
        code: ErrorCodes.PROMPT_NOT_FOUND,
      });
    }

    
    const isOwner = currentUserId === prompt.sellerId;

  
    const isFree = PromptsService.isFree(prompt.price);

    // si c'est pas le proprietaire ou gratuit,
    // on verifie si il a deja acheter
    const hasPurchased =
      !isOwner && !isFree && currentUserId
        ? await this.hasCompletedPurchase(
            currentUserId,
            prompt.id,
          )
        : false;

    // le contenu est visible dans ces 3 cas
    const canViewFullContent =
      isOwner || isFree || hasPurchased;

    return {
      ...prompt,

      // cache le contenu si le user a pas le droit
      promptContent: canViewFullContent
        ? prompt.promptContent
        : null,

      isPurchasedByCurrentUser: hasPurchased,
    };
  }

  // cree un nouveau prompt
  async create(
    userId: string,
    createPromptDto: CreatePromptDto,
    file?: Express.Multer.File,
  ) {
    // verifie que le user existe
    await this.usersService.currentUser(userId);

    // on recupere la categorie et l'outil en meme temps
    const [category, aiTool] = await Promise.all([
      this.categoriesService.findById(
        createPromptDto.categoryId,
      ),

      this.aiToolsService.findById(
        createPromptDto.aiToolId,
      ),
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

    // ajoute un id pour eviter les doublons
    const slug =
      `${baseSlug}-${randomUUID().split('-')[0]}`;

    // garde les fichiers pour pouvoir les supprimer en cas d'erreur
    const uploadedKeys: string[] = [];

    try {
      // image de couverture
      let coverImageKey: string | null = null;

      if (file) {
        coverImageKey =
          `${StorageFolder.PROMPT_COVERS}/${file.filename}`;

        uploadedKeys.push(coverImageKey);
      }

      // prepare les images de preview
      const previewImages = (
        createPromptDto.previewImages ?? []
      ).map((previewFile, index) => {
        // chemin de l'image
        const previewKey =
          `${StorageFolder.PROMPT_PREVIEWS}/${previewFile.filename}`;

        uploadedKeys.push(previewKey);

        // cree une nouvelle image
        const previewImage = new PreviewImage();

        previewImage.url = previewKey;

        // permet de garder l'ordre des images
        previewImage.sortOrder = index + 1;

        return previewImage;
      });

      // prepare le prompt avant de l'enregistrer
      const prompt = this.promptsRepository.create({
        title,
        slug,

        // contenu complet du prompt
        promptContent: createPromptDto.promptContent,

        
        previewResult:
          createPromptDto.previewResult ?? null,

        coverImage: coverImageKey,

        //  prix avec 2 chiffres
        price: createPromptDto.price.toFixed(2),

       
        sellerId: userId,

        // categorie et outil utiliser
        categoryId: category.id,
        aiToolId: aiTool.id,

      
        status: PromptStatus.PUBLISHED,

        previewImages,
      });

      // enregistre le prompt en bdd
      return await this.promptsRepository.save(prompt);
    } catch (error) {
      // si ya une erreur on supprime les fichiers
      // qui ont deja été ajouter
      await Promise.allSettled(
        uploadedKeys.map((key) =>
          this.storageService.deleteFile(key),
        ),
      );

      // renvoie l'erreur
      throw error;
    }
  }
}

