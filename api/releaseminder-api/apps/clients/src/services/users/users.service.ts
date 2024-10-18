import {RabbitMQResultDto} from '@app/micro/micro/rabbitmq/dto/common/RabbitMQResult.dto';
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import {AuthUser} from '@supabase/supabase-js';
import {eq} from 'drizzle-orm';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import {v4} from 'uuid';

import * as schema from '../../db/schema';
import {users} from '../../db/schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('CLIENTS_DATABASE_CONNECTION')
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    const userCreateResult = await this.database
      .insert(schema.users)
      .values({
        email: v4(),
        supabaseUserId: v4(),
      })
      .returning();

    const newUserId = userCreateResult[0].id;

    const organizationCreateResult = await this.database
      .insert(schema.organizations)
      .values({
        name: 'Test',
        createdBy: newUserId,
      })
      .returning();

    const newOrganizationId = organizationCreateResult[0].id;

    const subdomainCreateResult = await this.database
      .insert(schema.subdomains)
      .values({
        createdBy: newUserId,
        organization: newOrganizationId,
        subdomain: `jdevel${v4()}`,
      })
      .returning();

    this.logger.log('Inserted CLIENTS test data');

    this.logger.log(subdomainCreateResult[0]);
  }

  async getUserBySupabaseId(
    requestingUser: AuthUser,
    supabaseId: string,
  ): Promise<RabbitMQResultDto<unknown>> {
    this.logger.log(`getUserBySupabaseId: ${requestingUser.id} ${supabaseId}`);
    if (requestingUser.id === supabaseId) {
      return {
        status: HttpStatus.OK,
        body: await this.database
          .select()
          .from(schema.users)
          .where(eq(users.supabaseUserId, supabaseId)),
      };
    }
    return {status: HttpStatus.FORBIDDEN, body: null};
  }
}
