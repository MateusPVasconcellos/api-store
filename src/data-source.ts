import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  subscribers: [],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
} as DataSourceOptions);
