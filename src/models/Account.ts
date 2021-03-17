import Model from './model';
import Database from '../database/Database';

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
        const connection = await Database.getConnection();
        connection.beginTransaction((err) => {
          if (err) { throw err; }
          connection.query(
            `INSERT INTO ${this.table} VALUES (?)`,
            [Object.values(this.attributes)],
            (err, result) => {
              if (err) {
                console.log({ err });
                return connection.rollback(() => { throw err; });
              }
              connection.query(
                'INSERT INTO account_partitions (account_id, name, percentage) VALUES (?)',
                [
                  [result.insertId, 'necessitities', 50.0],
                  [result.insertId, 'play', 10.0]
                ],
                (err) => {
                  if (err) {
                    console.error(err);
                  }

                  connection.commit(err => {
                    if (err) {
                      return connection.rollback(() => {
                        throw err;
                      });
                    }
                    console.log('success!');
                  });
                }
              );
            });
        });
        return true;
      } catch (e) {
        console.error({ create_error : e });
        return e;
      }
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