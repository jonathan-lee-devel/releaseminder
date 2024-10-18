import {Inject, Injectable} from '@nestjs/common';
import {eq} from 'drizzle-orm';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';

import * as schema from '../../../db/schema';

@Injectable()
export class UsersRepositoryService {
  constructor(
    @Inject('CLIENTS_DATABASE_CONNECTION')
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async insertUser(email: string, supabaseUserId: string) {
    return this.database
      .insert(schema.users)
      .values({
        email,
        supabaseUserId,
      })
      .returning();
  }

  async getUserByEmail(email: string) {
    return this.database
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
  }
}
