import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { SubscriptionEntity } from "./domain/subscription.entity";
import { PaymentsEntity } from "./domain/payments.entity";

@Injectable()
export class SubscriptionRepository {
  constructor(private prisma: PrismaService) {}

  async getCurrentSubscription(userId: number) {
    return this.prisma.currentSubscription.findUnique({
      where: { userId },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async getSubscriptionByID(subscriptionId: number) {
    return this.prisma.subscription.findUnique({
      where: { subscriptionId },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async getSubscriptionByPaypalSubId(paypalSubscriptionId) {
    return this.prisma.subscription.findFirst({
      where: { paypalSubscriptionId },
    })
  }

  async getSubscriptions(userId: number) {
    const autoRenewalSubscription =
      await this.prisma.subscription.findMany({
      where: { userId, autoRenewal: true },
    })

    if(!autoRenewalSubscription.length)
      return await this.prisma.subscription.findMany({
        where: { userId },
        orderBy: {
          dateOfSubscribe: 'asc'
        }
      })
     else return autoRenewalSubscription
  }

  async getPayments(userId: number, limit, offset) {
    return await this.prisma.payments.findMany({
      where: { userId },
      orderBy: {dateOfPayment: "asc"},
      take: limit,
      skip: offset
    });
  }
  async updateStripeCustomerId(userId: number, customerId: string) {
    await this.prisma.currentSubscription.update({
      where: { userId },
      data: { stripeCustomerId: customerId },
    });
  }

  async addSubscriptionToDB(newSubscription: SubscriptionEntity) {
    await this.prisma.subscription.create({ data: newSubscription });
  }

  async addPaymentToDB(payment: PaymentsEntity) {
    await this.prisma.payments.create({data: payment});
  }

  async updatePayment(endDateOfSubscription, paypalSubscriptionId) {
    await this.prisma.payments.updateMany({
      where: {endDateOfSubscription},
      data: { paypalSubscriptionId}
    })
  }

  async updateCurrentSubscription({
                                    userId,
                                    currentSubscription,
                                    dateOfNextPayment,
                                    expireAt
                                  }) {
    if(!currentSubscription){
      const newExpireAt =
        SubscriptionEntity.getNewExpireAt(new Date(), dateOfNextPayment)

      return await this.prisma.currentSubscription.create({
        data: { userId, expireAt: newExpireAt, dateOfNextPayment },
      })

    } else if(currentSubscription) {
      const autoRenewalSubscriptions =
        await this.prisma.subscription.findMany({
        where: {userId, autoRenewal: true},
        orderBy: [{
          dateOfNextPayment: 'asc'
        }]
      })

      if(autoRenewalSubscriptions.length) {
        await this.prisma.currentSubscription.update({
          where: { userId },
          data: { dateOfNextPayment: autoRenewalSubscriptions[0].dateOfNextPayment, expireAt },
        })
      } else if(!autoRenewalSubscriptions.length) {
        await this.prisma.currentSubscription.update({
          where: { userId },
          data: { dateOfNextPayment, expireAt },
        })
      }
    }
  }

  async updateCurrentSubscriptionHasAutoRenewalStatus(userId, autoRenewal) {
    const autoRenewalOnSubscriptions =
      await this.prisma.subscription.findMany({
      where: { userId, autoRenewal: true },
      orderBy: [{ dateOfNextPayment: 'asc' }],
    });

    if (autoRenewalOnSubscriptions.length) {
      await this.prisma.currentSubscription.update({
        where: { userId },
        data: { hasAutoRenewal: autoRenewal },
      })
    }
  }
}
