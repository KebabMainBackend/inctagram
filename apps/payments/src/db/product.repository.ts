import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductEntity } from './domain/product.entity';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getProductInfo(productPriceId: string) {
    return this.prisma.product.findFirst({ where: { productPriceId } });
  }
  async createProduct(data: ProductEntity) {
    await this.prisma.product.create({ data });
  }
  async updateProduct(period: number, paypalPlanId: string) {
    await this.prisma.product.updateMany({
      where: { period },
      data: { paypalPlanId }
    });
  }
}
