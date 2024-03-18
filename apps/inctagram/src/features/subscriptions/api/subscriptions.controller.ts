import {Body, Controller, Get, Post, Put, Req, UseGuards} from "@nestjs/common";
import {PrismaService} from "../../../prisma.service";
import {BearerAuthGuard} from "../../../auth/guards/bearer-auth.guard";
import {purchaseSubscriptionDto, updateAutoRenewalStatusDto} from "./dto";

@Controller('subscription')
@UseGuards(BearerAuthGuard)
export class SubscriptionsController {
    constructor(private prisma: PrismaService) {}

    @Get('current')
    async currentSubscribeInfo(@Req() req: any) {

    }

    @Post('purchase')
    async buySubscription(@Body() payload: purchaseSubscriptionDto,
                          @Req() req: any){
        // req = { owner: { id: ..., email: ... }  }
    }

    @Put('auto-renewal')
    async updateAutoRenewalStatus(@Body() payload: updateAutoRenewalStatusDto,
                                  @Req() req: any){

    }
}