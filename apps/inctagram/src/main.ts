import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appSettings } from './app.settings';
import { createStaticSwagger } from './configs/swagger.configs';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger } from '@nestjs/common';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  appSettings(app);
  const config = new DocumentBuilder()
    .setTitle('Inctagram')
    .setDescription('The Inctagram API description from Kebab team')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  // console.log('Initializing WebSocket Adapter...');
  // app.useWebSocketAdapter(new IoAdapter(app));
  // console.log('WebSocket Adapter Initialized.');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/swagger', app, document);
  console.log('аоеооа');
  await app.listen(3000);
  //await app.listen(configService.get('PORT'));
  createStaticSwagger();
}
bootstrap();
