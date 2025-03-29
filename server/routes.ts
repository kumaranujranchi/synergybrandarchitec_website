import { Express, Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import { 
  contactSchema, 
  loginSchema, 
  insertUserSchema, 
  updateUserSchema, 
  insertNoteSchema, 
  updateSubmissionSchema,
  insertBlogPostSchema,
  updateBlogPostSchema
} from '@shared/schema';
import { generateToken, authenticateJWT, authorize, requirePermission } from './auth';
import cookieParser from 'cookie-parser';

export function registerRoutes(app: Express): void {
  // Middleware
  app.use(cookieParser());
  
  // Public API routes
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
  
  // Blog management - only admin and manager can access
  app.get('/api/admin/blog-posts', authorize(['admin', 'manager']), async (req, res) => {
    try {
      // Parse filters
      const filters: { status?: string; category?: string } = {};
      
      if (req.query.status) {
        filters.status = req.query.status as string;
      }
      
      if (req.query.category) {
        filters.category = req.query.category as string;
      }
      
      const posts = await storage.listBlogPosts(filters);
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  });
  
  app.get('/api/admin/blog-posts/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog post details' });
    }
  });
  
  app.post('/api/admin/blog-posts', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      
      const post = await storage.createBlogPost({
        ...postData,
        authorId: req.user!.id
      });
      
      // Log the blog post creation
      storage.logAudit({
        userId: req.user!.id,
        action: 'Create blog post',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { postId: post.id, title: post.title, status: post.status }
      });
      
      res.status(201).json({ post });
    } catch (error) {
      res.status(400).json({ message: 'Invalid blog post data' });
    }
  });
  
  app.patch('/api/admin/blog-posts/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const postData = updateBlogPostSchema.parse(req.body);
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // Only author, admin, or manager can update
      if (post.authorId !== req.user!.id && req.user!.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this post' });
      }
      
      const updatedPost = await storage.updateBlogPost(id, postData);
      
      // Log the blog post update
      storage.logAudit({
        userId: req.user!.id,
        action: 'Update blog post',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { postId: id, changes: Object.keys(postData) }
      });
      
      res.status(200).json({ post: updatedPost });
    } catch (error) {
      res.status(400).json({ message: 'Invalid blog post data' });
    }
  });
  
  app.delete('/api/admin/blog-posts/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // Only author, admin, or manager can delete
      if (post.authorId !== req.user!.id && req.user!.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this post' });
      }
      
      const success = await storage.deleteBlogPost(id);
      
      if (success) {
        // Log the blog post deletion
        storage.logAudit({
          userId: req.user!.id,
          action: 'Delete blog post',
          ipAddress: req.ip ? req.ip : null,
          userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
          details: { deletedPostId: id, title: post.title }
        });
        
        res.status(200).json({ message: 'Blog post deleted successfully' });
      } else {
        res.status(500).json({ message: 'Failed to delete blog post' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  });
  
  // Public blog post routes
  app.get('/api/blog-posts', async (req, res) => {
    try {
      // Only return published posts for public API
      const posts = await storage.listBlogPosts({ status: 'published' });
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  });
  
  app.get('/api/blog-posts/:slug', async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // Only allow access to published posts for public API
      if (post.status !== 'published') {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog post' });
    }
  });
  
  // Error handler for API routes
  app.use('/api', (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });

  // No server creation - this is handled in index.ts now
}