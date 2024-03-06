import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { request, Response } from 'express';
import { ExceptionResponseType } from '../../types/main.types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      const isHttpException = exception instanceof HttpException;
      const exceptionResponse = isHttpException
        ? (exception.getResponse() as ExceptionResponseType)
        : null;
      const message = isHttpException ? exception?.message : 'Some error';
      const errorDescription = Array.isArray(exceptionResponse?.message)
        ? exceptionResponse?.message
        : null;

      const status = isHttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        response.status(status).json({
          ...this.getDefaultResponseHttpBody(status),
          path: request.url,
          message,
          errorDescription,
        });

        return;
      }
      response
        .status(status)
        .json(
          this.getDefaultResponseHttpBody(HttpStatus.INTERNAL_SERVER_ERROR),
        );
    } catch (error) {
      console.log('All EXCEPTIONS CATCH:', error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.getDefaultResponseHttpBody(HttpStatus.INTERNAL_SERVER_ERROR),
        );
    }
  }

  getDefaultResponseHttpBody(status: number) {
    return {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: null,
      message: 'Some error occurred',
      errorDescription: null,
    };
  }
}
