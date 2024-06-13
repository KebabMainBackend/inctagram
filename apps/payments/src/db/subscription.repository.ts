import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubscriptionEntity } from './domain/subscription.entity';
import { PaymentsEntity } from './domain/payments.entity';
import { GetDefaultUriDtoWithPageNumber } from '../../../inctagram/src/utils/default-get-query.uri.dto';
import {
  getRequestQueryMapperWithPageNumber,
  getRequestReturnMapperWithPageNumber,
} from '../../../inctagram/src/utils/helpers/get-request-mapper-helper-with.cursor';
import { login } from '../../../inctagram/test/managers/login';

const availableSortByOptions = ['price', 'paymentSystem', 'dateOfPayment'];

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
    });
  }

  async getSubscriptions(userId: number) {
    const autoRenewalSubscription = await this.prisma.subscription.findMany({
      where: { userId, autoRenewal: true },
    });

    const isSubscriptionNotExpired = autoRenewalSubscription.length
      ? autoRenewalSubscription[0].dateOfNextPayment < new Date()
      : null;

    if (!autoRenewalSubscription.length || isSubscriptionNotExpired) {
      return this.prisma.subscription.findMany({
        where: { userId },
        orderBy: {
          dateOfSubscribe: 'desc',
        },
      });
    } else return autoRenewalSubscription;
  }

  async getUserPayments(query: GetDefaultUriDtoWithPageNumber, userId: number) {
    const { pageSize, pageNumber } = getRequestQueryMapperWithPageNumber(query);
    const totalCount = await this.prisma.payments.count({
      where: { userId },
    });
    const payments = await this.prisma.payments.findMany({
      where: { userId },
      orderBy: { dateOfPayment: 'asc' },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });
    return getRequestReturnMapperWithPageNumber({
      pageNumber,
      pageSize,
      totalCount,
      items: payments.map((p) => this.mapPayments(p)),
    });
  }
  async getUsersPayments(
    query: GetDefaultUriDtoWithPageNumber,
    userIds: number[],
    isAutoUpdate: boolean,
  ) {
    const { pageSize, pageNumber, sortDirection, sortBy } =
      getRequestQueryMapperWithPageNumber(query);
    let sortByOption = sortBy;
    const filter: any = {
      Subscription: {
        autoRenewal: isAutoUpdate,
      },
    };
    if (userIds.length) {
      filter.userId = {
        in: userIds,
      };
    }
    const totalCount = await this.prisma.payments.count({
      where: filter,
    });
    if (!availableSortByOptions.includes(query.sortBy)) {
      sortByOption = 'dateOfPayment';
    }
    const payments = await this.prisma.payments.findMany({
      where: filter,
      orderBy: { [sortByOption]: sortDirection },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });
    return getRequestReturnMapperWithPageNumber({
      pageNumber,
      pageSize,
      totalCount,
      items: payments.map((p) => this.mapPayments(p)),
    });
  }
  async updateStripeCustomerId(userId: number, customerId: string) {
    await this.prisma.currentSubscription.update({
      where: { userId },
      data: { stripeCustomerId: customerId },
    });
  }

  async addSubscriptionToDB(newSubscription: SubscriptionEntity) {
    return this.prisma.subscription.create({ data: newSubscription });
  }

  async addPaymentToDB(payment: PaymentsEntity) {
    await this.prisma.payments.create({ data: payment });
  }

  // async updatePayment(endDateOfSubscription, paypalSubscriptionId) {
  //   await this.prisma.payments.updateMany({
  //     where: { endDateOfSubscription },
  //     data: { paypalSubscriptionId },
  //   });
  // }

  async updateCurrentSubscription({
    userId,
    currentSubscription,
    dateOfNextPayment,
    expireAt,
  }) {
    if (!currentSubscription) {
      const newExpireAt = SubscriptionEntity.getNewExpireAt(
        new Date(),
        dateOfNextPayment,
      );

      return this.prisma.currentSubscription.create({
        data: { userId, expireAt: newExpireAt, dateOfNextPayment },
      });
    } else if (currentSubscription) {
      const autoRenewalSubscriptions = await this.prisma.subscription.findMany({
        where: { userId, autoRenewal: true },
        orderBy: [
          {
            dateOfNextPayment: 'asc',
          },
        ],
      });

      if (autoRenewalSubscriptions.length) {
        await this.prisma.currentSubscription.update({
          where: { userId },
          data: {
            dateOfNextPayment: autoRenewalSubscriptions[0].dateOfNextPayment,
            expireAt,
          },
        });
      } else if (!autoRenewalSubscriptions.length) {
        await this.prisma.currentSubscription.update({
          where: { userId },
          data: { dateOfNextPayment, expireAt },
        });
      }
    }
  }

  async updateCurrentSubscriptionHasAutoRenewalStatus(userId, autoRenewal) {
    await this.prisma.currentSubscription.update({
      where: { userId },
      data: { hasAutoRenewal: autoRenewal },
    });
  }

  async updateSubscriptionInfo(
    subscriptionId,
    stripeSubscriptionId,
    paypalSubscriptionId,
    autoRenewal,
  ) {
    await this.prisma.subscription.update({
      where: { subscriptionId },
      data: { stripeSubscriptionId, paypalSubscriptionId, autoRenewal },
    });
  }
  mapPayments(p: any) {
    return {
      id: p.paymentId,
      userId: p.userId,
      dateOfPayments: p.dateOfPayment,
      endDateOfSubscription: p.endDateOfSubscription,
      price: p.price,
      subscriptionType: p.interval,
      paymentType: p.paymentSystem,
    };
  }
}
