import {createRabbitMQMicroservice} from '@app/micro/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {CommsModule} from './comms.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMQMicroservice(
    CommsModule,
    [...process.env.COMMS_RABBITMQ_URLS.split(',')],
    process.env.COMMS_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
