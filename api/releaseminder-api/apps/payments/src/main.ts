import {createRabbitMQMicroservice} from '@app/micro/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {ReleasesModule} from '../../releases/src/releases.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMQMicroservice(
    ReleasesModule,
    [...process.env.PAYMENTS_RABBITMQ_URLS.split(',')],
    process.env.PAYMENTS_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
