import express from 'express';
import {
  userRoutes,
  accountRoutes,
  accountPartitionRoutes
} from './routes';
import bodyParser from 'body-parser';

import { seedDatabase } from './database/seed';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/account-partitions', accountPartitionRoutes);

app.get('/', (req, res) => {
  seedDatabase();
  res.send('hello world!');
});

app.listen(3000, () => console.log('server running!'));