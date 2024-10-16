import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
//import * as dotenv from 'dotenv'; 
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))) //para el @exclude de clave
  app.enableCors({ origin: '*'}) //cors
  app.useGlobalPipes( new ValidationPipe({
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }) )
  // Cargar las variables de entorno desde el archivo .env
  // dotenv.config();
  
  /* const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); */

  await app.listen(3000);
}
bootstrap();
