import Model from './model';
import Database from '../database/Database';
import { User, AccountPartition } from '.';

interface Attributes {
  account_id: number;
  user_id: number;
  name: string;
  account_number: string;
  balance: number;
}

export default class Account extends Model {
    table: string;
    primaryKey: string;
    attributes: Attributes;
    accountId: number;

    constructor(attributes: Attributes) {
      super('accounts', 'account_id', attributes);
      this.table = 'accounts';
      this.primaryKey = 'account_id';
      this.attributes = attributes;
      this.accountId = attributes.account_id;
    }

    static async all(): Promise<[]> {
      try {
        return await Database.poolQuery('SELECT * FROM accounts;');
      } catch (e) {
        console.error(e);
      }
    }

    static async find(userId: number): Promise<Account> {
      const rows = await Database.poolQuery(
        'SELECT * FROM accounts WHERE account_id = ?',
        userId
      );
      return new Account(rows[0]);
    }

    async create(): Promise<boolean> {
      try {
        await Database.poolQuery(
          `INSERT INTO ${this.table} VALUES (?)`,
          [Object.values(this.attributes)]
        );
        return true;
      } catch (e) {
        console.error({ create_error : e });
        return e;
      }
    }

    async createPartition(): Promise<any> {
      const partition = new AccountPartition({ 
        account_partition_id: null,
        account_id: this.attributes.account_id,
        name: 'necessities12312312',
        percentage: 50.0
      });
      console.log('hello world');
      await partition.create();
    }

    async getPartitions(): Promise<[]> {
      try {
        const rows = await Database.poolQuery(
          'SELECT * FROM account_partitions WHERE account_id = ?',
          this.accountId
        );
        return rows;
      } catch(e) {
        console.error(e);
      }
    }
}