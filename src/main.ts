/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { AppModule } from './application/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // Middlewares
  app.use(json());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }),
  )
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
    exposedHeaders: '*',
    optionsSuccessStatus: HttpStatus.NO_CONTENT,
  });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
