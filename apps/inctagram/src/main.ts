import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appSettings } from './app.settings';
import { createStaticSwagger } from './configs/swagger.configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  await app.listen(process.env.PORT || 3000);
  createStaticSwagger();
}
bootstrap();
