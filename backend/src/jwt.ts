import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';
dotenv.config({path: '../.env', quiet: true});

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  next();
};