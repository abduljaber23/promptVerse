import { Controller, Get, Param } from '@nestjs/common';
import { AiToolsService } from './ai-tools.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller({
  path: 'ai-tools',
  version: '1',
})
export class AiToolsController {
  constructor(private readonly aiToolsService: AiToolsService) {}

  @Get()
  @Public()
  findAll() {
    return this.aiToolsService.findAll();
  }

  @Get(':slug')
  @Public()
  findOne(@Param('slug') slug: string) {
    return this.aiToolsService.findOneBySlug(slug);
  }
}
