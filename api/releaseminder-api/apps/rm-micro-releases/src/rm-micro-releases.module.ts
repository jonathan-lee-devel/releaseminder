import { Module } from '@nestjs/common';
import { RmMicroReleasesController } from './rm-micro-releases.controller';
import { RmMicroReleasesService } from './rm-micro-releases.service';

@Module({
  imports: [],
  controllers: [RmMicroReleasesController],
  providers: [RmMicroReleasesService],
})
export class RmMicroReleasesModule {}
