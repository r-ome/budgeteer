import express from 'express';
import {
  deleteAccountPartition,
  updateAccountPartition
} from '../controllers/AccountPartitionController';

const router = express.Router();

// create partition by account_id
router.delete('/:account_partition_id', async (req, res) => {
  try {
    const result = await deleteAccountPartition(parseInt(req.params.account_partition_id));
    res.send({ result });
  } catch (e) {
    console.error(e);
  }
});

// update
router.put('/:account_partition_id', async (req, res) => {
  try {
    const partition = await updateAccountPartition(
      parseInt(req.params.account_partition_id),
      {
        name: req.body.name,
        percentage: parseFloat(req.body.percentage)
      });
    // partition;
    res.send({ partition });
  } catch (e) {
    console.error(e);
  }
});

// not yet implemented
// router.delete('/post', function (req, res) {
//     res.send('create user here');
// });

export default router;