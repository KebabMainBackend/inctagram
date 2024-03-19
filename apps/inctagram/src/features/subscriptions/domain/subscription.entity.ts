import {purchaseSubscriptionDto} from "../api/dto";
import {addDays, addMonths} from "date-fns";
import {IsBoolean, IsDate, IsInt, IsString} from "class-validator";

export class SubscriptionEntity {
    @IsInt()
    userId: number;
    @IsString()
    subscriptionType: '1' | '7' | '31';
    @IsDate()
    dateOfSubscribe: Date
    @IsDate()
    dateOfNextPayment: Date
    @IsBoolean()
    autoRenewal: boolean
    @IsString()
    paymentMethod: 'PayPall' | 'Stripe'
    @IsDate()
    expireAt: Date
    static create(data: purchaseSubscriptionDto, userId) {
        const { subscriptionType, paymentMethod } = data;
        const subscription = new SubscriptionEntity();

        subscription.userId = userId

        subscription.subscriptionType = subscriptionType
        subscription.paymentMethod = paymentMethod
        subscription.autoRenewal = false

        subscription.dateOfSubscribe = new Date()

        if(subscription.subscriptionType === '1')
            subscription.dateOfNextPayment = addDays(new Date(), 1)
        else if(subscription.subscriptionType === '7')
            subscription.dateOfNextPayment = addDays(new Date(), 7)
        else if(subscription.subscriptionType === '31')
            subscription.dateOfNextPayment = addMonths(new Date(), 1)

        subscription.expireAt = addDays(new Date(), Number(subscriptionType))

        return subscription
    }
}