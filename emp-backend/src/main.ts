import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaKnownRequestFilter } from './common/filters/prismaErrors.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization', 'accept'],
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    credentials: true,
  });

  app.useGlobalFilters(new PrismaKnownRequestFilter());

  // Create swagger doc
  const config = new DocumentBuilder()
    .setTitle('BookMe API')
    .setDescription('BookMe API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
