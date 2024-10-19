import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MessengerModule } from './messenger.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MessengerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_RABBIT],
        queue: process.env.QUEUE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
