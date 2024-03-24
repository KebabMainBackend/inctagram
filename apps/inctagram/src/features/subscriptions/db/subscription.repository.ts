import {HttpException, Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma.service";
import {EmailService} from "../../../auth/managers/email.manager";
import {purchaseSubscriptionDto} from "../api/dto";
import {SubscriptionEntity} from "../domain/subscription.entity";
import {PaymentsEntity} from "../domain/payments.entity";
import {intervalToDuration} from "date-fns";
import Stripe from "stripe";
import {ProductRepository} from "../../stripe/db/product.repository";


@Injectable()
export class SubscriptionRepository {
    constructor(private prisma: PrismaService,
                private EmailService: EmailService,
                private ProductRepository: ProductRepository) {}

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

        if(!current) throw new HttpException('Not Found', 404)

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

        const daysLeft = intervalToDuration({
            start: new Date(),
            end: current.expireAt
        })

        if(current.autoRenewal) return {
            expireAt: daysLeft.days
        }
        else return {
            expireAt: daysLeft.days,
            nextPayment: current.dateOfNextPayment
        }
    }

    async buySubscription(payload: purchaseSubscriptionDto,
                          userId: number, quantity = 1) {
        // is user already subscriber ?

        const subscription =
            await this.prisma.subscription.findUnique({ where: { userId } })

        const newSubscription = SubscriptionEntity.create(payload, userId)

        const productInfo =
            await this.prisma.stripe.findFirst({
                where: {type: payload.subscriptionType}
            })

        await this.ProductRepository.makeAPurchase(productInfo.priceId, quantity)

        // is subscriber
        if(subscription) {
            const { dateOfNextPayment, expireAt, paymentType} =
                SubscriptionEntity.renewSubscription(subscription, payload)

            await this.prisma.subscription.update({
                where: {userId},
                data: { dateOfNextPayment, expireAt, paymentType }
            })
        }
        // not subscriber
        if (!subscription) {
            await this.prisma.subscription.create({ data: newSubscription })
        }

        const payment = PaymentsEntity.create(payload, userId)

        await this.prisma.payments.create({ data: payment })

        return newSubscription
    }

    async updateAutoRenewalStatus(autoRenewal: boolean, userId: number) {
        await this.prisma.subscription.update({
            where: {userId},
            data: { autoRenewal }
        })
    }
}