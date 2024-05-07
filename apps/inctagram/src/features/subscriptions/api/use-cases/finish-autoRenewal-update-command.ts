// import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { PrismaService } from "../../../../prisma.service";
// import { ProductEntity } from "../../../stripe/domain/product.entity";
//
// @CommandHandler(finishAutoRenewalUpdate)
// export class finishAutoRenewalUpdate implements ICommandHandler<finishAutoRenewalUpdate>{
//   constructor(public prisma: PrismaService,
//               public userId: string,
//               public autoRenewal: boolean,
//               public product: ProductEntity,
//               public subscriptionId: string) {}
//
//   async execute(command: finishAutoRenewalUpdate) {
//     const { userId, autoRenewal,
//       product, subscriptionId } = command
//
//     await this.prisma.subscription.update({
//       where: {userId, subscriptionId: product.subscriptionId},
//       data: {stripeSubscriptionId: subscriptionId, autoRenewal}
//     })
//
//     const autoRenewalOnSubscriptions =
//       await this.prisma.subscription.findMany({
//         where: { userId, autoRenewal: true },
//       })
//
//       await this.prisma.currentSubscription.update({
//         where: { userId },
//         data: { hasAutoRenewal: !!autoRenewalOnSubscriptions.length }
//       });
//
//   }
//
// }
