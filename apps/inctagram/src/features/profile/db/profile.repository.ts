import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class ProfileRepository {
  constructor(private prisma: PrismaService) {}
}
