import { Test, TestingModule } from '@nestjs/testing';
import { RmMicroIssuesController } from './rm-micro-issues.controller';
import { RmMicroIssuesService } from './rm-micro-issues.service';

describe('RmMicroIssuesController', () => {
  let rmMicroIssuesController: RmMicroIssuesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmMicroIssuesController],
      providers: [RmMicroIssuesService],
    }).compile();

    rmMicroIssuesController = app.get<RmMicroIssuesController>(RmMicroIssuesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmMicroIssuesController.getHello()).toBe('Hello World!');
    });
  });
});
