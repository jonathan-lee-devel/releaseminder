import {GetUserByEmailPayload} from '@app/micro/micro/rabbitmq/dto/clients/get-user-by-email.payload';
import {clientsPatterns} from '@app/micro/micro/rabbitmq/message-patterns/clients/clients-patterns';
import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';

import {UsersService} from '../../services/users/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(clientsPatterns.getUserByEmail)
  getUserBySupabaseId(
    @Payload() {requestingUser, email}: GetUserByEmailPayload,
  ) {
    return this.usersService.getUserByEmail(requestingUser, email);
  }
}
