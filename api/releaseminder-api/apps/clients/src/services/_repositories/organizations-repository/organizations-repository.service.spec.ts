import {TestBed} from '@automock/jest';

import {OrganizationsRepositoryService} from './organizations-repository.service';

describe('OrganizationsRepositoryService', () => {
  let service: OrganizationsRepositoryService;

  beforeEach(async () => {
    const {unit} = TestBed.create(OrganizationsRepositoryService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
