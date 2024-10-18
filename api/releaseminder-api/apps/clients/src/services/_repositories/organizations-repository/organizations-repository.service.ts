import {Inject, Injectable} from '@nestjs/common';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';

import * as schema from '../../../db/schema';

@Injectable()
export class OrganizationsRepositoryService {
  constructor(
    @Inject('CLIENTS_DATABASE_CONNECTION')
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async insertOrganization(name: string, createdBy: string) {
    return this.database
      .insert(schema.organizations)
      .values({
        name,
        createdBy,
      })
      .returning();
  }
}
