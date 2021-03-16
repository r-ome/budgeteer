import Model from './model';
import Database from '../database/Database';

interface UserAttributes {
  user_id: number,
  username: string;
}

export default class User extends Model {
    table: string;
    primaryKey: string;
    attributes: UserAttributes;
    userId: number;

    constructor(attributes: UserAttributes) {
      super('users', 'user_id');
      this.table = 'users';
      this.primaryKey = 'user_id';
      this.attributes = attributes;
      this.userId = attributes.user_id;
    }

    static async all(): Promise<any> {
      return await Database.poolQuery('SELECT * FROM users;');
    }

    static async find(userId: number): Promise<any> {
      const rows = await Database.poolQuery(
        'SELECT * FROM users WHERE user_id = ?',
        userId
      );
      return new User(rows[0]);
    }

    async create(): Promise<boolean> {
      try {
        await Database.poolQuery(
          `INSERT INTO ${this.table} values (?)`,
          [Object.values(this.attributes)]
        );
        return true;
      } catch (e) {
        console.error({ create_error : e });
        return false;
      }
    }

    async save(): Promise<boolean> {
      try {
        const { user_id: userId, ...rest } = this.attributes;
        await Database.poolQuery(
          `UPDATE ${this.table} SET ? WHERE ${this.primaryKey} = ?`,
          [rest, userId]
        );
        return true;
      } catch (e) {
        console.error(e);
      }
    }
}