import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductQueryRepository {
  constructor(private prisma: PrismaService) {}

  async getSubscriptionsTypes() {
    return this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
