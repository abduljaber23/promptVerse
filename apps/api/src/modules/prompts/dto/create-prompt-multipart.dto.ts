import { ApiPropertyOptional } from '@nestjs/swagger';
import 'multer';
import type { Express } from 'express';

export class PromptImagesUploadDto {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    required: false,
    name: 'coverImage',
  })
  coverImage?: Express.Multer.File;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
    name: 'previewImages',
  })
  previewImages?: Express.Multer.File[];
}
