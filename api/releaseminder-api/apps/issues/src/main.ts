import {createRabbitMQMicroservice} from '@app/micro/micro/micro.utils';
import {configDotenv} from 'dotenv';

import {IssuesModule} from './issues.module';

configDotenv();

async function bootstrap() {
  const app = await createRabbitMQMicroservice(
    IssuesModule,
    [...process.env.ISSUES_RABBITMQ_URLS.split(',')],
    process.env.ISSUES_QUEUE_NAME,
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
