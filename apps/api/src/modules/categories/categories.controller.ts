import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthRolesGuard } from '../../common/guards/auth-roles.guard';
import { UserRoles } from '../../common/enums/user.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('archived')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  findAllArchived() {
    return this.categoriesService.findAllArchived();
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.categoriesService.findOneBySlug(slug);
  }

  @Patch(':id/restore')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  restore(@Param('id') id: string) {
    return this.categoriesService.restore(id);
  }

  @Patch(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
