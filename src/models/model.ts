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
      const { [this.primaryKey]: id, ...rest } = this.attributes;
      await Database.poolQuery(
        `UPDATE ${this.table} SET ? WHERE ${this.primaryKey} = ?`,
        [rest, id]
      );
      return true;
    } catch (e) {
      console.error(e);
    }
  }

  async delete(): Promise<boolean> {
    try {
      await Database.poolQuery(
        `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`,
        this.attributes[this.primaryKey]
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default Model;