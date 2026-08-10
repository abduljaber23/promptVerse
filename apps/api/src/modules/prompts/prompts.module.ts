import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { Module } from '@nestjs/common';
import { Prompt } from './entities/prompt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { AiToolsModule } from '../ai-tools/ai-tools.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt]),
    CategoriesModule,
    AiToolsModule,
  ],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [],
})
export class PromptsModule {}
