import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserTypes } from '../domain/types/create-user.types';
import { CreateUserConfirmationTypes } from '../domain/types/create-user-confirmation.types';
import { CreateOauthProviderTypes } from '../domain/types/create-oauth-provider.types';
import { UserConfirmationEntity } from '../domain/entities/user.entity';

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

  async deleteUserByEmail(email: string, userId: number) {
    await this.prisma.profile.delete({
      where: { userId },
    });
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
  async getUserConfirmation(id: number) {
    const data = await this.prisma.userConfirmation.findUnique({
      where: { id },
    });
    const confirmationData = new UserConfirmationEntity();
    confirmationData.id = data.id;
    confirmationData.confirmationCode = data.confirmationCode;
    confirmationData.userId = data.userId;
    confirmationData.codeExpirationDate = data.codeExpirationDate;
    return confirmationData;
  }
  async updateConfirmationDate(confirmData: UserConfirmationEntity) {
    await this.prisma.userConfirmation.update({
      where: {
        id: confirmData.id,
      },
      data: {
        confirmationCode: confirmData.confirmationCode,
        codeExpirationDate: confirmData.codeExpirationDate,
      },
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
