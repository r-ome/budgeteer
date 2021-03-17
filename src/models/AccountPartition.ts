import Model from './model';
import Database from '../database/Database';

interface Attributes {
  account_partition_id: number,
  account_id: number,
  name: string;
  percentage: number;
}

export default class AccountPartition extends Model {
    table: string;
    primaryKey: string;
    attributes: Attributes;
    typeId: number;

    constructor(attributes: Attributes) {
      super('account_partitions', 'account_partition_id', attributes);
      this.table = 'account_partitions';
      this.primaryKey = 'account_partition_id';
      this.attributes = attributes;
      this.typeId = attributes.account_partition_id;
    }

    static async all(): Promise<any> {
      try {
        return await Database.poolQuery('SELECT * FROM account_partitions;');
      } catch (e) {
        console.error(e);
      }
    }

    static async find(userId: number): Promise<any> {
      const rows = await Database.poolQuery(
        'SELECT * FROM account_partitions WHERE account_partition_id = ?',
        userId
      );
      return new AccountPartition(rows[0]);
    }
}