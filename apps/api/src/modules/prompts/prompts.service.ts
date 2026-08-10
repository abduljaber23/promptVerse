import { Injectable, NotFoundException } from '@nestjs/common';
import { Prompt } from './entities/prompt.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PromptStatus } from '../../common/enums/prompt.enum';
import { ErrorCodes } from '../../common/errors/error-codes';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptsRepository: Repository<Prompt>,
    private readonly categoriesService: CategoriesService,
    private readonly aiToolsService: AiToolsService,
  ) {}

  findAll(pageNumber: number, promptsPerPage: number) {
    return this.promptsRepository.find({
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

  async findOneBySlug(slug: string) {
    const normalizedSlug = slug.trim().toLowerCase();
    const prompt = await this.promptsRepository.findOne({
      where: { slug: normalizedSlug, status: PromptStatus.PUBLISHED },
    });

    if (!prompt) {
      throw new NotFoundException({
        code: ErrorCodes.PROMPT_NOT_FOUND,
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
      where: { aiToolId: aiTool.id, status: PromptStatus.PUBLISHED },
      order: { createdAt: 'DESC' },
    });
  }
}
