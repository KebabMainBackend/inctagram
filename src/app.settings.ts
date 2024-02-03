import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ResponseErrorTypes } from './types/main';
import { HttpExceptionFilter } from './filters/http-exception.filter';

export const appSettings = (app: INestApplication) => {
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const respErrors: ResponseErrorTypes[] = [];
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
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
};
