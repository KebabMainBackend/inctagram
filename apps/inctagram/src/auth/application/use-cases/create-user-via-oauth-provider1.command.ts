import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma.service';
import { EmailService } from '../../managers/email.manager';
import { UserEntity } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../db/users.repository';
import {
  OauthProviderEntity,
  ProviderType,
} from '../../domain/entities/oauth-provider.entity';
import { OAuth2Client } from 'google-auth-library';
import { HttpException, HttpStatus } from '@nestjs/common';

type LoginCheckType = {
  providerId: string;
  providerType: ProviderType;
};

export class SignInUserViaOauthProviderCommand1 {
  constructor(
    public token: string,
    public providerType: ProviderType,
  ) {}
}

@CommandHandler(SignInUserViaOauthProviderCommand1)
export class SignInUserViaOauthProviderHandler1
  implements ICommandHandler<SignInUserViaOauthProviderCommand1>
{
  constructor(
    private prisma: PrismaService,
    private usersRepo: UsersRepository,
    private emailService: EmailService,
  ) {}
  async execute(data: SignInUserViaOauthProviderCommand1) {
    let providerId: string;
    let email: string;

    if (data.providerType === ProviderType.GOOGLE) {
      const { id, email: githubEmail } = await this.getPayloadFromGoogle(
        data.token,
      );
      providerId = id;
      email = githubEmail;
    } else {
      const { id, email: githubEmail } = await this.getPayloadFromGithub(
        data.token,
      );
      providerId = id;
      email = githubEmail;
    }

    await this.checkIfItIsLogin({
      providerId,
      providerType: data.providerType,
    });

    const userId = await this.getUserId(email, providerId);
    const provider = OauthProviderEntity.create({
      email,
      providerType: data.providerType,
      providerId,
      userId,
    });
    await this.usersRepo.createOauthProvider(provider);
    return userId;
  }
  private async getPayloadFromGoogle(token: string) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return { email: payload.email, id: payload.sub };
  }
  private async getPayloadFromGithub(token: string) {
    let email: string;
    const data = await fetch('https://api.github.com/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const payload = await data.json();
    if (!payload.email) {
      const response = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const emailData = await response.json();
      if (!emailData.length) {
        throw new HttpException('email is hidden', HttpStatus.CONFLICT);
      }
      email = (emailData.find((e) => e.primary) ?? emailData[0]).email;
    }
    return { email, id: payload.id.toString() };
  }
  private async createUser({
    email,
    providerId,
  }: {
    email: string;
    providerId: string;
  }) {
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
        timeout: 8000,
      },
    );
  }
  private async checkIfItIsLogin({ providerId, providerType }: LoginCheckType) {
    const providerClient = await this.usersRepo.getUserProviderByIdAndType(
      providerId,
      providerType,
    );
    if (providerClient) {
      return providerClient.userId;
    }
  }

  private async getUserId(email: string, providerId: string) {
    const userByEmail = await this.usersRepo.getUserByEmail(email);
    if (!userByEmail) {
      return await this.createUser({ email, providerId });
    } else {
      return userByEmail.id;
    }
  }
}
