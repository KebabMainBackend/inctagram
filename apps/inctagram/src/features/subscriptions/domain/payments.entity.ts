import { IsDate, IsInt, IsString } from 'class-validator';
import { purchaseSubscriptionDto } from '../api/dto';
import { ProductEntity } from "../../stripe/domain/product.entity";
import { Optional } from "@nestjs/common";

export class PaymentsEntity {
  @IsInt()
  userId: number;
  @IsDate()
  dateOfPayment: Date;
  @IsDate()
  endDateOfSubscription: Date;
  @IsInt()
  price: number;
  @IsString()
  paymentSystem: 'PayPall' | 'Stripe';
  @IsString()
  productPriceId: string;
  @IsString()
  subscriptionPriceId: string


  static create(data: purchaseSubscriptionDto,
                productInfo: ProductEntity,
                endDateOfSubscription, userId) {
    const { paymentSystem } = data;
    const payment = new PaymentsEntity();

    payment.userId = userId;
    payment.dateOfPayment = new Date();
    payment.endDateOfSubscription = endDateOfSubscription;
    payment.price = productInfo.price;
    payment.paymentSystem = paymentSystem;
    
    payment.productPriceId = productInfo.productPriceId
    payment.subscriptionPriceId = productInfo.subscriptionPriceId


    return payment;
  }
}
