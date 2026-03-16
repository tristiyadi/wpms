/* eslint-disable @typescript-eslint/require-await */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe, patchNestJsSwagger } from 'nestjs-zod';

export async function bootstrapApp(app: INestApplication) {
  // Global Validation using Zod
  app.useGlobalPipes(new ZodValidationPipe());

  // Patch Swagger to support Zod DTOs
  patchNestJsSwagger();

  // CORS
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Wellness API')
    .setDescription('Wellness package management API (Admin & Mobile)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
