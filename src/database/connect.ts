import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

export const query = (query: string, values = null, callback = null): void =>
  pool.query(query, values, (err, rows, fields) => {
    callback(err, rows, fields);
  });