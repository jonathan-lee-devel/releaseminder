import {createRabbitMqConsumerMicroservice} from '@app/micro/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {SourceControlModule} from './source-control.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    SourceControlModule,
    [...process.env.SOURCE_CONTROL_RABBITMQ_URLS.split(',')],
    process.env.SOURCE_CONTROL_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
