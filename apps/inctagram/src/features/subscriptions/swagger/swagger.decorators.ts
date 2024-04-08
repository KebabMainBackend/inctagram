import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetRequestProductsViewExample } from './swagger.examples';

export function SwaggerDecoratorForGetProducts(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Get list of subscriptions ' }),
    // ApiBody({ type: [PaymentsDto] }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      content: {
        'application/json': { example: [GetRequestProductsViewExample] },
      },
    }),
  );
}
