import { Controller, Get } from '@nestjs/common';
import { RmMicroReleasesService } from './rm-micro-releases.service';

@Controller()
export class RmMicroReleasesController {
  constructor(private readonly rmMicroReleasesService: RmMicroReleasesService) {}

  @Get()
  getHello(): string {
    return this.rmMicroReleasesService.getHello();
  }
}
