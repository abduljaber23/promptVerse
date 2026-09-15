import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

/**
 * Les fichiers uploadés (avatars, couvertures/aperçus de prompts) sont écrits
 * directement sur disque par Multer (`diskStorage`, voir `users.module.ts` /
 * `prompts.module.ts`) et servis par `StorageController`. Ce service ne gère
 * que leur suppression — `key` est toujours une valeur qu'on a nous-mêmes
 * écrite en base (`folder/nom-de-fichier`), jamais une entrée utilisateur.
 */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  async deleteFile(key: string): Promise<void> {
    try {
      await fs.unlink(join('uploads', key));
    } catch (e) {
      const error = e as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') return; // déjà absent : pas une erreur

      this.logger.error(`Error deleting file ${key}: ${error.message}`);
    }
  }
}
