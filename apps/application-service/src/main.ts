import { NestFactory } from '@nestjs/core';
import { ApplicationServiceModule } from './application-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
