import {Inject, Injectable} from '@nestjs/common';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';

import * as schema from '../../../db/schema';

@Injectable()
export class AddressesRepositoryService {
  constructor(
    @Inject('CLIENTS_DATABASE_CONNECTION')
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async insertSubdomain(
    organization: string,
    subdomain: string,
    createdBy: string,
  ) {
    return this.database
      .insert(schema.subdomains)
      .values({
        organization,
        subdomain,
        createdBy,
      })
      .returning();
  }
}
