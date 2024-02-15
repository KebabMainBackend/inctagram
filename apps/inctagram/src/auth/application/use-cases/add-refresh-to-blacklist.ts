import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityDevicesRepository } from '../../../features/security-devices/db/security-devices.repository';

export class AddRefreshToBlacklistCommand {
  constructor(public refreshToken: string) {}
}

@CommandHandler(AddRefreshToBlacklistCommand)
export class AddRefreshToBlacklistHandler
  implements ICommandHandler<AddRefreshToBlacklistCommand>
{
  constructor(private securityDevicesRepository: SecurityDevicesRepository) {}

  async execute({ refreshToken }: AddRefreshToBlacklistCommand) {
    await this.securityDevicesRepository.addTokenToBlacklist(refreshToken);
  }
}
