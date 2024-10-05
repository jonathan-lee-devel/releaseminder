import {DbModule} from '@app/db/db';
import {Module} from '@nestjs/common';

import {CommsController} from './comms.controller';
import {CommsService} from './comms.service';
import * as schema from './db/schema';

@Module({
  imports: [DbModule.register({serviceName: 'COMMS', schema})],
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
