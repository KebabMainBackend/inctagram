import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserHashingManager } from '../../managers/user-hashing.manager';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import {
  UserConfirmationEntity,
  UserEntity,
} from '../../domain/entities/user.entity';
import { UsersRepository } from '../../db/users.repository';
import { createErrorMessage } from '../../../utils/create-error-object';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LanguageEnums } from '../../../types';
import { ConfigService } from '@nestjs/config';

type RegisterUserTypes = {
  username: string;
  password: string;
  email: string;
  language: LanguageEnums;
};

export class RegisterUserCommand {
  constructor(public data: RegisterUserTypes) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private userHashingManager: UserHashingManager,
    private prisma: PrismaService,
    private emailService: EmailService,
    private userRepo: UsersRepository,
    private configService: ConfigService,
  ) {}
  async execute({ data }: RegisterUserCommand) {
    const userByEmail = await this.userRepo.getUserByEmail(data.email);
    const userByUsername = await this.userRepo.getUserByUsername(data.username);
    if (userByEmail) {
      const error = createErrorMessage('email already exists', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (userByUsername) {
      const error = createErrorMessage('username already exists', 'username');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.createUser(data);
  }
  async createUser({ username, password, email, language }: RegisterUserTypes) {
    const { passwordHash, passwordSalt } =
      await this.userHashingManager.getHashAndSalt(password);
    const newUser = UserEntity.create({
      email,
      username,
      isConfirmed: false,
    });
    newUser.passwordSalt = passwordSalt;
    newUser.passwordHash = passwordHash;
    this.prisma.$transaction(
      async () => {
        const user = await this.userRepo.createUser(newUser);
        const userConfirmation = UserConfirmationEntity.create(user.id);
        await this.userRepo.createUserConfirmationData(userConfirmation);
        await this.checkLast5Users(user.id);
        await this.emailService.sendConfirmationCodeEmail(
          email,
          userConfirmation.confirmationCode,
          'Confirmation code',
          language,
        );
      },
      { timeout: 7000 },
    );
    return { email: email.toLowerCase() };
  }
  private async checkLast5Users(userId: number) {
    const secret = this.configService.get('FRONT_VALIDATE_SECRET');
    const frontUrl = this.configService.get('FRONT_PROD');

    if (userId % 5 === 0) {
      await fetch(`${frontUrl}/api/revalidate?secret=${secret}`);
    }
  }
}
