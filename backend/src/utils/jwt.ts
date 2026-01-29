import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateAccessToken = (userId: string, email: string, role: string): string => {
  return jwt.sign(
    { id: userId, email, role },
    config.jwt.secret,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    config.jwt.refreshSecret,
    { expiresIn: '7d' }
  );
};

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret);
  } catch {
    return null;
  }
};
