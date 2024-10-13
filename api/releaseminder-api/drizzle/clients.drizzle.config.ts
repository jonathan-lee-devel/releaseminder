import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  schema: './apps/clients/src/db/schema.ts',
  out: './apps/clients/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.CLIENTS_DATABASE_URL,
  },
});
