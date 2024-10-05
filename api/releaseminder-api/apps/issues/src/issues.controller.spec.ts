import { Test, TestingModule } from '@nestjs/testing';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

describe('IssuesController', () => {
  let issuesController: IssuesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IssuesController],
      providers: [IssuesService],
    }).compile();

    issuesController = app.get<IssuesController>(IssuesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(issuesController.getHello()).toBe('Hello World!');
    });
  });
});
