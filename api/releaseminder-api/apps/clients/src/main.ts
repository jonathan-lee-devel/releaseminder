import {createRabbitMqConsumerMicroservice} from '@app/micro/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {ReleasesModule} from '../../releases/src/releases.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    ReleasesModule,
    [...process.env.CLIENTS_RABBITMQ_URLS.split(',')],
    process.env.CLIENTS_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
