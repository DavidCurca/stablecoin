import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({path: '../.env', quiet: true});

export const db = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
