import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('BAAS Character API')
    .setDescription(
      'It is an application that returns the most famous characters from the television series Rick and Morty',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3002/api/v1', 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get('port'));
}
bootstrap();
