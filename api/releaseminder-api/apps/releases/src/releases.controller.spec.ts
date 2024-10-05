import {Test, TestingModule} from '@nestjs/testing';

import {ReleasesController} from './releases.controller';
import {ReleasesService} from './releases.service';

describe('ReleasesController', () => {
  let releasesController: ReleasesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReleasesController],
      providers: [ReleasesService],
    }).compile();

    releasesController = app.get<ReleasesController>(ReleasesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(releasesController.getHello()).toBe('Hello World!');
    });
  });
});
