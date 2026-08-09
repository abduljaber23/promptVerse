import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { UpdateAiToolDto } from './dto/update-ai-tool.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AiTool } from './entities/ai-tool.entity';
import { IsNull, Not, Repository } from 'typeorm';
import slugify from 'slugify';
import { ErrorCodes } from '../../common/errors/error-codes';

@Injectable()
export class AiToolsService {
  constructor(
    @InjectRepository(AiTool)
    private readonly aiToolsRepository: Repository<AiTool>,
  ) {}

  async create(createAiToolDto: CreateAiToolDto) {
    const { name } = createAiToolDto;
    const normalizedName = name.trim();
    const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
    });

    const existingAiTool = await this.aiToolsRepository.findOne({
      where: [{ name: normalizedName }, { slug }],
      withDeleted: true,
    });

    if (existingAiTool) {
      if (existingAiTool.deletedAt) {
        throw new ConflictException({
          code: ErrorCodes.AI_TOOL_ARCHIVED,
        });
      }

      throw new ConflictException({
        code: ErrorCodes.AI_TOOL_ALREADY_EXISTS,
      });
    }

    const newAiTool = this.aiToolsRepository.create({
      name: normalizedName,
      slug,
    });
    return this.aiToolsRepository.save(newAiTool);
  }

  findAll() {
    return this.aiToolsRepository.find();
  }

  findAllArchived() {
    return this.aiToolsRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }

  async findOneBySlug(slug: string) {
    const normalizedSlug = slug.trim().toLocaleLowerCase();
    const aiTool = await this.aiToolsRepository.findOne({
      where: { slug: normalizedSlug },
    });
    if (!aiTool) {
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });
    }
    return aiTool;
  }

  async update(id: string, updateAiToolDto: UpdateAiToolDto) {
    const aiTool = await this.aiToolsRepository.findOne({ where: { id } });

    if (!aiTool)
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });

    if (updateAiToolDto.name) {
      const normalizedName = updateAiToolDto.name.trim();
      const slug = slugify(normalizedName, {
        lower: true,
        strict: true,
      });

      const existingAiTool = await this.aiToolsRepository.findOne({
        where: [
          { name: normalizedName, id: Not(id) },
          { slug, id: Not(id) },
        ],
      });

      if (existingAiTool)
        throw new ConflictException({
          code: ErrorCodes.AI_TOOL_ALREADY_EXISTS,
        });

      aiTool.name = normalizedName;
      aiTool.slug = slug;
    }

    return this.aiToolsRepository.save(aiTool);
  }

  async remove(id: string) {
    const aiTool = await this.aiToolsRepository.findOne({ where: { id } });

    if (!aiTool)
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });

    return this.aiToolsRepository.softRemove(aiTool);
  }

  async restore(id: string) {
    const aiTool = await this.aiToolsRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!aiTool)
      throw new NotFoundException({
        code: ErrorCodes.AI_TOOL_NOT_FOUND,
      });

    return this.aiToolsRepository.recover(aiTool);
  }
}
