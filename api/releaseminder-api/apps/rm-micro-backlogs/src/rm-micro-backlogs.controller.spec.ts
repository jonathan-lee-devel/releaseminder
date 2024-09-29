import { Test, TestingModule } from '@nestjs/testing';
import { RmMicroBacklogsController } from './rm-micro-backlogs.controller';
import { RmMicroBacklogsService } from './rm-micro-backlogs.service';

describe('RmMicroBacklogsController', () => {
  let rmMicroBacklogsController: RmMicroBacklogsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmMicroBacklogsController],
      providers: [RmMicroBacklogsService],
    }).compile();

    rmMicroBacklogsController = app.get<RmMicroBacklogsController>(RmMicroBacklogsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmMicroBacklogsController.getHello()).toBe('Hello World!');
    });
  });
});
