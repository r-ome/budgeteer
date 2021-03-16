import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

export const query = (query, callback) =>
    pool.query(query, (err, rows, fields) => {
        callback(err, rows, fields);
    });