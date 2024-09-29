import { NestFactory } from '@nestjs/core';
import { RmMicroBacklogsModule } from './rm-micro-backlogs.module';

async function bootstrap() {
  const app = await NestFactory.create(RmMicroBacklogsModule);
  await app.listen(3000);
}
bootstrap();
