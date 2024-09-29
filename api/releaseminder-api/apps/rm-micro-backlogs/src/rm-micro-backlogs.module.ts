import { Module } from '@nestjs/common';
import { RmMicroBacklogsController } from './rm-micro-backlogs.controller';
import { RmMicroBacklogsService } from './rm-micro-backlogs.service';

@Module({
  imports: [],
  controllers: [RmMicroBacklogsController],
  providers: [RmMicroBacklogsService],
})
export class RmMicroBacklogsModule {}
