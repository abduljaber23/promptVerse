import { BadRequestException, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';
import { MulterModule } from '@nestjs/platform-express';
import { ErrorCodes } from '../../common/errors/error-codes';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    StorageModule,
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
      limits: { fileSize: 1024 * 1024 * 5 }, // 5 megabytes
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
