import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma.service";
import {EmailService} from "../../../auth/managers/email.manager";
import {purchaseSubscriptionDto, updateAutoRenewalStatusDto} from "../api/dto";
import {SubscriptionEntity} from "../domain/subscription.entity";


@Injectable()
export class SubscriptionRepository {
    constructor(private prisma: PrismaService,
                private EmailService: EmailService) {}

    async getCurrentSubscribeInfo(userId: number) {
        const current =
            await this.prisma.subscription.findUnique({
                where: {userId},
                include: {
                    profile: {
                        include: {
                            user: {
                                select: {
                                    email: true
                                }
                            }
                        }
                    }
                }
            })

        if(current.expireAt < new Date()) {
            await this.prisma.profile.update({
                where: {userId},
                data: {
                    accountType: 'Personal'
                }
            })

            return await this.EmailService
                .sendSubscriptionHasExpiredEmail(current.profile.user.email)
        }

        if(current.autoRenewal) return {
            expireAt: current.expireAt
        }
        else return {
            expireAt: current.expireAt,
            nextPayment: current.dateOfNextPayment
        }
    }

    async buySubscription(payload: purchaseSubscriptionDto, userId: string) {

        const sub = SubscriptionEntity.create(payload, userId)

        console.log(sub)


    }
}