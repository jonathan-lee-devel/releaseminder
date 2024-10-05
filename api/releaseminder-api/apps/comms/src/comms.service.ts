import {Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import {v4 as uuidv4} from 'uuid';

import * as schema from './db/schema';

@Injectable()
export class CommsService implements OnModuleInit {
  constructor(
    @Inject('COMMS_DATABASE_CONNECTION')
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    await this.database.insert(schema.notifications).values({
      id: uuidv4(),
    });
    await this.database.insert(schema.applicationMessages).values({
      id: uuidv4(),
    });
    this.logger.log('Inserted test data');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
