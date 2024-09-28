import { Test, TestingModule } from '@nestjs/testing';
import { RmMicroController } from './rm-micro.controller';
import { RmMicroService } from './rm-micro.service';

describe('RmMicroController', () => {
  let rmMicroController: RmMicroController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmMicroController],
      providers: [RmMicroService],
    }).compile();

    rmMicroController = app.get<RmMicroController>(RmMicroController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmMicroController.getHello()).toBe('Hello World!');
    });
  });
});
