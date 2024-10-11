import {TestBed} from '@automock/jest';

import {CommsController} from './comms.controller';

describe('CommsController', () => {
  let commsController: CommsController;

  beforeEach(async () => {
    const {unit} = TestBed.create(CommsController).compile();

    commsController = unit;
  });

  it('should be defined', () => {
    expect(commsController).toBeDefined();
  });
});
