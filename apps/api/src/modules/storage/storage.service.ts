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
import { extname } from 'path';
import 'multer';
import { StorageFolder } from '../../common/enums/storage-folder.enum';

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
      forcePathStyle: true,
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
    folder: StorageFolder,
  ): Promise<string> {
    try {
      const fileExtName = extname(file.originalname);
      const key = `${folder}/${randomUUID()}${fileExtName}`;

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
}
