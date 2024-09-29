import { NestFactory } from '@nestjs/core';
import { RmMicroReleasesModule } from './rm-micro-releases.module';

async function bootstrap() {
  const app = await NestFactory.create(RmMicroReleasesModule);
  await app.listen(3000);
}
bootstrap();
