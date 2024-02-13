import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserHashingManager } from '../managers/user-hashing.manager';
import { PrismaService } from '../../prisma.service';
import { EmailService } from '../managers/email.manager';
import { UserConfirmationEntity, UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../db/users.repository';

export class RegisterUserCommand {
  constructor(
    public username: string,
    public password: string,
    public email: string,
  ) {}
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
  ) {}
  async execute({ username, password, email }: RegisterUserCommand) {
    const { passwordHash, passwordSalt } =
      await this.userHashingManager.getHashAndSalt(password);
    const newUser = UserEntity.create({
      email,
      username,
      isConfirmed: false,
    });
    newUser.passwordSalt = passwordSalt;
    newUser.passwordHash = passwordHash;
    return this.prisma.$transaction(
      async () => {
        // await tx.user.create({
        //   data: newUser,
        // });
        const user = await this.userRepo.createUser(newUser);
        const userConfirmation = UserConfirmationEntity.create(user.id);
        await this.userRepo.createUserConfirmationData(userConfirmation);
        await this.emailService.sendConfirmationCodeEmail(
          email,
          userConfirmation.confirmationCode,
          'Confirmation code',
        );

        return true;
      },
      {
        timeout: 7000,
      },
    );
  }
}
