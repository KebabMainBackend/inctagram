import {Body, Controller, Get, Post, Put, Req, UseGuards} from "@nestjs/common";
import {BearerAuthGuard} from "../../../auth/guards/bearer-auth.guard";
import {purchaseSubscriptionDto, updateAutoRenewalStatusDto} from "./dto";
import {SubscriptionRepository} from "../db/subscription.repository";

@Controller('subscription')
@UseGuards(BearerAuthGuard)
export class SubscriptionsController {
    constructor(private SubscriptionRepo: SubscriptionRepository) {}

    @Get('')
    get() {

    }

    @Get('current')
    async getCurrentSubscribeInfo(@Req() req: any) {
        return this.SubscriptionRepo.getCurrentSubscribeInfo(req.owner.id)
    }

    @Post('purchase')
    async buySubscription(@Body() payload: purchaseSubscriptionDto,
                          @Req() req: any){
        return await this.SubscriptionRepo.buySubscription(payload, req.owner.id)
        // req = { owner: { id: ..., email: ... }  }
    }

    @Put('auto-renewal')
    async updateAutoRenewalStatus(@Body() payload: updateAutoRenewalStatusDto,
                                  @Req() req: any){
        return await this.SubscriptionRepo
            .updateAutoRenewalStatus(payload.autoRenewal, req.owner.id)
    }
}