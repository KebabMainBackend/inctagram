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

const CommandHandlers = [RegisterUserHandler];

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController, GithubController, GoogleController],
  providers: [
    AuthService,
    UsersRepository,
    UsersQueryRepository,
    PrismaService,
    UserHashingManager,
    EmailService,
    ...CommandHandlers,
  ],
})
export class AuthModule {}
