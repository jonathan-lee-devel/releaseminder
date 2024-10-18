import {DbModule} from '@app/db/db';
import {faker} from '@faker-js/faker/locale/en_US';
import {Logger} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {drizzle} from 'drizzle-orm/node-postgres';
import {migrate} from 'drizzle-orm/node-postgres/migrator';
import {Client} from 'pg';

import {AddressesRepositoryService} from './addresses-repository.service';
import {ClientsModule} from '../../../clients.module';
import * as schema from '../../../db/schema';
import {OrganizationsRepositoryService} from '../organizations-repository/organizations-repository.service';
import {UsersRepositoryService} from '../users-repository/users-repository.service';

describe('AddressesRepositoryService', () => {
  jest.setTimeout(60_000);

  let service: AddressesRepositoryService;
  let usersRepositoryService: UsersRepositoryService;
  let organizationsRepositoryService: OrganizationsRepositoryService;
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: Client;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new Client({
      connectionString: postgresContainer.getConnectionUri(),
    });
    await postgresClient.connect();

    const db = drizzle(postgresClient, {schema});
    await migrate(db, {
      migrationsFolder: './apps/clients/drizzle',
    });
  });

  afterAll(async () => {
    await postgresClient.end();
    await postgresContainer.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.register({
          logger: new Logger(ClientsModule.name),
          serviceName: 'CLIENTS',
          schema,
          connectionUrl: postgresContainer.getConnectionUri(),
        }),
      ],
      providers: [
        AddressesRepositoryService,
        OrganizationsRepositoryService,
        UsersRepositoryService,
      ],
    }).compile();

    service = module.get<AddressesRepositoryService>(
      AddressesRepositoryService,
    );
    organizationsRepositoryService = module.get<OrganizationsRepositoryService>(
      OrganizationsRepositoryService,
    );
    usersRepositoryService = module.get<UsersRepositoryService>(
      UsersRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert data with no error', async () => {
    const userInsertResult = await usersRepositoryService.insertUser(
      faker.internet.email(),
      faker.string.uuid(),
    );

    const name = faker.internet.domainName();

    const organizationInsertResult =
      await organizationsRepositoryService.insertOrganization(
        name,
        userInsertResult[0].id,
      );

    const result = await service.insertSubdomain(
      organizationInsertResult[0].id,
      name,
      userInsertResult[0].id,
    );

    expect(organizationInsertResult.length).toStrictEqual(1);
    expect(result[0].subdomain).toStrictEqual(name);
    expect(result[0].organization).toStrictEqual(
      organizationInsertResult[0].id,
    );
    expect(result[0].createdBy).toStrictEqual(userInsertResult[0].id);
  });
});
