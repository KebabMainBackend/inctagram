import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityDevicesRepository } from '../../db/security-devices.repository';

export class DeleteDeviceCommand {
  constructor(public sessionId: string) {}
}

@CommandHandler(DeleteDeviceCommand)
export class DeleteDeviceHandler
  implements ICommandHandler<DeleteDeviceCommand>
{
  constructor(private securityDevicesRepository: SecurityDevicesRepository) {}

  async execute({ sessionId }: DeleteDeviceCommand) {
    const session = await this.securityDevicesRepository.getSession(sessionId);
    await this.securityDevicesRepository.deleteSessionById(sessionId);
    await this.securityDevicesRepository.deleteDevice(session.devicesId);
  }
}
