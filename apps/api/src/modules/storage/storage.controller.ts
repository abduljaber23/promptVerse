import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { Public } from '../../common/decorators/public.decorator';
import { StorageFolder } from '../../common/enums/storage-folder.enum';
import { ErrorCodes } from '../../common/errors/error-codes';

/**
 * Sert en lecture les fichiers uploadés (avatars, couvertures/aperçus de
 * prompts), écrits sur disque sous `uploads/<folder>/` par Multer.
 */
@Controller({
  path: 'uploads',
  version: '1',
})
export class StorageController {
  @Get(':folder/:filename')
  @Public()
  getFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    if (!Object.values(StorageFolder).includes(folder as StorageFolder)) {
      throw new NotFoundException({ code: ErrorCodes.FILE_NOT_FOUND });
    }

    return res.sendFile(filename, { root: join('uploads', folder) });
  }
}
