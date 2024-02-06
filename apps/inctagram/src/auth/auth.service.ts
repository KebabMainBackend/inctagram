import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UsersQueryRepository } from './db/users.query-repository';
import { createErrorMessage } from '../utils/create-error-object';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './commands/register-user.command';
import { UsersRepository } from './db/users.repository';
// import { ResultNotification } from '../modules/notification';

@Injectable()
export class AuthService {
  constructor(
    private commandBus: CommandBus,
    private userQueryRepo: UsersQueryRepository,
    private userRepo: UsersRepository,
  ) {}
  async register({ username, password, email }: AuthRegisterDto) {
    const userByEmail = await this.userQueryRepo.getUserByEmail(email);
    const userByUsername = await this.userQueryRepo.getUserByUsername(username);
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
  async deleteMe() {
    await this.userRepo.deleteUserByEmail('zhumamedin@gmail.com');
  }
}
