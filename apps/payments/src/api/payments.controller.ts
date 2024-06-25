import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsMicroserviceMessagesEnum } from '../../../../types/messages';
import { ProductQueryRepository } from '../db/product.query-repository';
import { GetCurrentSubscriptionInfoCommand } from '../application/use-cases/get-current-subscription-info.command';
import { PurchaseSubscriptionCommand } from '../application/use-cases/purchase-subscription.command';
import {
  PurchaseSubscriptionDto,
  UpdateAutoRenewalStatusDto,
} from './dto/subscription.dto';
import { UpdateAutoRenewalStatusCommand } from '../application/use-cases/update-auto-renewal-status.command';
import { GetUserPaymentsCommand } from '../application/use-cases/get-user-payments.command';
import { CreatePaypalWebhookCommand } from '../application/use-cases/paypal/create-paypal-webhook.command';
import { createPaypalWebhook } from '../../../inctagram/src/features/subscriptions/api/dto/dto';
import { GetDefaultUriDtoWithPageNumber } from '../../../inctagram/src/utils/default-get-query.uri.dto';
import { GetUsersPaymentsCommand } from '../application/use-cases/get-users-payments.command';

@Controller()
export class PaymentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private productQueryRepo: ProductQueryRepository,
  ) {}

  @MessagePattern({
    cmd: 'hello',
  })
  async hello() {
    return 'hello';
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.GET_ALL_SUBSCRIPTIONS,
  })
  async getAllSubscriptions() {
    return this.productQueryRepo.getSubscriptionsTypes();
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.GET_CURRENT_SUBSCRIPTION,
  })
  async getCurrentSubscription(data: { userId: number }) {
    return await this.commandBus.execute(
      new GetCurrentSubscriptionInfoCommand(data.userId),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.PURCHASE_SUBSCRIPTION,
  })
  async purchaseSubscription(data: {
    userId: number;
    email: string;
    payload: PurchaseSubscriptionDto;
  }) {
    console.log(2, data.userId);
    return this.commandBus.execute(
      new PurchaseSubscriptionCommand(
        data.userId,
        data.email,
        data.payload,
        null,
      ),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.UPDATE_AUTO_RENEWAL,
  })
  async updateAutoRenewalStatus(data: {
    userId: number;
    payload: UpdateAutoRenewalStatusDto;
  }) {
    return this.commandBus.execute(
      new UpdateAutoRenewalStatusCommand(data.userId, data.payload),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.GET_USER_PAYMENTS,
  })
  async getUserPayments(data: {
    userId: number;
    query: GetDefaultUriDtoWithPageNumber;
  }) {
    return this.commandBus.execute(
      new GetUserPaymentsCommand(data.userId, data.query),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.GET_USERS_PAYMENTS,
  })
  async getUsersPayments(data: {
    userIds: number[];
    query: GetDefaultUriDtoWithPageNumber;
    isAutoUpdate: boolean;
  }) {
    return this.commandBus.execute(
      new GetUsersPaymentsCommand(data.userIds, data.query, data.isAutoUpdate),
    );
  }

  @MessagePattern({
    cmd: PaymentsMicroserviceMessagesEnum.PAYPAL_CREATE_WEBHOOK,
  })
  async createPaypalWebhook(data: { payload: createPaypalWebhook }) {
    return this.commandBus.execute(
      new CreatePaypalWebhookCommand(data.payload.url),
    );
  }
}
