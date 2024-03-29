import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async deleteUserByEmail(email: string) {
    await this.prisma.user.delete({
      where: { email },
    });
  }
}
