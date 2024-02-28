import { Module } from '@nestjs/common';
import { SecurityDevicesService } from './security-devices.service';
import { SecurityDevicesController } from './security-devices.controller';

@Module({
  controllers: [SecurityDevicesController],
  providers: [SecurityDevicesService],
})
export class SecurityDevicesModule {}
