import { Test, TestingModule } from '@nestjs/testing';
import { RmMicroDevCyclesController } from './rm-micro-dev-cycles.controller';
import { RmMicroDevCyclesService } from './rm-micro-dev-cycles.service';

describe('RmMicroDevCyclesController', () => {
  let rmMicroDevCyclesController: RmMicroDevCyclesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmMicroDevCyclesController],
      providers: [RmMicroDevCyclesService],
    }).compile();

    rmMicroDevCyclesController = app.get<RmMicroDevCyclesController>(RmMicroDevCyclesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmMicroDevCyclesController.getHello()).toBe('Hello World!');
    });
  });
});
