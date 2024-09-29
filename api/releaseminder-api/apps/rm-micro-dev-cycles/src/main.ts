import { NestFactory } from '@nestjs/core';
import { RmMicroDevCyclesModule } from './rm-micro-dev-cycles.module';

async function bootstrap() {
  const app = await NestFactory.create(RmMicroDevCyclesModule);
  await app.listen(3000);
}
bootstrap();
