import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UsersQueryRepository } from './db/users.query-repository';
import { createErrorMessage } from '../utils/create-error-object';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './commands/register-user.command';
import { UsersRepository } from './db/users.repository';
import { UserHashingManager } from './managers/user-hashing.manager';
import { PasswordRecoveryCommand } from './commands/password-recovery.command';
import { ResendConfirmationCodeCommand } from './commands/resend-confirmation-code.command';
import { CreateUserViaOauthProviderCommand } from './commands/create-user-via-oauth-provider.command';
import { OauthProviderEntity } from './entities/oauth-provider.entity';

@Injectable()
export class AuthService {
  constructor(
    private commandBus: CommandBus,
    private usersQueryRepo: UsersQueryRepository,
    private usersRepo: UsersRepository,
    private userHashingManager: UserHashingManager,
  ) {}
  async register({ username, password, email }: AuthRegisterDto) {
    const userByEmail = await this.usersQueryRepo.getUserByEmail(email);
    const userByUsername = await this.usersQueryRepo.getUserByUsername(
      username,
    );
    if (userByEmail) {
      const error = createErrorMessage('email already exists', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (userByUsername) {
      const error = createErrorMessage('username already exists', 'username');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.commandBus.execute(
      new RegisterUserCommand(username, password, email),
    );
  }
  async checkCredentials(email: string, password: string) {
    const user = await this.usersQueryRepo.getUserByEmail(email);
    if (user) {
      const passwordHash = await this.userHashingManager.generateHash(
        password,
        user.passwordSalt,
      );
      if (!user.isConfirmed) {
        throw new HttpException(
          'email is not confirmed',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (user.passwordHash === passwordHash) {
        return user.id;
      }
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
  async verifyConfirmationCode(code: string) {
    const user = await this.usersQueryRepo.getUserByCode(code);
    if (!user) {
      const error = createErrorMessage('invalid code', 'code');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (user.confirmationData.codeExpirationDate < new Date()) {
      const error = createErrorMessage('code expired', 'code');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (user.isConfirmed) {
      const error = createErrorMessage('code already confirmed', 'code');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    await this.usersRepo.deleteUserConfirmationData(user.confirmationData.id);
    await this.usersRepo.updateUsersConfirmationStatus(user.id);
  }
  async sendCodeToRecoverPassword(email: string, recaptcha: string) {
    const secretKey = process.env['RECAPTCHA_SECRET'];
    const verifyCaptchaBodyString = `secret=${secretKey}&response=${recaptcha}`;
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: verifyCaptchaBodyString,
    });
    const requestStatus = await res.json();
    if (requestStatus.status) {
      return this.commandBus.execute(new PasswordRecoveryCommand(email));
    }
    const error = createErrorMessage('incorrect recaptcha', 'recaptcha');
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
  async resendConfirmationCode(email: string) {
    await this.commandBus.execute(new ResendConfirmationCodeCommand(email));
  }
  async loginViaProvider(
    email: string | null,
    providerId: string,
    providerType: string,
  ) {
    let userId: number;
    const providerClient = await this.usersQueryRepo.getUserProviderByIdAndType(
      providerId,
      providerType,
    );
    if (providerClient) {
      console.log(providerClient, 'found provider');
      return providerClient.userId;
    }
    const userByEmail = await this.usersQueryRepo.getUserByEmail(email);
    if (!userByEmail) {
      userId = await this.commandBus.execute(
        new CreateUserViaOauthProviderCommand(providerId, email, providerType),
      );
    } else {
      userId = userByEmail.id;
    }
    const provider = OauthProviderEntity.create({
      email,
      providerType,
      providerId,
      userId: userId,
    });
    console.log(provider);
    const p = await this.usersRepo.createOauthProvider(provider);
    console.log(p, 'created provider');
    return userId;
  }
  async deleteMe() {
    const me = await this.usersQueryRepo.getUserByEmail('default@gmail.com');
    if (me) {
      await this.usersRepo.deleteUserByEmail('default@gmail.com');
    }
  }
}
