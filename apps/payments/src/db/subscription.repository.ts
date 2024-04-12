import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { SubscriptionEntity } from "./domain/subscription.entity";

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

  async getCurrentSubscriptionByEmail(email: string) {
    const user =
      await this.prisma.user.findUnique({
        where: {email}
      })

    if(!user) throw new BadRequestException({
      message: 'no user getCurrentSubscriptionByEmail',
      field: 'userId'
    })

    return await this.getCurrentSubscription(user.id)
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

  async getSubscriptions(userId: number) {
    return this.prisma.subscription.findMany({
      where: { userId },
      orderBy: [{ dateOfNextPayment: 'asc' }, { autoRenewal: 'asc' }],
    });
  }
  async updateStripeCustomerId(userId: number, customerId: string) {
    await this.prisma.currentSubscription.update({
      where: { userId },
      data: { stripeCustomerId: customerId },
    });
  }

  async updatePaypalCustomerId(userId: number, customerId: string) {
    await this.prisma.currentSubscription.update({
      where: { userId },
      data: { paypalCustomerId: customerId },
    });
  }

  async addSubscriptionToDB(newSubscription: SubscriptionEntity) {
    await this.prisma.subscription.create({ data: newSubscription });
  }

  async updateCurrentSubscription({
                                    userId,
                                    currentSubscription,
                                    dateOfNextPayment,
                                    expireAt
                                  }) {
    if (currentSubscription) {
      await this.prisma.currentSubscription.update({
        where: { userId },
        data: { dateOfNextPayment, expireAt },
      });
    } else {
      await this.prisma.currentSubscription.create({
        data: { userId, expireAt, dateOfNextPayment },
      });
    }
  }
}
