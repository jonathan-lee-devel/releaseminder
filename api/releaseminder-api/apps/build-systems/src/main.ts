import {createRabbitMqConsumerMicroservice} from '@app/micro/micro/micro.utils';

import {BuildSystemsModule} from './build-systems.module';

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    BuildSystemsModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    process.env.BUILD_SYSTEMS_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
