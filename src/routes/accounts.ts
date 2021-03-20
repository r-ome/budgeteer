import express from 'express';
import {
  createAccount,
  updateAccount,
  getAll,
  getPartitions
} from '../controllers/AccountController';
import { Account, AccountPartition } from '../models';

const router = express.Router();
// get all accounts
router.get('/', async (req, res) => {
  const accounts = await getAll();
  res.send(accounts);
});

// get all partitions by account_id
router.get('/:account_id/partitions', async (req, res) => {
  try {
    const accountId = parseInt(req.params.account_id);
    const partitions = await getPartitions(accountId);
    res.send({ partitions });
  } catch (e) {
    res.send({ e });
  }
});

// create a partition by account_id
router.post('/:account_id/partitions', async (req, res) => {
  try {
    const partition = new AccountPartition({
      account_id: parseInt(req.params.account_id),
      name: req.body.name,
      percentage: req.body.percentage
    });
    const hello = await partition.create();
    // const hello = await createAccountPartition(parseInt(req.params.account_id));
    res.send({ hello });
  } catch (e) {
    console.error(e);
  }
});


// get all accounts by user_id
router.post('/:user_id', async (req, res)=> {
  try {
    await createAccount(parseInt(req.params.user_id), {
      name: req.body.name,
      account_number: req.body.account_number,
      balance: parseFloat(req.body.balance),
    });

    res.send('hello world!');
    // res.send(`created account ${req.body.username}`);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await updateAccount(parseInt(req.params.id), { name: req.body.name });
    res.send({ result });
  } catch (e) {
    console.error(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const account = await Account.find(parseInt(req.params.id));
    const result = await account.delete();
    res.send({ result });
  } catch (e) {
    console.error(e);
  }
});

export default router;