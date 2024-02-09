import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './db/users.repository';
import { UsersQueryRepository } from './db/users.query-repository';
import { PrismaService } from '../prisma.service';
import { RegisterUserHandler } from './commands/register-user.command';
import { UserHashingManager } from './managers/user-hashing.manager';
import { EmailService } from './managers/email.manager';
import { JwtModule } from '@nestjs/jwt';
import { GithubController } from './github.controller';
import { GoogleController } from './google.controller';
import { CreateAccessTokenHandler } from './commands/create-access-token.command';
import { CreateRefreshTokenHandler } from './commands/create-refresh-token.command';
import { DecodeRefreshTokenHandler } from './commands/decode-refresh-token.command';
import { UpdateRefreshTokenHandler } from './commands/update-refresh-token.command';
import { SecurityDevicesRepository } from '../features/security-devices/db/security-devices.repository';
import { SecurityDevicesQueryRepository } from '../features/security-devices/db/security-devices.query-repository';
import { AddRefreshToBlacklistHandler } from './commands/add-refresh-to-blacklist';
import { DeleteDeviceHandler } from '../features/security-devices/commands/delete-device.command';
import { PasswordRecoveryHandler } from './commands/password-recovery.command';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

const CommandHandlers = [
  RegisterUserHandler,
  CreateAccessTokenHandler,
  CreateRefreshTokenHandler,
  DecodeRefreshTokenHandler,
  UpdateRefreshTokenHandler,
  AddRefreshToBlacklistHandler,
  DeleteDeviceHandler,
  PasswordRecoveryHandler,
];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
      }),
    }),
  ],
  controllers: [AuthController, GithubController, GoogleController],
  providers: [
    GoogleStrategy,
    AuthService,
    UsersRepository,
    UsersQueryRepository,
    PrismaService,
    UserHashingManager,
    EmailService,
    SecurityDevicesRepository,
    SecurityDevicesQueryRepository,
    ...CommandHandlers,
  ],
})
export class AuthModule {}
