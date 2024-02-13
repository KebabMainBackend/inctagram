import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma.service';
import { EmailService } from '../managers/email.manager';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../db/users.repository';

export class CreateUserViaOauthProviderCommand {
  constructor(
    public providerId: string,
    public email: string | null,
    public providerType: string,
  ) {}
}

@CommandHandler(CreateUserViaOauthProviderCommand)
export class CreateUserViaOauthProviderHandler
  implements ICommandHandler<CreateUserViaOauthProviderCommand>
{
  constructor(
    private prisma: PrismaService,
    private userRepo: UsersRepository,
    private emailService: EmailService,
  ) {}
  async execute({ providerId, email }: CreateUserViaOauthProviderCommand) {
    const newUser = UserEntity.create({
      email,
      username: 'client' + providerId,
      isConfirmed: true,
    });
    return this.prisma.$transaction(
      async () => {
        const user = await this.userRepo.createUser(newUser);

        await this.emailService.sendNotificationEmail(email);
        return user.id;
      },
      {
        timeout: 6000,
      },
    );
  }
}
