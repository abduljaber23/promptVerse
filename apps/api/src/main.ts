import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const appUrl = configService.getOrThrow<string>('APP_URL');
  const port = configService.getOrThrow<number>('PORT');
  const apiPrefix = configService.getOrThrow<string>('API_PREFIX');
  const nodeEnv = configService.getOrThrow<string>('NODE_ENV');
  const swaggerEnabled = configService.getOrThrow<boolean>('SWAGGER_ENABLED');
  const CLIENT_URL = configService.getOrThrow<string>('CLIENT_URL');

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(cookieParser());

  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('promptVerse store API')
      .setDescription('API documentation for the promptVerse store project')
      .setVersion('1.0')
      .addCookieAuth('access_token')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  }

  await app.listen(port, '0.0.0.0');

  logger.log(`Environment: ${nodeEnv}`);
  logger.log(`Api docs: ${appUrl}/${apiPrefix}/docs`);
}
void bootstrap();
