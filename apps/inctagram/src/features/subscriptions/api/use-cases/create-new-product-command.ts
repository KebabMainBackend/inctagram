// import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
// import { PrismaService } from "../../../../prisma.service";
// import { ProductEntity } from "../../../../../../payments/src/db/domain/product.entity";
//
// @CommandHandler(createNewProductCommand)
// export class createNewProductCommand implements ICommandHandler<createNewProductCommand>{
//   constructor(public prisma: PrismaService,
//               public productPrice: any,
//               public subscriptionPrice: any,
//               public payload: addNewSubscriptionTypeDto) {}
//
//   async execute(command: createNewProductCommand) {
//     const { productPrice, subscriptionPrice, payload } = command
//
//     const newProduct =
//       ProductEntity.create(productPrice.id, subscriptionPrice.id,
//         payload.price, payload.period, payload.interval,)
//
//     await this.prisma.stripe.create({data: newProduct})
//
//   }
//
// }
