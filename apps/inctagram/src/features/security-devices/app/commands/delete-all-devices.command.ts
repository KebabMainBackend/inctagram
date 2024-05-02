import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityDevicesRepository } from '../../db/security-devices.repository';

export class DeleteAllDevicesCommand {
  constructor(
    public userId: number,
    public sessionId: string,
  ) {}
}

@CommandHandler(DeleteAllDevicesCommand)
export class DeleteAllDevicesHandler
  implements ICommandHandler<DeleteAllDevicesCommand>
{
  constructor(private securityDevicesRepository: SecurityDevicesRepository) {}

  async execute({ userId, sessionId }: DeleteAllDevicesCommand) {
    return await this.securityDevicesRepository.deleteAllDevicesOfUserExceptCurrent(
      userId,
      sessionId,
    );
  }
}
