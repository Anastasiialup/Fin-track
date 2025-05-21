import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'config/config';

const sql = neon(config.env.databaseUrl!);
export const db = drizzle({ client: sql });
