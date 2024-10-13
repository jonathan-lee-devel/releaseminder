import * as t from 'drizzle-orm/pg-core';
import {pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  supabaseUserId: uuid('supabase_user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: t
    .uuid('created_by')
    .notNull()
    .references(() => users.id),
});

export const organizationRoles = pgTable('organization_roles', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  organization: t
    .uuid('parent_organization')
    .notNull()
    .references(() => organizations.id),
  createdBy: t
    .uuid('created_by')
    .notNull()
    .references(() => users.id),
});

export const subdomains = pgTable('subdomains', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  subdomain: text('subdomain').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  organization: t
    .uuid('parent_organization')
    .notNull()
    .references(() => organizations.id),
  createdBy: t
    .uuid('created_by')
    .notNull()
    .references(() => users.id),
});

export const customHostnames = pgTable('custom_hostnames', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  hostname: text('hostname').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  organization: t
    .uuid('parent_organization')
    .references(() => organizations.id),
  createdBy: t
    .uuid('created_by')
    .notNull()
    .references(() => users.id),
});
