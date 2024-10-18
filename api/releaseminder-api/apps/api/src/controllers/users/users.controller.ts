import {CurrentUser} from '@app/auth/auth/supabase/decorators/current-user.decorator';
import {Public} from '@app/auth/auth/supabase/decorators/is-public.decorator';
import {GetUserBySupabaseIdPayload} from '@app/micro/micro/rabbitmq/dto/clients/get-user-by-supabase-id.payload';
import {RabbitMQResultDto} from '@app/micro/micro/rabbitmq/dto/common/RabbitMQResult.dto';
import {clientsPatterns} from '@app/micro/micro/rabbitmq/message-patterns/clients/clients-patterns';
import {IdParamDto} from '@app/validation/validation';
import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
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

  @Get('supabase/:id')
  async getUserBySupabaseId(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.clientsService
      .send<RabbitMQResultDto<unknown>, GetUserBySupabaseIdPayload>(
        clientsPatterns.getUserBySupabaseId,
        {
          requestingUser: currentUser,
          supabaseId: id,
        },
      )
      .pipe(
        map((result) => {
          this.logger.log(result);
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
