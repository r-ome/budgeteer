import Model from './model';
import Database from '../database/Database';

interface Attributes {
  user_id: number,
  username: string;
}

export default class User extends Model {
    table: string;
    primaryKey: string;
    attributes: Attributes;
    userId: number;

    constructor(attributes: Attributes) {
      super('users', 'user_id', attributes);
      this.table = 'users';
      this.primaryKey = 'user_id';
      this.attributes = attributes;
      this.userId = attributes.user_id;
    }

    static async all(): Promise<[]> {
      try {
        return await Database.poolQuery('SELECT * FROM users');
      } catch (e) {
        console.error(e);
      }
    }

    static async find(userId: number): Promise<any> {
      const rows = await Database.poolQuery(
        'SELECT * FROM users WHERE user_id = ?',
        userId
      );
      return new User(rows[0]);
    }

    async getAccounts(userId: number): Promise<[]> {
      try {
        return Database.poolQuery(
          'SELECT * FROM accounts WHERE user_id = ?',
          userId
        );
      } catch (e) {
        console.error(e);
      }
    }

    static async getPartitions(userId: number): Promise<[]> {
      try {
        return Database.poolQuery(
          `
            SELECT
              ap.*
            FROM account_partitions ap
            INNER JOIN accounts a ON a.account_id = ap.account_id
            WHERE a.user_id = ?
          `,
          userId
        );

      } catch (e) {
        console.error(e);
      }
    }
}