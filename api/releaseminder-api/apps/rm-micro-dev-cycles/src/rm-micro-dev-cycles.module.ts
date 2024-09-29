import { Module } from '@nestjs/common';
import { RmMicroDevCyclesController } from './rm-micro-dev-cycles.controller';
import { RmMicroDevCyclesService } from './rm-micro-dev-cycles.service';

@Module({
  imports: [],
  controllers: [RmMicroDevCyclesController],
  providers: [RmMicroDevCyclesService],
})
export class RmMicroDevCyclesModule {}
