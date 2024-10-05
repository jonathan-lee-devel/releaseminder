import {createRabbitMqConsumerMicroservice} from '@app/micro/micro/micro.utils';

import {ReleasesModule} from './releases.module';

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    ReleasesModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    process.env.RELEASES_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
