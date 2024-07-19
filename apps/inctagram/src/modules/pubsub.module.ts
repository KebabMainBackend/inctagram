import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}

// const triggerTransform = (trigger, { path }) => [trigger, ...path].join('.');
// const pubsub = new AmqpPubSub({
//   config: {
//     host: RABBITMQ_DOMAIN_NAME,
//     port: PORT_NUMBER,
//   },
// });
// const subscriptionManager = new SubscriptionManager({
//   schema,
//   setupFunctions: {
//     commentsAdded: (options, { repoName }) => ({
//       'comments.added': {
//         channelOptions: { path: [repoName] },
//       },
//     }),
//   },
//   pubsub,
// });
