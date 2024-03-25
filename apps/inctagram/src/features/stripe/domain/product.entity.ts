import { IsDate, IsInt, IsString } from 'class-validator';
import { addNewProductDto } from '../api/dto';

export class ProductEntity {
  @IsInt()
  price: number;
  @IsString()
  type: string;
  @IsString()
  category: string;
  @IsInt()
  priceId: string;
  @IsString()
  productId: string;

  static create(data: addNewProductDto) {
    const { productId, priceId, price, category, type } = data;
    const product = new ProductEntity();

    product.productId = productId;
    product.priceId = priceId;
    product.category = category;
    product.price = price;
    product.type = type;

    return product;
  }
}
