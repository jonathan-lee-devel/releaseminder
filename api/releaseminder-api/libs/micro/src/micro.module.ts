import { Module } from '@nestjs/common';
import { MicroService } from './micro.service';

@Module({
  providers: [MicroService],
  exports: [MicroService],
})
export class MicroModule {}
