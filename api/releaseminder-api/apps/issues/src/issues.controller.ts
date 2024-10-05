import {Controller, Get} from '@nestjs/common';

import {IssuesService} from './issues.service';

@Controller()
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get()
  getHello(): string {
    return this.issuesService.getHello();
  }
}
