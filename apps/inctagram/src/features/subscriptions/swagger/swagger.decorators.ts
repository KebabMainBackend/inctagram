import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  GetRequestProductsViewExample,
  GetRequestCurrentSubscriptionViewExample,
  GetRequestPaymentsViewExample,
} from './swagger.examples';
import { UpdateAutoRenewalStatusDto } from '../../../../../payments/src/api/dto/subscription.dto';

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

export function SwaggerDecoratorForAutoRenewal(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Update auto renewal' }),
    ApiBody({ type: UpdateAutoRenewalStatusDto }),
  );
}

export function SwaggerDecoratorForCurrentSubscription(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'get current subscription' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      content: {
        'application/json': {
          example: GetRequestCurrentSubscriptionViewExample,
        },
      },
    }),
  );
}

export function SwaggerDecoratorGetPayments(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'get current subscription' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      content: {
        'application/json': { example: [GetRequestPaymentsViewExample] },
      },
    }),
  );
}
