import { Account } from '../models';

export const getAccountPartitions = async (accountId) => {
  try {
    const account = await Account.find(accountId);
    const partitions = account.getPartitions();
    return partitions;
  } catch (e) {
    console.error(e);
  }
};