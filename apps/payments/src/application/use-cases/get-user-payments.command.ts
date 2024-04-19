import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "../../prisma.service";
import { EmailService } from "../../../../inctagram/src/auth/managers/email.manager";
import { SubscriptionRepository } from "../../db/subscription.repository";

export class GetUserPaymentsCommand {
  constructor(public userId: number) {}
}

@CommandHandler(GetUserPaymentsCommand)
export class GetUserPaymentsHandler
  implements ICommandHandler<GetUserPaymentsCommand> {
  constructor(
    public prisma: PrismaService,
    public subscriptionRepo: SubscriptionRepository,
  ) {}

  async execute(command: GetUserPaymentsCommand) {
    const { userId } = command

    const payments =
      await this.subscriptionRepo.getPayments(userId)

    return payments.map(p => {
      return {
        id: p.paymentId,
        userId: p.userId,
        dateOfPayments: p.dateOfPayment,
        endDateOfSubscription: p.endDateOfSubscription,
        price: p.price,
        subscriptionType: p.interval,
        paymentType: p.paymentSystem
      }
    })
  }
}