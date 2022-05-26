/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './application/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
    exposedHeaders: '*',
    optionsSuccessStatus: HttpStatus.NO_CONTENT,
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
