import { Module } from '@nestjs/common';
import { ReleasesController } from './releases.controller';
import { ReleasesService } from './releases.service';

@Module({
  imports: [],
  controllers: [ReleasesController],
  providers: [ReleasesService],
})
export class ReleasesModule {}
