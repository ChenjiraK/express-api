import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; // Verify token
      (req as any).user = decoded // Attach user data to request
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
};
