import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentsModule,
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
