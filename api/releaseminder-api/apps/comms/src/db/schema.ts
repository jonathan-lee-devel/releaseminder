import {pgTable, uuid} from 'drizzle-orm/pg-core';

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey(),
});

export const applicationMessages = pgTable('application_messages', {
  id: uuid('id').primaryKey(),
});
