import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

import {ApiModule} from '../../../apps/api/src/api.module';

export const createRabbitMQMicroservice = async (
  module: typeof ApiModule,
  rabbitMqUrls: string[],
  queueName: string,
) => {
  return NestFactory.createMicroservice<MicroserviceOptions>(module, {
    transport: Transport.RMQ,
    options: {
      urls: rabbitMqUrls,
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });
};
