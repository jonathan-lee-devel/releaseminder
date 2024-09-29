import { NestFactory } from '@nestjs/core';
import { RmMicroIssuesModule } from './rm-micro-issues.module';

async function bootstrap() {
  const app = await NestFactory.create(RmMicroIssuesModule);
  await app.listen(3000);
}
bootstrap();
