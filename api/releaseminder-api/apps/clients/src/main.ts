import {createRabbitMQMicroservice} from '@app/micro/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {ClientsModule} from './clients.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMQMicroservice(
    ClientsModule,
    [...process.env.CLIENTS_RABBITMQ_URLS.split(',')],
    process.env.CLIENTS_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
