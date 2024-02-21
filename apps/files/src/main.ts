import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FilesModule,
    {
      transport: Transport.TCP,
      // options: {
      //   port: 3001,
      //   host: '0.0.0.0',
      // },
      // options: {
      //   urls: ['amqp://localhost:5672'],
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
