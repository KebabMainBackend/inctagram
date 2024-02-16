import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserTypes } from '../domain/types/create-user.types';
import { CreateUserConfirmationTypes } from '../domain/types/create-user-confirmation.types';
import { CreateOauthProviderTypes } from '../domain/types/create-oauth-provider.types';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}
  async createUser(data: CreateUserTypes) {
    return this.prisma.user.create({
      data: {
        ...data,
        profile: {
          create: {
            firstname: null,
            lastname: null,
          },
        },
      },
    });
  }

  async deleteUserByEmail(email: string) {
    await this.prisma.user.delete({
      where: { email },
    });
  }

  async updateUsersConfirmationStatus(userId: number) {
    await this.prisma.user.update({
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
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { providers: true, confirmationData: true },
    });
  }
  getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  getUserByCode(code: string) {
    return this.prisma.user.findFirst({
      where: {
        confirmationData: { confirmationCode: code },
      },
      include: {
        providers: true,
        confirmationData: true,
      },
    });
  }
  getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
  getUserProviderByIdAndType(providerId: string, providerType: string) {
    return this.prisma.oAuthProvider.findFirst({
      where: {
        providerId,
        providerType,
      },
    });
  }
}
