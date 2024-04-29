import { Module } from '@nestjs/common';
import { SecurityDevicesController } from './api/security-devices.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteDeviceHandler } from './app/commands/delete-device.command';
import { DeleteAllDevicesHandler } from './app/commands/delete-all-devices.command';
import { SecurityDevicesRepository } from './db/security-devices.repository';
import { SecurityDevicesQueryRepository } from './db/security-devices.query-repository';
import { PrismaService } from '../../prisma.service';
import { DecodeRefreshTokenHandler } from '../../auth/application/use-cases/decode-refresh-token.command';
import { JwtService } from '@nestjs/jwt';

const CommandHandlers = [
  DeleteDeviceHandler,
  DeleteAllDevicesHandler,
  DecodeRefreshTokenHandler,
];

const Repos = [SecurityDevicesRepository, SecurityDevicesQueryRepository];
@Module({
  imports: [CqrsModule],
  controllers: [SecurityDevicesController],

  providers: [...CommandHandlers, ...Repos, PrismaService, JwtService],
})
export class SecurityDevicesModule {}
