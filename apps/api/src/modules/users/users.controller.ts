import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Readable } from 'stream';
import type { Express, Response } from 'express';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { jwtPayloadType } from '../../common/enums/user.enum';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { StorageService } from '../storage/storage.service';
import { Public } from '../../common/decorators/public.decorator';
import { ErrorCodes } from '../../common/errors/error-codes';
import { AvatarUploadDto } from './dto/avatar-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@ApiSecurity('access_token')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
  ) {}

  @Get('me')
  me(@CurrentUser() payload: jwtPayloadType) {
    return this.usersService.currentUser(payload.sub);
  }

  @Patch('me')
  update(
    @CurrentUser() payload: jwtPayloadType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(updateUserDto, payload.sub);
  }

  @Delete('me')
  delete(@CurrentUser() payload: jwtPayloadType) {
    return this.usersService.delete(payload.sub);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: AvatarUploadDto,
    description: 'Avatar upload',
  })
  uploadProfileAvatar(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() payload: jwtPayloadType,
  ) {
    if (!file)
      throw new BadRequestException({
        code: ErrorCodes.NO_FILE_PROVIDED,
      });
    return this.usersService.setProfileAvatar(payload.sub, file);
  }

  @Delete('avatar')
  removeProfileAvatar(@CurrentUser() payload: jwtPayloadType) {
    return this.usersService.removeProfileAvatar(payload.sub);
  }

  @Get('avatar/:filename')
  @Public()
  async showProfileAvatar(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    try {
      const file = await this.storageService.getFile('avatars/' + filename);
      if (file.ContentType) {
        res.setHeader('Content-Type', file.ContentType);
      }
      if (file.ContentLength) {
        res.setHeader('Content-Length', file.ContentLength.toString());
      }
      (file.Body as Readable).pipe(res);
    } catch {
      res.status(404).send('Not found');
    }
  }
}
