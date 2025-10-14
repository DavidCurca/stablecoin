import { Router } from "express";
import dotenv from "dotenv";
import loadStripe from "stripe";
import express from "express";
import { jwtMiddleware } from "./jwt";
import { db } from "./db";
dotenv.config({ path: "../.env", quiet: true });

const stripe = new loadStripe(process.env.STRIPE_SECRET_TESTMODE as string);
const router = Router();

// create payment intent if and only if the reference code exists in the database
router.post('/create-payment-intent', express.json(), async (req, res) => {
  try {
    const { amount, reference_code } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'ron',
      automatic_payment_methods: { enabled: true },
      metadata: {
        reference_code: req.body.reference_code,
      },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// create stripe connect account
router.post('/create-stripe-connect-account', express.json(), async (req, res) => {
  const jwt = req.headers.authorization?.split(' ')[1];
  const { user } = req.body;
  const username = (await db.query('SELECT author FROM sessions WHERE jwt = $1', [jwt])).rows[0].author;
  if(username !== user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const email = (await db.query('SELECT email FROM users WHERE username = $1', [username])).rows[0].email;

  const stripeConnectAccount = await stripe.accounts.create({
    type: 'express',
    country: 'RO',
    email: email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
  const accountLink = await stripe.accountLinks.create({
    account: stripeConnectAccount.id,
    refresh_url: `${process.env.FRONTEND_URL}/stripe/refresh-stripe-connect-account`,
    return_url: `${process.env.FRONTEND_URL}/stripe/refresh-stripe-connect-account`,
    type: 'account_onboarding',
  });
  res.json({ accountLink: accountLink.url });
});

// webhook for stripe
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig: string = req.headers['stripe-signature'] as string;
  const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET as string;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if(event.type === 'charge.succeeded') {
    const reference_code = event.data.object.metadata['reference_code'];
    console.log(`Charge succeeded for reference code: ${reference_code}`);
    // TODO: send transactions on blockchain (get address and amount from database)
  }
  res.json({ message: 'Webhook received' });
});

export default router;