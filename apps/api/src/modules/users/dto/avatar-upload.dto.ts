import { ApiProperty } from '@nestjs/swagger';
import 'multer';
import type { Express } from 'express';

export class AvatarUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    name: 'avatar',
  })
  file: Express.Multer.File;
}
