import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const currentEnvironment = process.env.VERCEL_TARGET_ENV || 'development';

config({ path: currentEnvironment === 'production' ? '.env.production' : '.env.local' });

export default defineConfig({
  schema: './database/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
