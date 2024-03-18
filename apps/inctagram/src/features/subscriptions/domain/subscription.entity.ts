import {purchaseSubscriptionDto} from "../api/dto";
import {addDays, addMonths} from "date-fns";

export class SubscriptionEntity {
    userId: number;
    subscriptionType: '1' | '7' | '31';
    dateOfSubscribe: Date
    dateOfNextPayment: Date
    autoRenewal: boolean
    paymentMethod: 'PayPall' | 'Stripe'
    static create(data: purchaseSubscriptionDto) {
        const { subscriptionType, paymentMethod } = data;
        const subscription = new SubscriptionEntity();

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

        return subscription
    }
}