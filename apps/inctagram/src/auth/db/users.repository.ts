import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserTypes } from '../types/create-user.types';
import { CreateUserConfirmationTypes } from '../types/create-user-confirmation.types';
import { CreateOauthProviderTypes } from '../types/create-oauth-provider.types';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserTypes) {
    return this.prisma.user.create({
      data,
    });
  }

  async deleteUserByEmail(email: string) {
    await this.prisma.user.delete({
      where: { email },
    });
  }

  async updateUsersConfirmationStatus(userId: number) {
    this.prisma.user.update({
      where: { id: userId },
      data: { isConfirmed: true },
    });
  }

  async deleteUserConfirmationData(id: number) {
    await this.prisma.userConfirmation.delete({
      where: { id },
    });
  }

  async updateUserPassword(
    userId: number,
    newPasswordSalt: string,
    newPasswordHash: string,
  ) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordSalt: newPasswordSalt,
        passwordHash: newPasswordHash,
      },
    });
  }
  async createUserConfirmationData(data: CreateUserConfirmationTypes) {
    return this.prisma.userConfirmation.create({
      data,
    });
  }
  async createOauthProvider(data: CreateOauthProviderTypes) {
    return this.prisma.oAuthProvider.create({
      data,
    });
  }
}
