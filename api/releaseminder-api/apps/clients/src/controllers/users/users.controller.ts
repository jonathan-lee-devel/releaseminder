import {GetUserBySupabaseIdPayload} from '@app/micro/micro/rabbitmq/dto/clients/get-user-by-supabase-id.payload';
import {clientsPatterns} from '@app/micro/micro/rabbitmq/message-patterns/clients/clients-patterns';
import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';

import {UsersService} from '../../services/users/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(clientsPatterns.getUserBySupabaseId)
  getUserBySupabaseId(
    @Payload() {requestingUser, supabaseId}: GetUserBySupabaseIdPayload,
  ) {
    return this.usersService.getUserBySupabaseId(requestingUser, supabaseId);
  }
}
