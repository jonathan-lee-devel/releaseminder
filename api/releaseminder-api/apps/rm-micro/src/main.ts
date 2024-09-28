import { NestFactory } from '@nestjs/core';
import { RmMicroModule } from './rm-micro.module';

async function bootstrap() {
  const app = await NestFactory.create(RmMicroModule);
  await app.listen(3000);
}
bootstrap();
