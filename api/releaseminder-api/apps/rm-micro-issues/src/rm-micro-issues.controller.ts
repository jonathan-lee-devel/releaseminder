import { Controller, Get } from '@nestjs/common';
import { RmMicroIssuesService } from './rm-micro-issues.service';

@Controller()
export class RmMicroIssuesController {
  constructor(private readonly rmMicroIssuesService: RmMicroIssuesService) {}

  @Get()
  getHello(): string {
    return this.rmMicroIssuesService.getHello();
  }
}
