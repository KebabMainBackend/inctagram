import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FilesModule,
    {
      transport: Transport.TCP,
      options: {
        // host: 'localhost',
        port: 3261,
      },
      // options: {
      //   urls: [
      //     process.env.AMQP_RABBIT,
      //   ],
      //   queue: process.env.QUEUE_NAME,
      //   queueOptions: {
      //     durable: false,
      //   },
      // },
    },
  );
  await app.listen();
}
bootstrap();
