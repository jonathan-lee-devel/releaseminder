import {Module} from '@nestjs/common';

import {SourceControlController} from './source-control.controller';
import {SourceControlService} from './source-control.service';

@Module({
  imports: [],
  controllers: [SourceControlController],
  providers: [SourceControlService],
})
export class SourceControlModule {}
