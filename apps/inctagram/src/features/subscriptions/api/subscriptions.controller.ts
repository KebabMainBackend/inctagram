import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import { PurchaseSubscriptionDto, UpdateAutoRenewalStatusDto } from './dto/dto';

import { ClientProxy } from '@nestjs/microservices';

import { PaymentsMicroserviceMessagesEnum } from '../../../../../../types/messages';
import { User } from '../../../utils/decorators/user.decorator';
import { UserTypes } from '../../../types';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  SwaggerDecoratorForAutoRenewal,
  SwaggerDecoratorForCurrentSubscription,
  SwaggerDecoratorForGetProducts,
  SwaggerDecoratorGetPayments,
} from '../swagger/swagger.decorators';

import {
  NotFoundResponseOptions,
  UnauthorizedRequestResponseOptions,
} from '../../../utils/constants/swagger-constants';
import { firstValueFrom } from 'rxjs';
import { GetDefaultUriDtoWithPageNumber } from '../../../utils/default-get-query.uri.dto';

@Controller('subscription')
@ApiTags('Subscription')
@UseGuards(BearerAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
export class SubscriptionsController {
  constructor(@Inject('PAYMENTS_SERVICE') private clientProxy: ClientProxy) {}

  @Get('products')
  @SwaggerDecoratorForGetProducts()
  async get() {
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.GET_ALL_SUBSCRIPTIONS },
      { data: 124 },
    );
  }

  @Get('my-payments')
  @SwaggerDecoratorGetPayments()
  async getUserPayments(
    @User() user: UserTypes,
    @Query() payload: GetDefaultUriDtoWithPageNumber,
  ) {
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.GET_USER_PAYMENTS },
      { userId: user.id, query: payload },
    );
  }

  @Get('current')
  @SwaggerDecoratorForCurrentSubscription()
  @ApiNotFoundResponse(NotFoundResponseOptions)
  async getCurrentSubscribeInfo(@User() user: UserTypes) {
    const userId = user.id;

    const data = await firstValueFrom(
      this.clientProxy.send(
        { cmd: PaymentsMicroserviceMessagesEnum.GET_CURRENT_SUBSCRIPTION },
        { userId },
      ),
    );
    if (data.errorCode === HttpStatus.NOT_FOUND) {
      throw new NotFoundException('Expired');
    }
    return data;
  }

  @Post('purchase')
  async buySubscription(
    @Body() payload: PurchaseSubscriptionDto,
    @User() user: UserTypes,
  ) {
    const userId = user.id;
    const email = user.email;
    console.log(userId, email);
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.PURCHASE_SUBSCRIPTION },
      { userId, email, payload },
    );
  }

  @Put('auto-renewal')
  @SwaggerDecoratorForAutoRenewal()
  async updateAutoRenewalStatus(
    @Body() payload: UpdateAutoRenewalStatusDto,
    @User() user: UserTypes,
  ) {
    const userId = user.id;
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.UPDATE_AUTO_RENEWAL },
      { userId, payload },
    );
  }
}
