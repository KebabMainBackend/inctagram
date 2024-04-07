import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductEntity } from './domain/product.entity';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getProductInfo(productPriceId: string) {
    return this.prisma.stripe.findUnique({ where: { productPriceId } });
  }
  async createProduct(data: ProductEntity) {
    await this.prisma.stripe.create({ data });
  }
}
