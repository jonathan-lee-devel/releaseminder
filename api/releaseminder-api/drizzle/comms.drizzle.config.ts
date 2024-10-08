import {defineConfig} from 'drizzle-kit';

export default defineConfig({
  schema: './apps/comms/src/db/schema.ts',
  out: './apps/comms/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.COMMS_DATABASE_URL,
  },
});
