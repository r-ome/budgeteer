import Database from '../database/Database';

class Model extends Database{
  table: string;
  primaryKey: string;
  attributes: any;

  constructor(table: string, primaryKey: string, attributes) {
    super();
    this.table = table;
    this.primaryKey = primaryKey;
    this.attributes = attributes;
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

export default Model;