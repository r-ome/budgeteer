import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
};


class Database {
  table: string;
  primaryKey: string;

  constructor(table: string, primaryKey: string) {
    this.table = table;
    this.primaryKey = primaryKey; 
  }

  static poolQuery(query: string, values = null): Promise<any> {
    return new Promise((resolve, reject) => {
      mysql
        .createPool(config)
        .query(query, values, (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows);
        });
    });
  }

  static async getAttributes(tableName: string): Promise<[]> {
    return await this.poolQuery(
      `
        SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS
        WHERE table_schema = ? and table_name = ?
      `,
      [process.env.DB_NAME, tableName]
    );
  }

  // startConnection(): void {
  //   this.connection.connect(err => {
  //     if (err) { throw err; }
  //     console.log('connected to database');
  //   });
  // }

  // endConnection(): void {
  //   this.connection.end();
  // }

  // connectionQuery(query: string, values = null, callback = null): void {
  //   this.connection.query(query, values, (err, rows, fields) => {
  //     callback(err, rows, fields);
  //   });
  // }
}

export default Database;