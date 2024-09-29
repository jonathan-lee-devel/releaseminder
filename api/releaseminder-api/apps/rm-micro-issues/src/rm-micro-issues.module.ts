import { Module } from '@nestjs/common';
import { RmMicroIssuesController } from './rm-micro-issues.controller';
import { RmMicroIssuesService } from './rm-micro-issues.service';

@Module({
  imports: [],
  controllers: [RmMicroIssuesController],
  providers: [RmMicroIssuesService],
})
export class RmMicroIssuesModule {}
