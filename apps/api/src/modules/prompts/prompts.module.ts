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
import { ErrorCodes } from '../../common/errors/error-codes';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt, Purchase]),
    MulterModule.register({
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
