import { Router } from "express";
import { Stripe } from "stripe";

const router = Router();

// create payment intent if and only if the reference code exists in the database
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

router.post('/webhook', async (req, res) => {
  const { event } = req.body;
  console.log(event);
  res.json({ message: 'Webhook received' });
});

export default router;