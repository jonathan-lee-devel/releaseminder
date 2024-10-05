import { Test, TestingModule } from '@nestjs/testing';
import { BuildSystemsController } from './build-systems.controller';
import { BuildSystemsService } from './build-systems.service';

describe('BuildSystemsController', () => {
  let buildSystemsController: BuildSystemsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BuildSystemsController],
      providers: [BuildSystemsService],
    }).compile();

    buildSystemsController = app.get<BuildSystemsController>(BuildSystemsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(buildSystemsController.getHello()).toBe('Hello World!');
    });
  });
});
