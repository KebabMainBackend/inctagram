import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityDevicesRepository } from '../db/security-devices.repository';

export class DeleteDeviceCommand {
  constructor(public deviceId: string) {}
}

@CommandHandler(DeleteDeviceCommand)
export class DeleteDeviceHandler
  implements ICommandHandler<DeleteDeviceCommand>
{
  constructor(private securityDevicesRepository: SecurityDevicesRepository) {}

  async execute({ deviceId }: DeleteDeviceCommand) {
    return await this.securityDevicesRepository.deleteDeviceById(deviceId);
  }
}
