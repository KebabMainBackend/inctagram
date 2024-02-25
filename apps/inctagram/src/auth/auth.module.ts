import { Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './db/users.repository';
import { UsersQueryRepository } from './db/users.query-repository';
import { PrismaService } from '../prisma.service';
import { RegisterUserHandler } from './application/use-cases/register-user.command';
import { UserHashingManager } from './managers/user-hashing.manager';
import { EmailService } from './managers/email.manager';
import { JwtModule } from '@nestjs/jwt';
import { GithubController } from './api/github.controller';
import { GoogleController } from './api/google.controller';
import { CreateAccessTokenHandler } from './application/use-cases/create-access-token.command';
import { CreateRefreshTokenHandler } from './application/use-cases/create-refresh-token.command';
import { DecodeRefreshTokenHandler } from './application/use-cases/decode-refresh-token.command';
import { UpdateRefreshTokenHandler } from './application/use-cases/update-refresh-token.command';
import { SecurityDevicesRepository } from '../features/security-devices/db/security-devices.repository';
import { SecurityDevicesQueryRepository } from '../features/security-devices/db/security-devices.query-repository';
import { AddRefreshToBlacklistHandler } from './application/use-cases/add-refresh-to-blacklist';
import { DeleteDeviceHandler } from '../features/security-devices/commands/delete-device.command';
import { PasswordRecoveryHandler } from './application/use-cases/password-recovery.command';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './strategies/github.strategy';
import { ResendConfirmationCodeHandler } from './application/use-cases/resend-confirmation-code.command';
import { ChangeUserPasswordHandler } from './application/use-cases/change-user-password';
import { SignInUserViaOauthProviderHandler } from './application/use-cases/create-user-via-oauth-provider.command';
import { CheckCredentialsHandler } from './application/use-cases/check-credentials.command';
import { VerifyConfirmationCodeHandler } from './application/use-cases/verify-confirmation-code.command';
import { TestDeleteUserHandler } from './test/delete-user.command';
import { SignInUserViaOauthProviderHandler1 } from './application/use-cases/create-user-via-oauth-provider1.command';

const CommandHandlers = [
  RegisterUserHandler,
  CreateAccessTokenHandler,
  CreateRefreshTokenHandler,
  DecodeRefreshTokenHandler,
  UpdateRefreshTokenHandler,
  AddRefreshToBlacklistHandler,
  DeleteDeviceHandler,
  PasswordRecoveryHandler,
  ResendConfirmationCodeHandler,
  ChangeUserPasswordHandler,
  SignInUserViaOauthProviderHandler,
  CheckCredentialsHandler,
  VerifyConfirmationCodeHandler,
  SignInUserViaOauthProviderHandler1,
];

const TestHandlers = [TestDeleteUserHandler];

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
    GithubStrategy,
    UsersRepository,
    UsersQueryRepository,
    PrismaService,
    UserHashingManager,
    EmailService,
    SecurityDevicesRepository,
    SecurityDevicesQueryRepository,
    ...CommandHandlers,
    ...TestHandlers,
  ],
})
export class AuthModule {}
