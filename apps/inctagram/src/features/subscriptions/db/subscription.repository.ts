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
    private ProductRepository: ProductRepository,
  ) {}

  async buySubscription(payload: purchaseSubscriptionDto,
                        userId: number) {

    // get stripeProductId and stripePriceId
    const productInfo =
      await this.ProductRepository.getProductInfo(payload.productPriceId)

    const currentSubscription =
      await this.prisma.currentSubscription.findUnique({ where: {userId} })

    const newSubscription =
      SubscriptionEntity.create(payload, productInfo, userId,);

    const renewSubscriptionData =
      SubscriptionEntity.renewSubscription(
        currentSubscription
          ? currentSubscription.dateOfNextPayment
          : newSubscription.dateOfNextPayment,
        productInfo.period);

    const checkout =
      await this.ProductRepository
        .makeAPurchase(productInfo.productPriceId,
          userId, currentSubscription,
          renewSubscriptionData, newSubscription)

    return checkout;
  }

  async addSubscriptionToDB(userId,
                            currentSubscription, dateOfNextPayment,
                            expireAt, newSubscription) {

    if(currentSubscription) {
      await this.prisma.currentSubscription.update({
        where: { userId },
        data: { dateOfNextPayment, expireAt },
      });
    } else if(!currentSubscription) {
      await this.prisma.currentSubscription.create({
        data: {userId, expireAt, dateOfNextPayment}
      })
    }

    await this.prisma.subscription.create({ data: newSubscription });
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
