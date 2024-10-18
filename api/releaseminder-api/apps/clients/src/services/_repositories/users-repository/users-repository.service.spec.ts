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

import {UsersRepositoryService} from './users-repository.service';
import {ClientsModule} from '../../../clients.module';
import * as schema from '../../../db/schema';

describe('UsersRepositoryService', () => {
  jest.setTimeout(60_000);

  let service: UsersRepositoryService;
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
      providers: [UsersRepositoryService],
    }).compile();

    service = module.get<UsersRepositoryService>(UsersRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert and retrieve data', async () => {
    const email = faker.internet.email();
    const supabaseUserId = faker.string.uuid();

    await service.insertUser(email, supabaseUserId);
    const result = await service.getUserByEmail(email);

    expect(result?.[0].email).toStrictEqual(email);
    expect(result?.[0].supabaseUserId).toStrictEqual(supabaseUserId);
  });
});
