import { verify } from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
} 