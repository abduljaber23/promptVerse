import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import slugify from 'slugify';
import { ErrorCodes } from '../../common/errors/error-codes';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const normalizedName = name.trim();
    const slug = slugify(normalizedName, {
      lower: true,
      strict: true,
    });

    const existingCategory = await this.categoriesRepository.findOne({
      where: [{ name: normalizedName }, { slug }],
      withDeleted: true,
    });

    if (existingCategory) {
      if (existingCategory.deletedAt) {
        throw new ConflictException({
          code: ErrorCodes.CATEGORY_ARCHIVED,
        });
      }

      throw new ConflictException({
        code: ErrorCodes.CATEGORY_ALREADY_EXISTS,
      });
    }

    const newCategory = this.categoriesRepository.create({
      name: normalizedName,
      slug,
    });
    return this.categoriesRepository.save(newCategory);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findAllArchived() {
    return this.categoriesRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  }

  findById(id: string) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.categoriesRepository.findOne({ where: { slug } });
  }

  async findOneBySlug(slug: string) {
    const normalizedSlug = slug.trim().toLowerCase();
    const category = await this.categoriesRepository.findOne({
      where: { slug: normalizedSlug },
    });
    if (!category) {
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({ where: { id } });

    if (!category)
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });

    if (updateCategoryDto.name) {
      const normalizedName = updateCategoryDto.name.trim();
      const slug = slugify(normalizedName, {
        lower: true,
        strict: true,
      });

      const existingCategory = await this.categoriesRepository.findOne({
        where: [
          { name: normalizedName, id: Not(id) },
          { slug, id: Not(id) },
        ],
      });

      if (existingCategory)
        throw new ConflictException({
          code: ErrorCodes.CATEGORY_ALREADY_EXISTS,
        });

      category.name = normalizedName;
      category.slug = slug;
    }

    return this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findOne({ where: { id } });

    if (!category)
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });

    return this.categoriesRepository.softRemove(category);
  }

  async restore(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!category)
      throw new NotFoundException({
        code: ErrorCodes.CATEGORY_NOT_FOUND,
      });

    return this.categoriesRepository.recover(category);
  }
}
