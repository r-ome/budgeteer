import { query } from './connect';
import fs from 'fs';

export const seedDatabase = (): void => {
  const queries = fs.readFileSync(__dirname + '/seed.sql').toString();
  query(queries, (err) => {
    if (err) {
      console.error({
        code: err.code,
        message: err.sqlMessage
      });
      return;
    }
  });
};
