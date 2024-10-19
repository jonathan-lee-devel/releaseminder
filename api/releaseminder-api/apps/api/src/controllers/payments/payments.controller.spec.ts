import {TestBed} from '@automock/jest';

import {PaymentsController} from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  beforeEach(async () => {
    const {unit} = TestBed.create(PaymentsController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
