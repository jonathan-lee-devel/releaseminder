import {Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import {v4} from 'uuid';

import * as schema from '../../db/schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('CLIENTS_DATABASE_CONNECTION')
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    const result = await this.database
      .insert(schema.users)
      .values({
        supabaseUserId: v4(),
      })
      .returning();

    const newUserId = result[0].id;

    await this.database.insert(schema.organizations).values({
      createdBy: newUserId,
    });

    this.logger.log('Inserted CLIENTS test data');
  }
}
