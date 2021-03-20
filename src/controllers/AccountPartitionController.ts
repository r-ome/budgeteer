import { Account, AccountPartition } from '../models';

export const getAccountPartitions = async (accountId) => {
  try {
    const account = await Account.find(accountId);
    const partitions = account.getPartitions();
    return partitions;
  } catch (e) {
    console.error(e);
  }
};

export const createAccountPartition = async (accountId: number) => {
  try {
    const account = await Account.find(accountId);
    return await account.createPartition();
  } catch (e) {
    console.error(e);
  }
};

export const updateAccountPartition = async (partitionId: number, body) => {
  try {
    const partition = await AccountPartition.find(partitionId);
    partition.attributes.name = body.name;
    partition.attributes.percentage = body.percentage;
    await partition.save();
    return partition.attributes;
  } catch (e) {
    console.error(e);
  }
};

export const deleteAccountPartition = async (partitionId: number) => {
  try {
    const partition = await AccountPartition.find(partitionId);
    return await partition.delete();
  } catch (e) {
    console.error(e);
  }
};