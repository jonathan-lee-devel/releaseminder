import {Test, TestingModule} from '@nestjs/testing';

import {CommsController} from './comms.controller';
import {CommsService} from './comms.service';

describe('CommsController', () => {
  let commsController: CommsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [CommsService],
    }).compile();

    commsController = app.get<CommsController>(CommsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(commsController.getHello()).toBe('Hello World!');
    });
  });
});
