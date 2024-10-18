import {DbModule} from '@app/db/db';
import {Logger, Module} from '@nestjs/common';

import {UsersController} from './controllers/users/users.controller';
import {AddressesRepositoryService} from './services/_repositories/addresses-repository/addresses-repository.service';
import {OrganizationsRepositoryService} from './services/_repositories/organizations-repository/organizations-repository.service';
import {UsersRepositoryService} from './services/_repositories/users-repository/users-repository.service';
import {UsersService} from './services/users/users.service';
import * as schema from '../../clients/src/db/schema';

@Module({
  imports: [
    DbModule.register({
      logger: new Logger(ClientsModule.name),
      serviceName: 'CLIENTS',
      schema,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(ClientsModule.name),
    },
    UsersService,
    AddressesRepositoryService,
    OrganizationsRepositoryService,
    UsersRepositoryService,
  ],
})
export class ClientsModule {}
