import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrapApp } from './bootstrap/app.bootstrap';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Bootstrap logic (Swagger, Pipes, CORS)
  await bootstrapApp(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api`);
}
bootstrap();
