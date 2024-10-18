import {TestBed} from '@automock/jest';

import {AddressesRepositoryService} from './addresses-repository.service';

describe('AddressesRepositoryService', () => {
  let service: AddressesRepositoryService;

  beforeEach(async () => {
    const {unit} = TestBed.create(AddressesRepositoryService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
