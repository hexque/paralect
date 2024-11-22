import express from 'express';
import mongoose from 'mongoose';

import config from './config';

const { port, mongoConnectionUrl } = config;
const app = express();

app.use(express.json());

mongoose
  .connect(mongoConnectionUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
