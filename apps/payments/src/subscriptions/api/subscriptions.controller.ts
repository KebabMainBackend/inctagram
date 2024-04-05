import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { BearerAuthGuard } from "../../../../inctagram/src/auth/guards/bearer-auth.guard";
import { CommandBus } from "@nestjs/cqrs";
import { purchaseSubscriptionDto } from "../../../../inctagram/src/features/subscriptions/api/dto";

@Controller("subscription")
@UseGuards(BearerAuthGuard)
export class SubscriptionsController {

  constructor(private commandBus: CommandBus) {}

  @Post("purchase")
  async buySubscription(@Body() command: purchaseSubscriptionDto,
                        @Req() req: any) {

  }

}