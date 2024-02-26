import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import { UserEntity } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../db/users.repository';
import {
  OauthProviderEntity,
  ProviderType,
} from '../../domain/entities/oauth-provider.entity';

export class SignInUserViaOauthProviderCommand {
  constructor(
    public email: string | null,
    public providerId: string,
    public providerType: ProviderType,
  ) {}
}

@CommandHandler(SignInUserViaOauthProviderCommand)
export class SignInUserViaOauthProviderHandler
  implements ICommandHandler<SignInUserViaOauthProviderCommand>
{
  constructor(
    private prisma: PrismaService,
    private usersRepo: UsersRepository,
    private emailService: EmailService,
  ) {}
  async execute(data: SignInUserViaOauthProviderCommand) {
    const { providerId, providerType, email } = data;
    let userId: number;
    const providerClient = await this.usersRepo.getUserProviderByIdAndType(
      providerId,
      providerType,
    );
    if (providerClient) {
      return providerClient.userId;
    }
    const userByEmail = await this.usersRepo.getUserByEmail(email);
    if (!userByEmail) {
      userId = await this.createUser(data);
    } else {
      userId = userByEmail.id;
    }
    const provider = OauthProviderEntity.create({
      email,
      providerType,
      providerId,
      userId: userId,
    });
    await this.usersRepo.createOauthProvider(provider);
    return userId;
  }
  private async createUser({
    email,
    providerId,
  }: SignInUserViaOauthProviderCommand) {
    const newUser = UserEntity.create({
      email,
      username: 'client' + providerId,
      isConfirmed: true,
    });
    return this.prisma.$transaction(
      async () => {
        const user = await this.usersRepo.createUser(newUser);

        await this.emailService.sendNotificationEmail(email);
        return user.id;
      },
      {
        timeout: 6000,
      },
    );
  }
}
