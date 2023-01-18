import { Pool } from 'pg';

export const pool = new Pool({
    "connectionString": "postgres://postgres:12060501@localhost:5432/crud"
});