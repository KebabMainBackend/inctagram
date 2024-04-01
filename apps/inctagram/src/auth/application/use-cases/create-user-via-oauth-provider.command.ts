import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import { UserEntity } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../db/users.repository';
import {
  OauthProviderEntity,
  ProviderType,
} from '../../domain/entities/oauth-provider.entity';
import { LanguageEnums } from '../../../types';

type SignInUserViaOauthProviderTypes = {
  email: string | null;
  providerId: string;
  providerType: ProviderType;
  language: LanguageEnums;
};

export class SignInUserViaOauthProviderCommand {
  constructor(public data: SignInUserViaOauthProviderTypes) {}
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
  async execute({ data }: SignInUserViaOauthProviderCommand) {
    const { providerId, providerType, email, language } = data;
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
      userId = await this.createUser(email, providerId, language);
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
  private async createUser(
    email: string,
    providerId: string,
    language: LanguageEnums,
  ) {
    const newUser = UserEntity.create({
      email,
      username: 'client' + providerId,
      isConfirmed: true,
    });
    return this.prisma.$transaction(
      async () => {
        const user = await this.usersRepo.createUser(newUser);

        await this.emailService.sendNotificationEmail(email, language);
        return user.id;
      },
      {
        timeout: 6000,
      },
    );
  }
}
