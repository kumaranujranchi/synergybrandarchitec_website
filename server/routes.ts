import { Express, Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { 
  contactSchema, 
  loginSchema, 
  registerSchema,
  insertUserSchema, 
  updateUserSchema, 
  insertNoteSchema, 
  updateSubmissionSchema 
} from '@shared/schema';
import { 
  generateToken, 
  authenticateJWT, 
  authorize, 
  requirePermission,
  registerUser,
  verifyEmail,
  comparePassword,
  hashPassword,
  requestPasswordReset,
  resetPassword,
  sendOTP,
  generateOTP
} from './auth';
import cookieParser from 'cookie-parser';

export function registerRoutes(app: Express): void {
  // Middleware
  app.use(cookieParser());
  
  // Public API routes
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const submission = await storage.createSubmission(validatedData);
      
      res.status(201).json({
        message: 'Form submitted successfully',
        id: submission.id
      });
    } catch (error) {
      res.status(400).json({ error: 'Invalid form data' });
    }
  });

  // Authentication routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await storage.validateUserCredentials(email, password);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = generateToken(user);
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      // Log the login action
      storage.logAudit({
        userId: user.id,
        action: 'User login',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { email: user.email }
      });
      
      // Return user info (without password)
      const { password: _, ...userInfo } = user;
      res.status(200).json({ 
        message: 'Login successful',
        user: userInfo,
        token
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid login data' });
    }
  });
  
  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  });
  
  app.get('/api/auth/check', authenticateJWT, (req, res) => {
    res.status(200).json({ 
      authenticated: true,
      user: req.user
    });
  });
  
  // User registration
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if password and confirmPassword match
      if (userData.password !== userData.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      
      // Register the user
      const { confirmPassword, ...registerData } = userData;
      
      try {
        const user = await registerUser(registerData);
        
        // Return user info (without password)
        const { password: _, ...userInfo } = user;
        res.status(201).json({ 
          message: 'Registration successful. Please check your email to verify your account.', 
          user: userInfo 
        });
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid registration data' });
    }
  });
  
  // Email verification
  app.get('/api/auth/verify-email/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const success = await verifyEmail(token);
      
      if (success) {
        res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
      } else {
        res.status(400).json({ message: 'Invalid or expired verification token' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to verify email' });
    }
  });
  
  // Request password reset
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      
      const success = await requestPasswordReset(email);
      
      // Always return success to prevent email enumeration
      res.status(200).json({ 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to process password reset request' });
    }
  });
  
  // Reset password
  app.post('/api/auth/reset-password/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;
      
      if (!password || !confirmPassword) {
        return res.status(400).json({ message: 'Password and confirmation are required' });
      }
      
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      
      const success = await resetPassword(token, password);
      
      if (success) {
        res.status(200).json({ message: 'Password reset successfully. You can now log in with your new password.' });
      } else {
        res.status(400).json({ message: 'Invalid or expired reset token' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to reset password' });
    }
  });
  
  // OTP verification
  app.post('/api/auth/send-otp', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Generate OTP
      const otp = generateOTP();
      
      // Store OTP in user's verification token (in a real implementation, use a separate OTP table)
      await storage.updateUser(user.id, {
        verificationToken: otp,
      });
      
      // Send OTP
      await sendOTP(email, otp);
      
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  });
  
  app.post('/api/auth/verify-otp', async (req, res) => {
    try {
      const { email, otp } = req.body;
      
      if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      if (user.verificationToken !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      
      // Update user's verification status
      await storage.updateUser(user.id, {
        isVerified: true,
        verificationToken: null,
      });
      
      // Generate token for automatic login
      const token = generateToken(user);
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      // Return user info (without password)
      const { password: _, ...userInfo } = user;
      res.status(200).json({ 
        message: 'OTP verified successfully', 
        user: userInfo,
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  });
  
  // User profile management (authenticated users)
  app.get('/api/user/profile', authenticateJWT, async (req, res) => {
    try {
      const user = await storage.getUser(req.user!.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from response
      const { password, ...userInfo } = user;
      res.status(200).json({ user: userInfo });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  });
  
  app.patch('/api/user/profile', authenticateJWT, async (req, res) => {
    try {
      const userData = updateUserSchema.parse(req.body);
      
      // Prevent changing role or permissions through this endpoint
      delete userData.role;
      delete userData.permissions;
      
      const updatedUser = await storage.updateUser(req.user!.id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from response
      const { password, ...userInfo } = updatedUser;
      res.status(200).json({ user: userInfo });
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data' });
    }
  });
  
  app.post('/api/user/change-password', authenticateJWT, async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      
      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All password fields are required' });
      }
      
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      
      const user = await storage.getUser(req.user!.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Verify current password
      const isPasswordValid = await comparePassword(currentPassword, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      // Update password
      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUser(user.id, { password: hashedPassword });
      
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to change password' });
    }
  });
  
  // Protected API routes - requires authentication
  app.use('/api/admin', authenticateJWT);
  
  // Dashboard stats
  app.get('/api/admin/dashboard', async (req, res) => {
    try {
      const submissions = await storage.listSubmissions();
      
      // Calculate counts by status
      const stats = {
        total: submissions.length,
        new: submissions.filter(s => s.status === 'new').length,
        inProgress: submissions.filter(s => s.status === 'in_progress').length,
        pending: submissions.filter(s => s.status === 'pending').length,
        delivered: submissions.filter(s => s.status === 'delivered').length,
        lost: submissions.filter(s => s.status === 'lost').length,
      };
      
      res.status(200).json({ stats });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
  });
  
  // Submissions
  app.get('/api/admin/submissions', async (req, res) => {
    try {
      // Parse filters
      const filters: { status?: string; startDate?: Date; endDate?: Date } = {};
      
      if (req.query.status) {
        filters.status = req.query.status as string;
      }
      
      if (req.query.startDate) {
        filters.startDate = new Date(req.query.startDate as string);
      }
      
      if (req.query.endDate) {
        filters.endDate = new Date(req.query.endDate as string);
      }
      
      const submissions = await storage.listSubmissions(filters);
      res.status(200).json({ submissions });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch submissions' });
    }
  });
  
  app.get('/api/admin/submissions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const submission = await storage.getSubmission(id);
      
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      
      // Get notes for this submission
      const notes = await storage.getSubmissionNotes(id);
      
      res.status(200).json({ submission, notes });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch submission details' });
    }
  });
  
  app.patch('/api/admin/submissions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = updateSubmissionSchema.parse({ ...req.body, id });
      
      const updatedSubmission = await storage.updateSubmission(id, data);
      
      if (!updatedSubmission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      
      // Log the update
      storage.logAudit({
        userId: req.user!.id,
        action: 'Update submission status',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { submissionId: id, newStatus: data.status }
      });
      
      res.status(200).json({ submission: updatedSubmission });
    } catch (error) {
      res.status(400).json({ message: 'Invalid submission data' });
    }
  });
  
  // Submission notes
  app.post('/api/admin/submissions/:id/notes', async (req, res) => {
    try {
      const submissionId = parseInt(req.params.id);
      const submission = await storage.getSubmission(submissionId);
      
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      
      const noteData = insertNoteSchema.parse({
        ...req.body,
        submissionId
      });
      
      const note = await storage.addNote({
        ...noteData,
        userId: req.user!.id
      });
      
      // Log the note creation
      storage.logAudit({
        userId: req.user!.id,
        action: 'Add note to submission',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { submissionId, noteId: note.id }
      });
      
      res.status(201).json({ note });
    } catch (error) {
      res.status(400).json({ message: 'Invalid note data' });
    }
  });
  
  // User management (admin only)
  app.get('/api/admin/users', authorize(['admin']), async (req, res) => {
    try {
      const users = await storage.listUsers();
      
      // Remove password from response
      const safeUsers = users.map(user => {
        const { password, ...userInfo } = user;
        return userInfo;
      });
      
      res.status(200).json({ users: safeUsers });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  });
  
  app.post('/api/admin/users', authorize(['admin']), async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      const user = await storage.createUser(userData);
      
      // Log the user creation
      storage.logAudit({
        userId: req.user!.id,
        action: 'Create user',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { newUserId: user.id, email: user.email, role: user.role }
      });
      
      // Remove password from response
      const { password, ...userInfo } = user;
      res.status(201).json({ user: userInfo });
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data' });
    }
  });
  
  app.patch('/api/admin/users/:id', authorize(['admin']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userData = updateUserSchema.parse(req.body);
      
      const updatedUser = await storage.updateUser(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Log the user update
      storage.logAudit({
        userId: req.user!.id,
        action: 'Update user',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { updatedUserId: id, changes: Object.keys(userData) }
      });
      
      // Remove password from response
      const { password, ...userInfo } = updatedUser;
      res.status(200).json({ user: userInfo });
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data' });
    }
  });
  
  app.delete('/api/admin/users/:id', authorize(['admin']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Prevent self-deletion
      if (id === req.user!.id) {
        return res.status(400).json({ message: 'Cannot delete your own account' });
      }
      
      const success = await storage.deleteUser(id);
      
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Log the user deletion
      storage.logAudit({
        userId: req.user!.id,
        action: 'Delete user',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { deletedUserId: id }
      });
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  });
  
  // Error handler for API routes
  app.use('/api', (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });

  // No server creation - this is handled in index.ts now
}