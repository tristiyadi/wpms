/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function resetDb() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'wellness_db',
  });

  try {
    console.log('--- Resetting Database ---');

    // Drop tables if they exist
    // Based on the current project, only wellness_packages is utilized.
    const tables = [
      'wellness_packages',
      'migrations', // Optional: if using TypeORM migrations as well
    ];

    for (const table of tables) {
      await pool.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
    }
    console.log('✅ Dropped existing tables.');

    // Ensure migrations directory exists
    const migrationsDir = path.resolve(__dirname, '../../database/migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log(
        'ℹ️ No migrations directory found. Skipping schema recreation.',
      );
      return;
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      console.log(`🚀 Running schema: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await pool.query(sql);
      console.log(`✔️ Success: ${file}`);
    }

    console.log('🎉 Database reset and recreated successfully');
  } catch (err) {
    console.error('❌ Error resetting database:', err);
  } finally {
    await pool.end();
  }
}

resetDb().catch((err) => {
  console.error(err);
  process.exit(1);
});
