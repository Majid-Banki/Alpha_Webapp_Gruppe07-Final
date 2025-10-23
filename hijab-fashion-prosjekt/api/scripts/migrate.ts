import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from '../src/lib/drizzle';

// Denne funksjonen vil kjøre alle u-anvendte migrasjoner fra 'drizzle'-mappen
async function runMigrations() {
  console.log('--- APPLYING DATABASE MIGRATIONS ---');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('--- MIGRATIONS APPLIED SUCCESSFULLY ---');
  // Viktig for å la scriptet avslutte
  process.exit(0);
}

runMigrations().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});