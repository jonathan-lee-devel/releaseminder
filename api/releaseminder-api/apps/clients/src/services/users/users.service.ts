import {RabbitMQResultDto} from '@app/micro/micro/rabbitmq/dto/common/RabbitMQResult.dto';
import {HttpStatus, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';
import {v4} from 'uuid';

import {AddressesRepositoryService} from '../_repositories/addresses-repository/addresses-repository.service';
import {OrganizationsRepositoryService} from '../_repositories/organizations-repository/organizations-repository.service';
import {UsersRepositoryService} from '../_repositories/users-repository/users-repository.service';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly organizationsRepositoryService: OrganizationsRepositoryService,
    private readonly addressesRepositoryService: AddressesRepositoryService,
  ) {}

  async onModuleInit() {
    const userCreateResult = await this.usersRepositoryService.insertUser(
      'jonathan.lee.devel@gmail.com',
      v4(),
    );

    const newUserId = userCreateResult[0].id;

    const organizationCreateResult =
      await this.organizationsRepositoryService.insertOrganization(
        'Test',
        newUserId,
      );

    const newOrganizationId = organizationCreateResult[0].id;

    const subdomainCreateResult =
      await this.addressesRepositoryService.insertSubdomain(
        newOrganizationId,
        `jdevel${v4()}`,
        newUserId,
      );

    this.logger.log('Inserted CLIENTS test data');

    this.logger.log(subdomainCreateResult[0]);
  }

  async getUserByEmail(
    requestingUser: AuthUser,
    email: string,
  ): Promise<RabbitMQResultDto<unknown>> {
    this.logger.log(`getUserByEmail: ${requestingUser.email} ${email}`);
    if (requestingUser.email === email) {
      return {
        status: HttpStatus.OK,
        body: await this.usersRepositoryService.getUserByEmail(
          requestingUser.email,
        ),
      };
    }
    return {status: HttpStatus.FORBIDDEN, body: null};
  }
}
