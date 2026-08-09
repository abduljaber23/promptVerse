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
import { AiToolsService } from './ai-tools.service';
import { CreateAiToolDto } from './dto/create-ai-tool.dto';
import { UpdateAiToolDto } from './dto/update-ai-tool.dto';
import { AuthRolesGuard } from '../../common/guards/auth-roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRoles } from '../../common/enums/user.enum';
import { Public } from '../../common/decorators/public.decorator';

@Controller('ai-tools')
export class AiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  create(@Body() createAiToolDto: CreateAiToolDto) {
    return this.aiToolsService.create(createAiToolDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.aiToolsService.findAll();
  }

  @Get('archived')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  findAllArchived() {
    return this.aiToolsService.findAllArchived();
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.aiToolsService.findOneBySlug(slug);
  }

  @Patch(':id/restore')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  restore(@Param('id') id: string) {
    return this.aiToolsService.restore(id);
  }

  @Patch(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  update(@Param('id') id: string, @Body() updateAiToolDto: UpdateAiToolDto) {
    return this.aiToolsService.update(id, updateAiToolDto);
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  remove(@Param('id') id: string) {
    return this.aiToolsService.remove(id);
  }
}
