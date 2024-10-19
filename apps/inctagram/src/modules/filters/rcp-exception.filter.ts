// import {
//   Catch,
//   RpcExceptionFilter,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Observable, throwError } from 'rxjs';
// import { RpcException } from '@nestjs/microservices';
// @Catch(RpcException)
// export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
//   catch(exception: any, host: ArgumentsHost): Observable<any> {
//     console.log('rpc exc 1');
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;
//     const message =
//       exception instanceof HttpException
//         ? exception.message
//         : 'Internal Server Error';
//     console.log('rpc exc');
//     return throwError(() =>
//       response.status(status).json(sendError(message, status)),
//     );
//   }
// }
