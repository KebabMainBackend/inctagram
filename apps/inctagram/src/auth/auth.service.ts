import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UsersQueryRepository } from './db/users.query-repository';
import { createErrorMessage } from '../utils/create-error-object';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './commands/register-user.command';
import { UsersRepository } from './db/users.repository';
import { UserHashingManager } from './managers/user-hashing.manager';
// import { ResultNotification } from '../modules/notification';

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
    // const notification = new ResultNotification();
    if (userByEmail) {
      const error = createErrorMessage('email already exists', 'email');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
      // notification.addError('email already exists', 'email');
    }
    if (userByUsername) {
      const error = createErrorMessage('username already exists', 'username');
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
      // notification.addError('username already exists', 'username');
    }
    // if (notification.hasError()) {
    //   throw new HttpException(notification.extensions, HttpStatus.BAD_REQUEST);
    // }
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
    if (user) {
      if (user.codeExpirationDate < new Date()) {
        const error = createErrorMessage('code expired', 'code');
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      if (user.isConfirmed) {
        const error = createErrorMessage('code already confirmed', 'code');
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      await this.usersRepo.updateUsersConfirmationStatus(user.id);
    }
    return null;
  }
  async deleteMe() {
    const me = await this.usersQueryRepo.getUserByEmail('zhumamedin@gmail.com');
    if (me) {
      await this.usersRepo.deleteUserByEmail('zhumamedin@gmail.com');
    }
  }
}
