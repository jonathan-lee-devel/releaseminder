import {DbModule} from '@app/db/db';
import {Logger, Module} from '@nestjs/common';

import {CommsController} from './comms.controller';
import {CommsService} from './comms.service';
import * as schema from './db/schema';

@Module({
  imports: [
    DbModule.register({
      logger: new Logger(CommsModule.name),
      serviceName: 'COMMS',
      schema,
    }),
  ],
  controllers: [CommsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(CommsModule.name),
    },
    CommsService,
  ],
})
export class CommsModule {}
