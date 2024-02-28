import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ResponseErrorMessageTypes } from './types/main.types';
import { HttpExceptionFilter } from './modules/filters/http-exception.filter';

export const appSettings = (app: INestApplication) => {
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const respErrors: ResponseErrorMessageTypes[] = [];
        errors.forEach((error) => {
          const keys = Object.keys(error.constraints!);
          keys.forEach((key) => {
            respErrors.push({
              message: error.constraints![key],
              field: error.property,
            });
          });
        });

        throw new BadRequestException(respErrors);
      },
    }),
  );
  app.enableCors({
    origin: [
      'https://inctagram.fun/',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:3001',
    ],
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
};
