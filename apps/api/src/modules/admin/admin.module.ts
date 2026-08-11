import { Module } from '@nestjs/common';
import { AdminCategoriesController } from './controllers/admin-categories.controller';
import { CategoriesModule } from '../categories/categories.module';
import { AiToolsModule } from '../ai-tools/ai-tools.module';
import { AdminAiToolsController } from './controllers/admin-ai-tools.controller';
import { AdminUsersService } from './services/admin-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AdminUsersController } from './controllers/admin-users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CategoriesModule, AiToolsModule],
  controllers: [
    AdminUsersController,
    AdminCategoriesController,
    AdminAiToolsController,
  ],
  providers: [AdminUsersService],
  exports: [],
})
export class AdminModule {}
