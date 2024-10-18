import {HttpStatus} from '@nestjs/common';

export type RabbitMQResultDto<TBody> = {
  status: HttpStatus;
  body?: TBody;
};
