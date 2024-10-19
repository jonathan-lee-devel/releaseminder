import {CurrentUser} from '@app/auth/auth/supabase/decorators/current-user.decorator';
import {Public} from '@app/auth/auth/supabase/decorators/is-public.decorator';
import {GetUserByEmailPayload} from '@app/micro/micro/rabbitmq/dto/clients/get-user-by-email.payload';
import {RabbitMQResultDto} from '@app/micro/micro/rabbitmq/dto/common/RabbitMQResult.dto';
import {clientsPatterns} from '@app/micro/micro/rabbitmq/message-patterns/clients/clients-patterns';
import {EmailQueryDto} from '@app/validation/validation/email.query.dto';
import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {AuthUser} from '@supabase/supabase-js';
import {map} from 'rxjs';

import {host} from '../../config/environment';

@Controller({host, path: 'users'})
export class UsersController {
  constructor(
    private readonly logger: Logger,
    @Inject('CLIENTS') private readonly clientsService: ClientProxy,
  ) {}

  @Get()
  async getUserByEmail(
    @CurrentUser() currentUser: AuthUser,
    @Query() {email}: EmailQueryDto,
  ) {
    return this.clientsService
      .send<RabbitMQResultDto<unknown>, GetUserByEmailPayload>(
        clientsPatterns.getUserByEmail,
        {
          requestingUser: currentUser,
          email,
        },
      )
      .pipe(
        map((result) => {
          if (result.status === HttpStatus.OK && result.body) {
            return result.body;
          }

          throw new ForbiddenException();
        }),
      );
  }

  @Public()
  @Post('authenticated/check-in')
  checkIn() {
    return {isAcknowledged: true};
  }
}
