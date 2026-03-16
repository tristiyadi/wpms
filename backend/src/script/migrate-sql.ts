/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
(dotenv as any).config();

function log(message: string) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}`;
  console.log(formattedMessage);
  try {
    const logPath = path.join(__dirname, '../../migration.log');
    fs.appendFileSync(logPath, formattedMessage + '\n');
  } catch (e) {
    // ignore
  }
}

async function migrate() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'wellness_db',
  }) as any;

  try {
    log('🚀 Starting SQL Migration...');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const client = await pool.connect();
    log('✅ Database connected.');

    const migrationsDir = path.join(__dirname, '../../database/migrations');

    if (!fs.existsSync(migrationsDir)) {
      log('📁 Creating migrations directory...');
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      log('ℹ️ No .sql files found. Skipping.');
    }

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      log(`📄 Executing: ${file}`);
      const sql = fs.readFileSync(filePath, 'utf8');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.query(sql);
      log(`✔️ Finished: ${file}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    client.release();
    log('🎉 All SQL migrations completed successfully.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await pool.end();
    process.exit(0);
  } catch (err) {
    log('❌ Migration failed: ' + err);
    process.exit(1);
  }
}

migrate().catch((err) => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
