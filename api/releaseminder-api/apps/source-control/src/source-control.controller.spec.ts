import {Test, TestingModule} from '@nestjs/testing';

import {SourceControlController} from './source-control.controller';
import {SourceControlService} from './source-control.service';

describe('SourceControlController', () => {
  let sourceControlController: SourceControlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SourceControlController],
      providers: [SourceControlService],
    }).compile();

    sourceControlController = app.get<SourceControlController>(
      SourceControlController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sourceControlController.getHello()).toBe('Hello World!');
    });
  });
});
