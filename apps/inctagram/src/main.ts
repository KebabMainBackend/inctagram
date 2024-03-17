import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appSettings } from './app.settings';
import { createStaticSwagger } from './configs/swagger.configs';
import { ConfigService } from '@nestjs/config';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  appSettings(app);
  const config = new DocumentBuilder()
    .setTitle('Inctagram')
    .setDescription('The Inctagram API description from Kebab team')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger', app, document);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'file-upload',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });
  //
  // await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  createStaticSwagger();
}
bootstrap();
