import express from 'express';
import userRouter from './user';
import stripeRouter from './stripe';
import { countries } from './countries';

const app = express();

app.use('/stripe', stripeRouter);
app.use(express.json());
app.use('/user', userRouter);

app.get('/countries', (req, res) => {
  res.json(countries);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;