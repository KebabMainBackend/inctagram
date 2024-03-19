import {IsDate, IsIn, IsInt, IsString} from "class-validator";
import {CreatePostTypes} from "../../posts/domain/types/create-post.types";
import {PostStatusEnum} from "../../posts/domain/types/post.enum";
import {createPaymentDto} from "../api/dto";

export class PaymentsEntity {
    @IsInt()
    userId: number
    @IsDate()
    dateOfPayments: Date
    @IsDate()
    endDateOfSubscription: Date
    @IsInt()
    price: number
    @IsString()
    paymentType: 'PayPall' | 'Stripe'

    static create(data: createPaymentDto, userId) {
        const { price, paymentType, endDateOfSubscription } = data;
        const payment = new PaymentsEntity();
        payment.userId = userId;
        payment.dateOfPayments = new Date();
        payment.endDateOfSubscription = endDateOfSubscription
        payment.price = price
        payment.paymentType = paymentType


        return payment;
    }
}