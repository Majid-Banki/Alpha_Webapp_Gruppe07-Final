import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema'; // Importerer hele skjemaet vårt

// Kobler til databasefilen. Den opprettes hvis den ikke finnes.
// 'process.env.DATABASE_URL' vil bli satt av RedwoodJS i utvikling,
// eller vi faller tilbake til 'dev.db'
const sqlite = new Database(process.env.DATABASE_URL || 'dev.db');

// Initialiserer Drizzle-klienten med databasetilkoblingen og skjemaet vårt
export const db = drizzle(sqlite, { schema });