import express from 'express';
import { create, get, getAll, update } from '../controllers/UserController';

const router = express.Router();
router.get('/', async (req, res) => {
  const users = await getAll();
  res.send(users);
});

router.get('/:user_id', async (req, res) => {
  try {
    const user = await get(parseInt(req.params.user_id));
    res.send({ user });
  } catch (e) {
    res.send({ e });
  }
});

router.post('/', async (req, res)=> {
  try {
    create(req.body.username);
    res.send(`created user ${req.body.username}`);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await update(parseInt(req.params.id), req.body.username);
    res.send('update user here');
  } catch (e) {
    console.error(e);
  }
});

// not yet implemented
// router.delete('/post', function (req, res) {
//     res.send('create user here');
// });

export default router;