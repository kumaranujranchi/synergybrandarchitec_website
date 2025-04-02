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
  updateBlogPostSchema,
  insertAddonProductSchema,
  updateAddonProductSchema,
  insertCartItemSchema,
  updateCartItemSchema,
  insertOrderSchema,
  checkoutSchema,
  registerSchema
} from '@shared/schema';
import { generateToken, authenticateJWT, authorize, requirePermission } from './auth';
import cookieParser from 'cookie-parser';

export function registerRoutes(app: Express): void {
  // Middleware
  app.use(cookieParser());
  
  // URL Redirects for SEO
  app.use((req, res, next) => {
    const host = req.hostname;
    const path = req.path;
    const protocol = req.protocol;
    
    // Redirect www to non-www
    if (host.startsWith('www.')) {
      const newHost = host.replace(/^www\./, '');
      return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
    }
    
    // Redirect old URLs to new paths
    if (path === '/contact-brand-building-services') {
      return res.redirect(301, '/#contact');
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
  
  // User registration for client users
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      // Create user with client role
      const user = await storage.createUser({
        name: userData.name,
        email: userData.email,
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
      res.status(400).json({ message: 'Invalid registration data' });
    }
  });
  
  // Addon Products (Public API)
  app.get('/api/addons', async (req, res) => {
    try {
      // Only return active products for public API
      const products = await storage.listAddonProducts(true);
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch addon products' });
    }
  });
  
  app.get('/api/addons/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getAddonProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Only return active products for public API
      if (!product.isActive) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product details' });
    }
  });
  
  // Admin Addon Products Management
  app.get('/api/admin/addons', authorize(['admin', 'manager']), async (req, res) => {
    try {
      // Admin can see all products including inactive ones
      const products = await storage.listAddonProducts(false);
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch addon products' });
    }
  });
  
  app.post('/api/admin/addons', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const productData = insertAddonProductSchema.parse(req.body);
      const product = await storage.createAddonProduct(productData);
      
      // Log the product creation
      storage.logAudit({
        userId: req.user!.id,
        action: 'Create addon product',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { productId: product.id, name: product.name }
      });
      
      res.status(201).json({ product });
    } catch (error) {
      res.status(400).json({ message: 'Invalid product data' });
    }
  });
  
  app.patch('/api/admin/addons/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const productData = updateAddonProductSchema.parse(req.body);
      
      const product = await storage.getAddonProduct(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      const updatedProduct = await storage.updateAddonProduct(id, productData);
      
      // Log the product update
      storage.logAudit({
        userId: req.user!.id,
        action: 'Update addon product',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { productId: id, changes: Object.keys(productData) }
      });
      
      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      res.status(400).json({ message: 'Invalid product data' });
    }
  });
  
  app.delete('/api/admin/addons/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const product = await storage.getAddonProduct(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      const success = await storage.deleteAddonProduct(id);
      
      if (success) {
        // Log the product deletion
        storage.logAudit({
          userId: req.user!.id,
          action: 'Delete addon product',
          ipAddress: req.ip ? req.ip : null,
          userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
          details: { deletedProductId: id, name: product.name }
        });
        
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(500).json({ message: 'Failed to delete product' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product' });
    }
  });
  
  // Cart Management (requires authentication)
  app.use('/api/cart', authenticateJWT);
  
  app.get('/api/cart', async (req, res) => {
    try {
      const userId = req.user!.id;
      const cartItems = await storage.getUserCart(userId);
      
      // Fetch product details for each cart item
      const cartWithDetails = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getAddonProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      res.status(200).json({ cart: cartWithDetails });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch cart' });
    }
  });
  
  app.post('/api/cart', async (req, res) => {
    try {
      const userId = req.user!.id;
      const { productId, quantity } = insertCartItemSchema.parse(req.body);
      
      // Verify product exists and is active
      const product = await storage.getAddonProduct(productId);
      if (!product || !product.isActive) {
        return res.status(404).json({ message: 'Product not found or unavailable' });
      }
      
      // Add to cart
      const cartItem = await storage.addToCart({
        userId,
        productId,
        quantity: quantity || 1
      });
      
      // Return cart item with product details
      res.status(201).json({ 
        cartItem: {
          ...cartItem,
          product
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid cart data' });
    }
  });
  
  app.patch('/api/cart/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Verify cart item exists and belongs to user
      const cartItem = await storage.getCartItem(id);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      
      if (cartItem.userId !== userId) {
        return res.status(403).json({ message: 'Not authorized to update this cart item' });
      }
      
      // Update quantity
      const { quantity } = updateCartItemSchema.parse({ ...req.body, id });
      const updatedCartItem = await storage.updateCartItem(id, { id, quantity });
      
      // Get product details
      const product = await storage.getAddonProduct(updatedCartItem!.productId);
      
      res.status(200).json({ 
        cartItem: {
          ...updatedCartItem,
          product
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Invalid cart data' });
    }
  });
  
  app.delete('/api/cart/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Verify cart item exists and belongs to user
      const cartItem = await storage.getCartItem(id);
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      
      if (cartItem.userId !== userId) {
        return res.status(403).json({ message: 'Not authorized to remove this cart item' });
      }
      
      // Remove from cart
      const success = await storage.removeFromCart(id);
      
      if (success) {
        res.status(200).json({ message: 'Item removed from cart' });
      } else {
        res.status(500).json({ message: 'Failed to remove item from cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove item from cart' });
    }
  });
  
  app.delete('/api/cart', async (req, res) => {
    try {
      const userId = req.user!.id;
      
      // Clear cart
      const success = await storage.clearUserCart(userId);
      
      if (success) {
        res.status(200).json({ message: 'Cart cleared successfully' });
      } else {
        res.status(500).json({ message: 'Failed to clear cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to clear cart' });
    }
  });
  
  // Checkout/Order Management
  app.post('/api/checkout', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user!.id;
      const checkoutData = checkoutSchema.parse(req.body);
      
      // Get user's cart
      const cartItems = await storage.getUserCart(userId);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
      
      // Calculate total amount
      let totalAmount = 0;
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getAddonProduct(item.productId);
          if (!product || !product.isActive) {
            throw new Error(`Product ${item.productId} not found or inactive`);
          }
          
          // Calculate item total and add to order total
          const itemPrice = parseFloat(product.price);
          totalAmount += itemPrice * item.quantity;
          
          return {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: item.quantity,
            orderId: 0 // This will be populated by the createOrder method
          };
        })
      );
      
      // Create order
      const order = await storage.createOrder(
        {
          userId,
          status: 'pending',
          totalAmount: totalAmount.toString(),
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          message: checkoutData.message || ''
        },
        orderItems
      );
      
      // Clear cart after successful order
      await storage.clearUserCart(userId);
      
      // Log the order creation
      storage.logAudit({
        userId,
        action: 'Create order',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { orderId: order.id, totalAmount: order.totalAmount }
      });
      
      res.status(201).json({ 
        message: 'Order placed successfully',
        order
      });
    } catch (error) {
      res.status(400).json({ message: 'Checkout failed' });
    }
  });
  
  // Get user orders
  app.get('/api/orders', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user!.id;
      const orders = await storage.getUserOrders(userId);
      
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
  
  app.get('/api/orders/:id', authenticateJWT, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user!.id;
      
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Only allow users to see their own orders (unless admin/manager)
      if (order.userId !== userId && !['admin', 'manager'].includes(req.user!.role)) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      
      // Get order items
      const orderItems = await storage.getOrderItems(id);
      
      // Get order revisions
      const revisions = await storage.getOrderRevisions(id);
      
      res.status(200).json({ 
        order,
        items: orderItems,
        revisions
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch order details' });
    }
  });
  
  // Admin order management
  app.get('/api/admin/orders', authorize(['admin', 'manager']), async (req, res) => {
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
      
      const orders = await storage.listOrders(filters);
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
  
  app.patch('/api/admin/orders/:id', authorize(['admin', 'manager']), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      const updatedOrder = await storage.updateOrder(id, { id, status });
      
      // Log the order update
      storage.logAudit({
        userId: req.user!.id,
        action: 'Update order status',
        ipAddress: req.ip ? req.ip : null,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : null,
        details: { orderId: id, oldStatus: order.status, newStatus: status }
      });
      
      res.status(200).json({ order: updatedOrder });
    } catch (error) {
      res.status(400).json({ message: 'Invalid order data' });
    }
  });
  
  // Error handler for API routes
  app.use('/api', (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });

  // No server creation - this is handled in index.ts now
}