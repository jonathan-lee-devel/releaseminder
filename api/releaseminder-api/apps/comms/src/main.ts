import {createRabbitMqConsumerMicroservice} from '@app/micro/micro/micro.utils';

import {CommsModule} from './comms.module';

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    CommsModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    process.env.COMMS_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
