import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma.service';
import { SubscriptionRepository } from '../../db/subscription.repository';
import { GetDefaultUriDtoWithPageNumber } from '../../../../inctagram/src/utils/default-get-query.uri.dto';

export class GetUserPaymentsCommand {
  constructor(
    public userId: number,
    public query: GetDefaultUriDtoWithPageNumber,
  ) {}
}

@CommandHandler(GetUserPaymentsCommand)
export class GetUserPaymentsHandler
  implements ICommandHandler<GetUserPaymentsCommand>
{
  constructor(
    public prisma: PrismaService,
    public subscriptionRepo: SubscriptionRepository,
  ) {}

  async execute(command: GetUserPaymentsCommand) {
    const { userId, query } = command;
    return this.subscriptionRepo.getUserPayments(query, userId);
  }
}
