import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCodes } from '../../common/errors/error-codes';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname, parse } from 'path';
import 'multer';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private readonly logger = new Logger(StorageService.name);
  private readonly bucket: string;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET')!;
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION') || 'us-east-1',
      endpoint: this.configService.get<string>('AWS_S3_ENDPOINT'),
      forcePathStyle: true, // Required for MinIO
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        )!,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: 'avatars' | 'media',
  ): Promise<string> {
    try {
      const fileExtName = extname(file.originalname);
      const originalNameWithoutExt = parse(file.originalname).name;

      // Nettoyage du nom d'origine (minuscules, suppression des caractères spéciaux et espaces)
      const sanitizedOriginalName =
        originalNameWithoutExt
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '') || 'file';

      const randomName = randomUUID().replace(/-/g, '').slice(0, 8);
      const key = `${folder}/${sanitizedOriginalName}-${randomName}${fileExtName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      return key;
    } catch (e) {
      const error = e as Error;
      this.logger.error(
        `Error uploading file to S3: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException({
        code: ErrorCodes.FILE_UPLOAD_FAILED,
      });
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (e) {
      const error = e as Error;
      this.logger.error(
        `Error deleting file from S3: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException({
        code: ErrorCodes.FILE_DELETE_FAILED,
      });
    }
  }

  async getFile(key: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      return await this.s3Client.send(command);
    } catch (e) {
      const error = e as Error;
      if (error.name === 'NoSuchKey') {
        throw new NotFoundException({
          code: ErrorCodes.FILE_NOT_FOUND,
        });
      }
      this.logger.error(
        `Error getting file from S3: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  getPublicUrl(key: string): string {
    const endpoint = this.configService.get<string>('AWS_S3_ENDPOINT')!;
    // Normalize endpoint (remove trailing slash)
    const normalizedEndpoint = endpoint.endsWith('/')
      ? endpoint.slice(0, -1)
      : endpoint;
    return `${normalizedEndpoint}/${this.bucket}/${key}`;
  }
}
