import { Router } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwtMiddleware } from './jwt';
import { db } from './db';
import { countries } from './countries';
import { generateSHA256, vaidEmail } from './utils';

const router = Router();

router.get('/check', jwtMiddleware, async (req, res) => {
  const jwt = req.headers.authorization?.split(' ')[1];
  const username = await db.query('SELECT author FROM sessions WHERE jwt = $1', [jwt]);
  res.json({ username: username.rows[0].author });
});

// validates user input and creates user, retruning the new session created
router.post('/create', async (req, res) => {
  const { username, email, password, phone, country, firstname, lastname } = req.body;
  if(!username || !email || !password || !phone || !country || !firstname || !lastname){
    return res.status(400).json({ message: 'Missing required fields' }); 
  }
  if(!countries.some(c => c.code === country)){ return res.status(400).json({ message: 'Invalid country' }); }
  if(!vaidEmail(email)){ return res.status(400).json({ message: 'Invalid email' }); }

  const hashedPassword = generateSHA256(`${process.env.PASSWORD_SALT}:${password}`);
  const user = await db.query(
    'INSERT INTO users (username, email, password, phone, country, firstname, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
    [username, email, hashedPassword, phone, country, firstname, lastname]
  );
  
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
  const session = await db.query('INSERT INTO sessions (author, jwt) VALUES ($1, $2) RETURNING *', [username, token]);
  res.json({ session: session.rows[0] });
});

// validates user input and logs in user, retruning the new session created
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({ message: 'Missing required fields' }); 
  }
  const hashedPassword = generateSHA256(`${process.env.PASSWORD_SALT}:${password}`);
  const user = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, hashedPassword]);
  if(user.rows.length === 0){
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
  const session = await db.query('INSERT INTO sessions (author, jwt) VALUES ($1, $2) RETURNING *', [username, token]);
  res.json({ session: session.rows[0] });
});

router.get('/reciepts', jwtMiddleware, async (req, res) => {
  const jwt = req.headers.authorization?.split(' ')[1];
  const username = await db.query('SELECT author FROM sessions WHERE jwt = $1', [jwt]);
  const reciepts = await db.query('SELECT * FROM reciepts WHERE author = $1', [username.rows[0].author]);
  res.json({ reciepts: reciepts.rows });
});

export default router;