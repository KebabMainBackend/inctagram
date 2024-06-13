import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma.service';
import { SubscriptionRepository } from '../../db/subscription.repository';
import { GetDefaultUriDtoWithPageNumber } from '../../../../inctagram/src/utils/default-get-query.uri.dto';

export class GetUsersPaymentsCommand {
  constructor(
    public userIds: number[],
    public query: GetDefaultUriDtoWithPageNumber,
    public isAutoUpdate: boolean,
  ) {}
}

@CommandHandler(GetUsersPaymentsCommand)
export class GetUsersPaymentsHandler
  implements ICommandHandler<GetUsersPaymentsCommand>
{
  constructor(
    public prisma: PrismaService,
    public subscriptionRepo: SubscriptionRepository,
  ) {}

  async execute(command: GetUsersPaymentsCommand) {
    const { userIds, query, isAutoUpdate } = command;
    return this.subscriptionRepo.getUsersPayments(query, userIds, isAutoUpdate);
  }
}
