import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersQueryRepository {
  constructor(private prisma: PrismaService) {}
}
