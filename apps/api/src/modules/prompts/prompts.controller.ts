import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { jwtPayloadType } from '../../common/enums/user.enum';
import { Public } from '../../common/decorators/public.decorator';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  @Public()
  findAll(
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber: number,
    @Query('promptsPerPage', new DefaultValuePipe(10), ParseIntPipe)
    promptsPerPage: number,
  ) {
    return this.promptsService.findAll(pageNumber, promptsPerPage);
  }

  @Get('me')
  findAllByCurrentUser(@CurrentUser() payload: jwtPayloadType) {
    return this.promptsService.findAllByCurrentUser(payload.sub);
  }

  @Get(':slug')
  @Public()
  findOneBySlug(@Param('slug') slug: string) {
    return this.promptsService.findOneBySlug(slug);
  }

  @Get('category/:categorySlug')
  @Public()
  findAllByCategory(@Param('categorySlug') categorySlug: string) {
    return this.promptsService.findAllByCategory(categorySlug);
  }

  @Get('ai-tool/:aiToolSlug')
  @Public()
  findAllByAiTool(@Param('aiToolSlug') aiToolSlug: string) {
    return this.promptsService.findAllByAiTool(aiToolSlug);
  }
}
