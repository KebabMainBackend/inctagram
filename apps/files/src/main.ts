import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(FilesModule);
  // const configService = app.get(ConfigService);
  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     host: configService.get('FILES_SERVICE_HOST'),
  //     port: Number(configService.get('FILES_SERVICE_PORT') || 3262),
  //   },
  // });
  // await app.startAllMicroservices();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FilesModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env['FILES_SERVICE_HOST'] || 'files-service-service',
        // host: process.env['FILES_SERVICE_HOST'] || '0.0.0.0',
        port: Number(process.env['FILES_SERVICE_PORT'] || 3262),
      },
    },
  );
  await app.listen();
}
bootstrap();
