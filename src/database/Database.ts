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
  static getConnection() {
    return mysql.createConnection(config);
  }
  // static connectionQuery = async (query, values = null, callback = null) => {
  //   const connection = mysql.createConnection(config);
  //   return new Promise((resolve, reject) => {
  //     connection
  //       .query(query, values, (err, rows) => {
  //         if (err) {
  //           reject(err);
  //           return;
  //         }
  //         resolve(rows);
  //       });
  //   });
  // }
  // static beginTransaction(query, values = null, callback) {
  //   const connection = mysql.createConnection(config);
  //   connection.beginTransaction(function(err) {
  //     if (err) { throw err; }
  //     connection.query('query', values, function (error, results, fields) {
  //       if (error) {
  //         return connection.rollback(function() {
  //           throw error;
  //         });
  //       }
    
  //       var log = 'Post ' + results.insertId + ' added';
    
  //       connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
  //         if (error) {
  //           return connection.rollback(function() {
  //             throw error;
  //           });
  //         }
  //         connection.commit(function(err) {
  //           if (err) {
  //             return connection.rollback(function() {
  //               throw err;
  //             });
  //           }
  //           console.log('success!');
  //         });
  //       });
  //     });
  //   });
  // }

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