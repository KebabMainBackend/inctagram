import {IsBoolean, IsString} from "class-validator";

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