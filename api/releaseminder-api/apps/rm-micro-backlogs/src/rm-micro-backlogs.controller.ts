import { Controller, Get } from '@nestjs/common';
import { RmMicroBacklogsService } from './rm-micro-backlogs.service';

@Controller()
export class RmMicroBacklogsController {
  constructor(private readonly rmMicroBacklogsService: RmMicroBacklogsService) {}

  @Get()
  getHello(): string {
    return this.rmMicroBacklogsService.getHello();
  }
}
