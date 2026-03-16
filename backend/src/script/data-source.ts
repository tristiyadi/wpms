/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import databaseConfig from '../config/database.config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
(dotenv as any).config();

const config = (databaseConfig as any)() as DataSourceOptions;

export const AppDataSource = new DataSource(config);
