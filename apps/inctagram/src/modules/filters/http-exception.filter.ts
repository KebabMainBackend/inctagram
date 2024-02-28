import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseErrorMessageTypes } from '../../types/main.types';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 400) {
      const errorResponse = {
        errorsMessages: [] as ResponseErrorMessageTypes[],
      };
      const errorBody: any = exception.getResponse();
      errorBody.message.forEach((error: ResponseErrorMessageTypes) => {
        errorResponse.errorsMessages.push(error);
      });
      response.status(400).send(errorResponse);
    } else {
      const errorBody: any = exception.getResponse();
      response.status(status).json(errorBody);
    }
  }
}
