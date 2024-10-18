import {TestBed} from '@automock/jest';

import {UsersRepositoryService} from './users-repository.service';

describe('UsersRepositoryService', () => {
  let service: UsersRepositoryService;

  beforeEach(async () => {
    const {unit} = TestBed.create(UsersRepositoryService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
