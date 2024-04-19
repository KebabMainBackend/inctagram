import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Put,
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
  ApiBody,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerDecoratorForGetProducts } from '../swagger/swagger.decorators';
import {
  NotFoundResponseOptions,
  UnauthorizedRequestResponseOptions,
} from '../../../utils/constants/swagger-constants';
import { firstValueFrom } from 'rxjs';

@Controller('subscription')
@ApiTags('Subscription')
@UseGuards(BearerAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse(UnauthorizedRequestResponseOptions)
export class SubscriptionsController {
  constructor(@Inject('PAYMENTS_SERVICE') private clientProxy: ClientProxy) {}

  @Get('hello')
  @SwaggerDecoratorForGetProducts()
  async hello() {
    return this.clientProxy.send({ cmd: 'hello' }, { data: 124 });
  }

  @Get('products')
  @SwaggerDecoratorForGetProducts()
  async get() {
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.GET_ALL_SUBSCRIPTIONS },
      { data: 124 },
    );
  }

  @Get('my-payments')
  async getUserPayments(@User() user: UserTypes) {
    console.log(user, 'user');
    const data = this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.GET_USER_PAYMENTS },
      { userId: user.id },
    );
    console.log(data);
    return data;
  }

  @Get('current')
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
      throw new NotFoundException('Not found');
    }
    return data;
  }

  @Post('purchase')
  @ApiBody({
    description: 'purchase subscription',
    type: PurchaseSubscriptionDto,
  })
  async buySubscription(
    @Body() payload: PurchaseSubscriptionDto,
    @User() user: UserTypes,
  ) {
    const userId = user.id;
    const email = user.email;
    return this.clientProxy.send(
      { cmd: PaymentsMicroserviceMessagesEnum.PURCHASE_SUBSCRIPTION },
      { userId, email, payload },
    );
  }

  @Put('auto-renewal')
  @ApiBody({
    description: 'change autorenewal for user',
    type: UpdateAutoRenewalStatusDto,
  })
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
