import { Test, TestingModule } from '@nestjs/testing';
import { RmMicroReleasesController } from './rm-micro-releases.controller';
import { RmMicroReleasesService } from './rm-micro-releases.service';

describe('RmMicroReleasesController', () => {
  let rmMicroReleasesController: RmMicroReleasesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmMicroReleasesController],
      providers: [RmMicroReleasesService],
    }).compile();

    rmMicroReleasesController = app.get<RmMicroReleasesController>(RmMicroReleasesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmMicroReleasesController.getHello()).toBe('Hello World!');
    });
  });
});
