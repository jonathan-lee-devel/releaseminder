import {Controller, Get} from '@nestjs/common';

import {ReleasesService} from './releases.service';

@Controller()
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Get()
  getHello(): string {
    return this.releasesService.getHello();
  }
}
