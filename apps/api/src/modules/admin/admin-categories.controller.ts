import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { AuthRolesGuard } from '../../common/guards/auth-roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRoles } from '../../common/enums/user.enum';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

@UseGuards(AuthRolesGuard)
@Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
@Controller({
  path: 'admin/categories',
  version: '1',
})
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('archived')
  findAllArchived() {
    return this.categoriesService.findAllArchived();
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.categoriesService.restore(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
