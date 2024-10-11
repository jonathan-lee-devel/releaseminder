import {TestBed} from '@automock/jest';

import {RabbitmqService} from './rabbitmq.service';

describe('RabbitmqService', () => {
  let service: RabbitmqService;

  beforeEach(async () => {
    const {unit} = TestBed.create(RabbitmqService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
