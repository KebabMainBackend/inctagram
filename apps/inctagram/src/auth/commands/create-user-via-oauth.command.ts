import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserHashingManager } from '../managers/user-hashing.manager';
import { CreateUserTypes } from '../types/create-user.types';
import { PrismaService } from '../../prisma.service';
import { EmailService } from '../managers/email.manager';

export class CreateUserViaOauthCommand {
  constructor(
    public username: string,
    public password: string,
    public email: string,
  ) {}
}

@CommandHandler(CreateUserViaOauthCommand)
export class RegisterUserHandler
  implements ICommandHandler<CreateUserViaOauthCommand>
{
  constructor(
    private userHashingManager: UserHashingManager,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}
  async execute({ username, password, email }: CreateUserViaOauthCommand) {
    const { passwordHash, passwordSalt } =
      await this.userHashingManager.getHashAndSalt(password);
    const code = uuidv4();
    const newUserBody: CreateUserTypes = {
      username,
      passwordHash,
      passwordSalt,
      email,
      confirmationCode: code,
      codeExpirationDate: add(new Date(), {
        minutes: 3,
      }),
    };
    return this.prisma.$transaction(
      async (tx) => {
        await tx.user.create({
          data: newUserBody,
        });
        await this.emailService.sendConfirmationCodeEmail(
          email,
          code,
          'Confirmation code',
        );

        return true;
      },
      {
        timeout: 6000,
      },
    );
  }
}
