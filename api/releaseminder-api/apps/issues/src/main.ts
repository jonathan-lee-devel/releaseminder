import {createRabbitMqConsumerMicroservice} from '@app/micro/micro/micro.utils';

import {IssuesModule} from './issues.module';

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    IssuesModule,
    [...process.env.RABBITMQ_URLS.split(',')],
    process.env.ISSUES_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
