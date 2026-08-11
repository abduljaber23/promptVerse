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
import { AuthRolesGuard } from '../../common/guards/auth-roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRoles } from '../../common/enums/user.enum';
import { AiToolsService } from '../ai-tools/ai-tools.service';
import { CreateAiToolDto } from '../ai-tools/dto/create-ai-tool.dto';
import { UpdateAiToolDto } from '../ai-tools/dto/update-ai-tool.dto';

@UseGuards(AuthRolesGuard)
@Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
@Controller({
  path: 'admin/ai-tools',
  version: '1',
})
export class AdminAiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @Get('archived')
  findAllArchived() {
    return this.aiToolsService.findAllArchived();
  }

  @Post()
  create(@Body() createAiToolDto: CreateAiToolDto) {
    return this.aiToolsService.create(createAiToolDto);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.aiToolsService.restore(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiToolDto: UpdateAiToolDto) {
    return this.aiToolsService.update(id, updateAiToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiToolsService.remove(id);
  }
}
