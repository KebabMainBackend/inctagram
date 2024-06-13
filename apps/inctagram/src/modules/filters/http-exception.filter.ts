import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { request, Response } from 'express';
import { ExceptionResponseType } from '../../types/main.types';
import { UserInputError } from '@nestjs/apollo';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const type = host.getType().toString();
    console.log(exception);
    try {
      if (type === 'http') {
        console.log(type);
        this.handleHttpException(exception, response);
      } else if (type === 'graphql') {
        return this.handleGqlException(exception);
      }
    } catch (error) {
      console.log('All EXCEPTIONS CATCH:', error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          this.getDefaultResponseHttpBody(HttpStatus.INTERNAL_SERVER_ERROR),
        );
    }
  }
  private handleGqlException(exception: unknown) {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      throw new UserInputError(exception?.message, {});
    }
    return exception;
  }
  private handleHttpException(exception: unknown, response: Response) {
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
      .json(this.getDefaultResponseHttpBody(HttpStatus.INTERNAL_SERVER_ERROR));
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
