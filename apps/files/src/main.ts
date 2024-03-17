import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(FilesModule);
  const configService = app.get(ConfigService);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: Number(configService.get('FILES_SERVICE_PORT') || 3262),
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
