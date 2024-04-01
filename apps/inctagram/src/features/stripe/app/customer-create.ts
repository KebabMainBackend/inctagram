import Stripe from "stripe";
import process from "process";

export const customerCreate = async (userId, email, prisma, stripe) => {

  let customer =
    await prisma.currentSubscription.findUnique({
      where: {userId}
    });

  if(!customer) {
    const newCustomer =
      await stripe.customers.create({
        email,
        metadata: {
          userId,
        }
      })

    await prisma.currentSubscription.update({
      where: {userId},
      data: {customerId: newCustomer.id}
    })

    customer =
      await prisma.currentSubscription.findUnique({
        where: {userId}
      })
  }

  return customer
}