import {NestFactory} from '@nestjs/core';

import {ApiModule} from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
}

bootstrap().catch((reason) => console.error(reason));
