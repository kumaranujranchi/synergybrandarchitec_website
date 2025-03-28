import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { storage } from './storage';
import { User } from '@shared/schema';

// JWT secret key (in production, use environment variable)
const JWT_SECRET = 'synergy_brand_architect_secret_key';
const TOKEN_EXPIRY = '24h';

// Create JWT token
export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

// Authentication middleware
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Get token from cookies or Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      id: number;
      email: string;
      role: string;
      permissions: string[];
    };
    
    // Add user info to request
    req.user = decoded;
    
    // Log audit if needed
    if (req.path !== '/api/auth/check') {
      storage.logAudit({
        userId: decoded.id,
        action: `Accessed ${req.method} ${req.path}`,
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: null
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based authorization middleware
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
    }
  };
};

// Permission-based authorization middleware
export const requirePermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Admin always has all permissions
    if (req.user.role === 'admin' || req.user.permissions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).json({ message: `Access forbidden: Missing ${requiredPermission} permission` });
    }
  };
};

// Type augmentation for Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
        permissions: string[];
      };
    }
  }
}