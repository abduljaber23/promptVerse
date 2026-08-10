import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { jwtPayloadType } from '../../common/enums/user.enum';
import { Public } from '../../common/decorators/public.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Controller({
  path: 'prompts',
  version: '1',
})
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

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'coverImage', maxCount: 1 },
      { name: 'previewImages', maxCount: 10 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreatePromptDto,
    description: 'Prompt creation with optional cover image and preview images',
  })
  createPrompt(
    @CurrentUser() payload: jwtPayloadType,
    @Body() createPromptDto: CreatePromptDto,
    @UploadedFiles()
    files: {
      coverImage?: Express.Multer.File[];
      previewImages?: Express.Multer.File[];
    },
  ) {
    createPromptDto.previewImages = files?.previewImages;

    const coverImage = files?.coverImage?.[0];

    return this.promptsService.create(payload.sub, createPromptDto, coverImage);
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
