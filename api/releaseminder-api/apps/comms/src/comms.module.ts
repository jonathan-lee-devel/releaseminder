import {Module} from '@nestjs/common';

import {CommsController} from './comms.controller';
import {CommsService} from './comms.service';

@Module({
  imports: [],
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
