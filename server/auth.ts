import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { storage } from './storage';
import { User, RegisterData } from '@shared/schema';

// JWT secret key (in production, use environment variable)
const JWT_SECRET = 'synergy_brand_architect_secret_key';
const TOKEN_EXPIRY = '24h';
const VERIFICATION_EXPIRY = '24h';
const RESET_PASSWORD_EXPIRY = '1h';

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

// Utility functions for authentication

// Hash password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password with hash
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Generate verification token
export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate OTP code for verification (6 digits)
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Mock email sending function (in production, use a real email service)
export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  console.log(`Sending verification email to ${email} with token: ${token}`);
  // In production, implement actual email sending logic here
};

// Mock OTP sending function (in production, use a real SMS or email service)
export const sendOTP = async (email: string, otp: string): Promise<void> => {
  console.log(`Sending OTP to ${email}: ${otp}`);
  // In production, implement actual SMS or email sending logic here
};

// Register a new user
export const registerUser = async (userData: RegisterData): Promise<User> => {
  // Check if user already exists
  const existingUser = await storage.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const hashedPassword = await hashPassword(userData.password);
  
  // Generate verification token
  const verificationToken = generateVerificationToken();
  
  // Create user with hashed password and verification token
  const user = await storage.createUser({
    ...userData,
    password: hashedPassword,
    verificationToken,
    isVerified: false,
  });
  
  // Send verification email
  await sendVerificationEmail(userData.email, verificationToken);
  
  return user;
};

// Verify user email
export const verifyEmail = async (token: string): Promise<boolean> => {
  // Find user by verification token
  const user = await storage.getUserByVerificationToken(token);
  if (!user) {
    return false;
  }
  
  // Update user verification status
  await storage.updateUser(user.id, {
    isVerified: true,
    verificationToken: null,
  });
  
  return true;
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<boolean> => {
  // Find user by email
  const user = await storage.getUserByEmail(email);
  if (!user) {
    return false;
  }
  
  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date(Date.now() + 3600000); // 1 hour
  
  // Update user with reset token
  await storage.updateUser(user.id, {
    resetPasswordToken: resetToken,
    resetPasswordExpires: resetExpires,
  });
  
  // Send password reset email (mock)
  console.log(`Sending password reset email to ${email} with token: ${resetToken}`);
  // In production, implement actual email sending logic here
  
  return true;
};

// Reset password
export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
  // Find user by reset token
  const user = await storage.getUserByResetToken(token);
  if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    return false;
  }
  
  // Hash new password
  const hashedPassword = await hashPassword(newPassword);
  
  // Update user password
  await storage.updateUser(user.id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });
  
  return true;
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