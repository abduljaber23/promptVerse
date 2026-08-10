import { Injectable, NotFoundException } from '@nestjs/common';
import { Prompt } from './entities/prompt.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PromptStatus } from '../../common/enums/prompt.enum';
import { ErrorCodes } from '../../common/errors/error-codes';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptsRepository: Repository<Prompt>,
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
}
