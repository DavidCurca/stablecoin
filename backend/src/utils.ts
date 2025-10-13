import crypto from 'crypto';

export const generateSHA256 = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const vaidEmail = (email: string) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
