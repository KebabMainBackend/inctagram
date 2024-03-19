import {IsBoolean, IsDate, IsIn, IsInt, IsString} from "class-validator";

export class purchaseSubscriptionDto {
    @IsString()
    subscriptionType: '1' | '7' | '31'
    @IsString()
    paymentMethod: 'PayPall' | 'Stripe'
}

export class updateAutoRenewalStatusDto {
    @IsBoolean()
    autoRenewal: boolean
}

export class createPaymentDto {
    @IsInt()
    price: number
    @IsString()
    paymentType: 'PayPall' | 'Stripe'
    @IsDate()
    endDateOfSubscription: Date
}