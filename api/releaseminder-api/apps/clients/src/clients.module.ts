import {DbModule} from '@app/db/db';
import {Logger, Module} from '@nestjs/common';

import {UsersController} from './controllers/users/users.controller';
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
  ],
})
export class ClientsModule {}
