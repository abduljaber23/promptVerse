import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { Module } from '@nestjs/common';
import { Prompt } from './entities/prompt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prompt])],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [],
})
export class PromptsModule {}
