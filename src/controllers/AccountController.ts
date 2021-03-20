import { Account } from '../models';

export const getAll = async (): Promise<[]> => {
  try {
    return await Account.all();
  } catch(e) {
    console.error(e);
  }
};

export const createAccount = async (userId: number, body): Promise<boolean> => {
  try {
    const attributes = {
      account_id: null,
      user_id: userId,
      name: body.name,
      account_number: body.account_number,
      balance: body.balance,
    };
    const account = new Account(attributes);
    return await account.create();
  } catch (e) {
    console.error(e);
  }
};

export const updateAccount = async (accountId: number, body): Promise<any> => {
  try {
    const account = await Account.find(accountId);
    account.attributes.name = body.name;
    await account.save();
    return account.attributes;
  } catch (e) {
    console.error(e);
  }
};

export const deleteAccount = async (accountId: number): Promise<any> => {
  try {
    const account = await Account.find(accountId);
    return await account.delete();
  } catch (e) {
    console.error(e);
  }
};

export const getPartitions = async (accountId: number): Promise<any> => {
  try {
    const account = await Account.find(accountId);
    const partitions = account.getPartitions();
    return partitions;
  } catch(e) {
    console.error(e);
    return;
  }
};