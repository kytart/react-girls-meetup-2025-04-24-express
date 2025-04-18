import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './tokenAuth';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        nickname: string;
      };
    }
  }
}

/**
 * Middleware to authenticate requests using JWT token from cookies
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.Authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const userData = verifyToken(token);
  if (!userData) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  // Attach user data to request
  req.user = userData;
  next();
}
