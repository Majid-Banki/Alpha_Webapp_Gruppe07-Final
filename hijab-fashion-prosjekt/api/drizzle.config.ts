import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/schema.ts',
  out: './drizzle',
  dialect: 'sqlite', // <--- ENDRINGEN ER HER! Fra 'driver' til 'dialect'
  dbCredentials: {
    url: process.env.DATABASE_URL || './dev.db',
  },
} satisfies Config;