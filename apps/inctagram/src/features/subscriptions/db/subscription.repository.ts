import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../../auth/managers/email.manager';
import { purchaseSubscriptionDto } from '../api/dto';
import { SubscriptionEntity } from '../domain/subscription.entity';
import { PaymentsEntity } from '../domain/payments.entity';
import { intervalToDuration } from 'date-fns';
import { ProductRepository } from '../../stripe/db/product.repository';
import { login } from "../../../../test/managers/login";

@Injectable()
export class SubscriptionRepository {
  constructor(
    private prisma: PrismaService,
    private EmailService: EmailService,
    private ProductRepository: ProductRepository,
  ) {}

  async getCurrentSubscribeInfo(userId: number) {
    const current = await this.prisma.currentSubscription.findUnique({
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

    if (!current) throw new HttpException('Not Found', 404);

    if (current.expireAt < new Date()) {
      await this.prisma.profile.update({
        where: { userId },
        data: {
          accountType: 'Personal',
        },
      });

      return await this.EmailService.sendSubscriptionHasExpiredEmail(
        current.profile.user.email,
      );
    }

    //@ts-ignore
    const differenceMS = new Date(current.expireAt) - new Date()

    const daysLeft = Math.floor(differenceMS / 86400000)

    const subscriptions =
      await this.prisma.subscription.findMany({
        where: {userId},
        orderBy: [{ dateOfNextPayment: 'asc'},
          {autoRenewal: 'asc',}]
      })

    if(!current.hasAutoRenewal) {
      return {
        subscriptions,
        expireAt: daysLeft
      };
    } else if(current.hasAutoRenewal) {
      return {
        subscriptions,
        expireAt: daysLeft,
        nextPayment: subscriptions[0].dateOfNextPayment,
      };
    }
  }

  async buySubscription(payload: purchaseSubscriptionDto,
                        userId: number) {

    // get stripeProductId and stripePriceId
    const productInfo =
      await this.ProductRepository.getProductInfo(payload.productPriceId)

    const checkout =
      await this.ProductRepository.makeAPurchase(payload, productInfo, userId,)

    return checkout;
  }

  async addSubscriptionToDB(payload, productInfo, userId) {
    const currentSubscription =
      await this.prisma.currentSubscription.findUnique({ where: {userId} })

    const newSubscription =
      SubscriptionEntity.create(payload, productInfo, userId,);

    const { dateOfNextPayment, expireAt } =
      SubscriptionEntity.renewSubscription(
        currentSubscription
          ? currentSubscription.dateOfNextPayment
          : newSubscription.dateOfNextPayment,
        productInfo.period);

    const changedDateOfNextPayment = dateOfNextPayment

    if(currentSubscription) {
      await this.prisma.currentSubscription.update({
        where: { userId },
        data: { dateOfNextPayment, expireAt },
      });
    } else if(!currentSubscription) {
      await this.prisma.currentSubscription.create({
        data: {userId, expireAt, dateOfNextPayment: changedDateOfNextPayment}
      })
    }

    await this.prisma.subscription.create({ data: newSubscription });

    const payment =
      PaymentsEntity.create(payload, productInfo,
        newSubscription.dateOfNextPayment, userId);

    await this.prisma.payments.create({ data: payment });
  }

  async updateAutoRenewalStatus(autoRenewal: boolean, subscriptionId: number, userId: number) {
    const subscription =
      await this.prisma.subscription.findUnique({
        where: {subscriptionId, userId},
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

    if(!subscription) return

    await this.ProductRepository
      .updateAutoRenewalStatus(subscription, autoRenewal, userId);
  }
}
