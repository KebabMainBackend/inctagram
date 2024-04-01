import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BearerAuthGuard } from '../../../auth/guards/bearer-auth.guard';
import { purchaseSubscriptionDto, updateAutoRenewalStatusDto } from './dto';
import { SubscriptionRepository } from '../db/subscription.repository';

import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceMessagesEnum } from '../../../../../../types/messages';

import { ProductRepository } from "../../stripe/db/product.repository";


@Controller('subscription')
@UseGuards(BearerAuthGuard)
export class SubscriptionsController {

  constructor(
    private SubscriptionRepo: SubscriptionRepository,
    @Inject('PAYMENTS_SERVICE') private clientProxy: ClientProxy,
      private ProductRepository: ProductRepository
  ) {}

  @Get('')
  get() {
    return this.clientProxy.send({ cmd: 'hello-rmq' }, { lol: 123 });

  @Get('types')
  async get() {
    return await this.ProductRepository.getSubscriptionsTypes()
  }

  @Get('current')
  async getCurrentSubscribeInfo(@Req() req: any) {
    return this.SubscriptionRepo.getCurrentSubscribeInfo(req.owner.id);
  }

  @Post('purchase')
  async buySubscription(
    @Body() payload: purchaseSubscriptionDto,
    @Req() req: any,
  ) {
    return await this.SubscriptionRepo.buySubscription(payload, req.owner.id);
    // req = { owner: { id: ..., email: ... }  }
  }

  @Put('auto-renewal')
  async updateAutoRenewalStatus(
    @Body() payload: updateAutoRenewalStatusDto,
    @Req() req: any,
  ) {
    return await this.SubscriptionRepo.updateAutoRenewalStatus(
      payload.autoRenewal,
      payload.subscriptionId,
      req.owner.id,
    );
  }
}
