import { Express, Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import bcrypt from 'bcrypt';
import {
  contactSchema,
  loginSchema,
  insertUserSchema,
  updateUserSchema,
  insertNoteSchema,
  updateSubmissionSchema,


  registerSchema
} from '@shared/schema';
import { generateToken, authenticateJWT, authorize, requirePermission } from './auth';
import cookieParser from 'cookie-parser';
import { sendPasswordResetEmail, sendOTPEmail } from './utils/mailer';
import { z } from 'zod';
import { incrementVisitorCount, getVisitorCount } from './visitorCount';

export function registerRoutes(app: Express): void {
  // Middleware
  app.use(cookieParser());
  
  // URL Redirects for SEO
  app.use((req, res, next) => {
    // Get host from different possible headers
    const host = req.header('host') || req.header('x-forwarded-host') || req.hostname;
    const path = req.path;
    // Get protocol considering potential proxies
    const protocol = req.header('x-forwarded-proto') || req.protocol;
    
    // Check for HTTPS to ensure consistent protocol
    if (process.env.NODE_ENV === 'production' && protocol !== 'https') {
      const secureUrl = `https://${host}${req.originalUrl || req.url}`;
      console.log(`Redirecting to HTTPS: ${secureUrl}`);
      return res.redirect(301, secureUrl);
    }
    
    // Canonical domain handling - handle both www and non-www consistently
    if (host && host.match(/^www\./i)) {
      const newHost = host.replace(/^www\./i, '');
      const redirectUrl = `${protocol}://${newHost}${req.originalUrl || req.url}`;
      console.log(`Redirecting from www to non-www: ${redirectUrl}`);
      return res.redirect(301, redirectUrl);
    }
    
    // Redirect old URLs to new paths with consistent handling
    if (path === '/contact-brand-building-services') {
      return res.redirect(301, '/#contact');
    }
    
    // Remove trailing slashes from URLs for consistency
    if (path.length > 1 && path.endsWith('/')) {
      const trimmedPath = path.slice(0, -1);
      const redirectUrl = `${protocol}://${host}${trimmedPath}${req.originalUrl?.includes('?') ? req.originalUrl.substring(req.originalUrl.indexOf('?')) : ''}`;
      console.log(`Removing trailing slash: ${redirectUrl}`);
      return res.redirect(301, redirectUrl);
    }
    
    next();
  });
  
  // Static files with specific content types
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.sendFile('sitemap.xml', { root: './public' });
  });
  
  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.sendFile('robots.txt', { root: './public' });
  });
  
  // Public API routes
  // Visitor counter endpoint
  app.get('/api/visitor-count', (req, res) => {
    const count = incrementVisitorCount();
    res.status(200).json({ count });
  });
  
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const submission = await storage.createSubmission(validatedData);
      
      console.log('New submission created:', submission);
      
      res.status(201).json({
        message: 'Form submitted successfully',
        id: submission.id
      });
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(400).json({ error: 'Invalid form data' });
    }
  });
  
  // Debug endpoint - TEMPORARY
  app.get('/api/debug/submissions', async (req, res) => {
    const submissions = await storage.listSubmissions({});
    res.status(200).json({ count: submissions.length, submissions });
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
  
  // Password reset - forgot password
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // For security, don't reveal whether the email exists or not
        return res.status(200).json({ 
          message: 'If your email is registered, you will receive password reset instructions shortly.' 
        });
      }
      
      // Generate reset token
      const resetToken = await storage.createPasswordResetToken(user.id);
      
      // Create reset link
      const resetLink = `${req.protocol}://${req.get('host')}/auth?reset=${resetToken}`;
      
      // Send email with reset link
      const emailSent = await sendPasswordResetEmail(user.email, resetToken, resetLink);
      
      if (!emailSent) {
        console.error('Failed to send password reset email');
        return res.status(500).json({ message: 'Failed to send reset email. Please try again later.' });
      }
      
      // Log the password reset request
      storage.logAudit({
        userId: user.id,
        action: 'Request password reset',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { email: user.email }
      });
      
      res.status(200).json({ 
        message: 'If your email is registered, you will receive password reset instructions shortly.' 
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(400).json({ message: 'Invalid email address' });
    }
  });
  
  // Reset password with token
  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { token, password, confirmPassword } = z.object({
        token: z.string(),
        password: z.string().min(6),
        confirmPassword: z.string()
      }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
      }).parse(req.body);
      
      // Validate token and get user
      const user = await storage.validateResetToken(token);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
      
      // Update user's password
      await storage.updateUser(user.id, { password });
      
      // Mark the token as used
      await storage.markResetTokenAsUsed(token);
      
      // Log the password reset
      storage.logAudit({
        userId: user.id,
        action: 'Reset password',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { method: 'token' }
      });
      
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(400).json({ message: 'Failed to reset password' });
    }
  });
  
  // Request OTP for password reset
  app.post('/api/auth/request-otp', async (req, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // For security, don't reveal whether the email exists or not
        return res.status(200).json({ 
          message: 'If your email is registered, you will receive an OTP shortly.' 
        });
      }
      
      // Generate OTP
      const otp = await storage.createOTP(user.id, email);
      
      // Send email with OTP
      const emailSent = await sendOTPEmail(user.email, otp);
      
      if (!emailSent) {
        console.error('Failed to send OTP email');
        return res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
      }
      
      // Log the OTP request
      storage.logAudit({
        userId: user.id,
        action: 'Request password reset OTP',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { email: user.email }
      });
      
      res.status(200).json({ 
        message: 'If your email is registered, you will receive an OTP shortly.' 
      });
    } catch (error) {
      console.error('Request OTP error:', error);
      res.status(400).json({ message: 'Invalid email address' });
    }
  });
  
  // Reset password with OTP
  app.post('/api/auth/reset-password-otp', async (req, res) => {
    try {
      const { email, otp, password, confirmPassword } = z.object({
        email: z.string().email(),
        otp: z.string(),
        password: z.string().min(6),
        confirmPassword: z.string()
      }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
      }).parse(req.body);
      
      // Validate OTP
      const user = await storage.validateOTP(email, otp);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
      
      // Update user's password
      await storage.updateUser(user.id, { password });
      
      // Mark OTP as used
      await storage.markOTPAsUsed(email, otp);
      
      // Log the password reset
      storage.logAudit({
        userId: user.id,
        action: 'Reset password',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { method: 'otp' }
      });
      
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Reset password with OTP error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(400).json({ message: 'Failed to reset password' });
    }
  });
  
  // User account management routes (requires authentication)
  app.get('/api/users/me', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user!.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove sensitive data
      const { password, ...userInfo } = user;
      
      res.status(200).json({ user: userInfo });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user data' });
    }
  });
  
  app.patch('/api/users/me', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user!.id;
      const userData = req.body;
      
      // Prevent updating sensitive fields like role or permissions
      const allowedFields = ['name', 'phone', 'website'];
      const updateData: Record<string, any> = {};
      
      allowedFields.forEach(field => {
        if (field in userData) {
          updateData[field] = userData[field];
        }
      });
      
      const user = await storage.updateUser(userId, updateData);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Log the profile update
      storage.logAudit({
        userId,
        action: 'Update profile',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { fields: Object.keys(updateData) }
      });
      
      // Remove sensitive data
      const { password, ...userInfo } = user;
      
      res.status(200).json({ 
        message: 'Profile updated successfully',
        user: userInfo 
      });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update profile' });
    }
  });
  
  app.patch('/api/users/password', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user!.id;
      const { currentPassword, password } = req.body;
      
      if (!currentPassword || !password) {
        return res.status(400).json({ message: 'Current password and new password are required' });
      }
      
      // Get user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      
      // Update password
      await storage.updateUser(userId, { password });
      
      // Log the password change
      storage.logAudit({
        userId,
        action: 'Change password',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: {}
      });
      
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Failed to update password' });
    }
  });
  
  // Protected API routes - requires authentication
  app.use('/api/admin', authenticateJWT);
  
  // Dashboard stats - restricted to admin and manager
  app.get('/api/admin/dashboard', authorize(['admin', 'manager']), async (req, res) => {
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
  
  // Delete submission - admin and manager only
  app.delete('/api/admin/submissions/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
      }
      
      const submission = await storage.getSubmission(id);
      if (!submission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      
      const success = await storage.deleteSubmission(id);
      
      if (success) {
        // Log audit
        storage.logAudit({
          userId: req.user!.id,
          action: 'Delete submission',
          ipAddress: req.ip ? req.ip : null,
          userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
          details: { deletedSubmissionId: id }
        });
        
        res.status(200).json({ message: 'Submission deleted successfully' });
      } else {
        res.status(500).json({ message: 'Failed to delete submission' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete submission' });
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






  
  // User registration for client users
  app.post('/api/auth/register', async (req, res) => {
    try {
      // Prepare the request body with safe default values
      const safeBody = {
        name: req.body.name || '',
        email: req.body.email || '',
        phone: req.body.phone || '',
        website: req.body.website || '',
        password: req.body.password || '',
        confirmPassword: req.body.confirmPassword || ''
      };
      
      console.log('Register request body (sanitized):', safeBody);
      
      // Validate the request data
      const userData = registerSchema.parse(safeBody);
      console.log('Validated user data:', userData);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      // Create user with client role
      const user = await storage.createUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        website: userData.website || null, // Ensure website is null if empty
        password: userData.password,
        role: 'client' // Set default role to client
      });
      
      // Generate token for auto-login
      const token = generateToken(user);
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      // Log the registration
      storage.logAudit({
        userId: user.id,
        action: 'User registration',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { email: user.email }
      });
      
      // Return user info (without password)
      const { password: _, ...userInfo } = user;
      res.status(201).json({ 
        message: 'Registration successful',
        user: userInfo,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: 'Invalid registration data', error: String(error) });
    }
  });
  


  

  

  

  

  
  // Error handler for API routes
  app.use('/api', (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });

  // No server creation - this is handled in index.ts now
}