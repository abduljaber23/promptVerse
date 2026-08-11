import { Module } from '@nestjs/common';
import { AdminCategoriesController } from './admin-categories.controller';
import { CategoriesModule } from '../categories/categories.module';
import { AiToolsModule } from '../ai-tools/ai-tools.module';
import { AdminAiToolsController } from './admin-ai-tools.controller';

@Module({
  imports: [CategoriesModule, AiToolsModule],
  controllers: [AdminCategoriesController, AdminAiToolsController],
  providers: [],
  exports: [],
})
export class AdminModule {}
