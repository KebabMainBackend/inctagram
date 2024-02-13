import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityDevicesRepository } from '../db/security-devices.repository';

export class DeleteDeviceCommand {
  constructor(public sessionId: number) {}
}

@CommandHandler(DeleteDeviceCommand)
export class DeleteDeviceHandler
  implements ICommandHandler<DeleteDeviceCommand>
{
  constructor(private securityDevicesRepository: SecurityDevicesRepository) {}

  async execute({ sessionId }: DeleteDeviceCommand) {
    this.securityDevicesRepository.deleteSessionById(sessionId);
  }
}
