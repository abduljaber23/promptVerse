import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { BadRequestException, Module } from '@nestjs/common';
import { Prompt } from './entities/prompt.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { AiToolsModule } from '../ai-tools/ai-tools.module';
import { StorageModule } from '../storage/storage.module';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { ErrorCodes } from '../../common/errors/error-codes';
import { StorageFolder } from '../../common/enums/storage-folder.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt, Purchase]),
    MulterModule.register({
      storage: diskStorage({
        // `coverImage` et `previewImages` (voir PromptsController) vont dans
        // deux sous-dossiers distincts, sélectionnés via `file.fieldname`.
        destination: (req, file, cb) => {
          const folder =
            file.fieldname === 'coverImage'
              ? StorageFolder.PROMPT_COVERS
              : StorageFolder.PROMPT_PREVIEWS;
          cb(null, `./uploads/${folder}`);
        },
        filename: (req, file, cb) => {
          cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException({
              code: ErrorCodes.UNSUPPORTED_FILE_TYPE,
            }),
            false,
          );
        }
      },
      limits: { fileSize: 1024 * 1024 * 8 }, // 8 megabytes
    }),
    UsersModule,
    CategoriesModule,
    AiToolsModule,
    StorageModule,
  ],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [PromptsService],
})
export class PromptsModule {}
