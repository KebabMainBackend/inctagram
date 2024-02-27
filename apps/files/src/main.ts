import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FilesModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
      // options: {
      //   urls: [
      //     'amqps://faqtdshr:G9jGzo6PGzV8RMQqVr6F1G0mk0Ze39uz@dingo.rmq.cloudamqp.com/faqtdshr',
      //   ],
      //   queue: 'file-upload',
      //   queueOptions: {
      //     durable: false,
      //   },
      // },
    },
  );
  await app.listen();
}
bootstrap();
