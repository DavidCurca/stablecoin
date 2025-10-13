import { loadStripe } from '@stripe/stripe-js';
import { Router } from 'express';

const router = Router();
const stripe = loadStripe(process.env.STRIPE_PUBLIC as string);

router.post('/', (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;