import { 
  User, InsertUser, UpdateUser,
  Submission, InsertSubmission, UpdateSubmission,
  Note, InsertNote, AuditLog,
  BlogPost, InsertBlogPost, UpdateBlogPost
} from "@shared/schema";
import bcrypt from "bcrypt";

// Interface for our storage
export interface IStorage {
  // User methods
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;
  
  // Submission methods
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmission(id: number): Promise<Submission | undefined>;
  updateSubmission(id: number, data: UpdateSubmission): Promise<Submission | undefined>;
  deleteSubmission(id: number): Promise<boolean>;
  listSubmissions(filters?: {status?: string, startDate?: Date, endDate?: Date}): Promise<Submission[]>;
  
  // Notes methods
  addNote(note: InsertNote & {userId: number}): Promise<Note>;
  getSubmissionNotes(submissionId: number): Promise<Note[]>;
  
  // Blog post methods
  createBlogPost(post: InsertBlogPost & {authorId: number}): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, data: UpdateBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  listBlogPosts(filters?: {status?: string, category?: string}): Promise<BlogPost[]>;
  
  // Audit logs
  logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private submissions: Map<number, Submission>;
  private notes: Map<number, Note>;
  private auditLogs: Map<number, AuditLog>;
  private blogPosts: Map<number, BlogPost>;
  private lastUserId: number;
  private lastSubmissionId: number;
  private lastNoteId: number;
  private lastAuditLogId: number;
  private lastBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.notes = new Map();
    this.auditLogs = new Map();
    this.blogPosts = new Map();
    this.lastUserId = 0;
    this.lastSubmissionId = 0;
    this.lastNoteId = 0;
    this.lastAuditLogId = 0;
    this.lastBlogPostId = 0;
    
    // Create initial admin user
    this.createInitialAdmin();
  }

  private createInitialAdmin() {
    // Use synchronous operations to avoid potential issues with async initialization
    // First check if admin exists
    let adminExists = false;
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.email.toLowerCase() === 'admin@synergybrandarchitect.in') {
        adminExists = true;
        break;
      }
    }
    
    if (!adminExists) {
      try {
        // Create admin user synchronously
        const id = ++this.lastUserId;
        const hashedPassword = bcrypt.hashSync('admin123', 10);
        
        const now = new Date();
        const user: User = {
          id,
          name: 'Admin',
          email: 'admin@synergybrandarchitect.in',
          password: hashedPassword,
          role: 'admin',
          permissions: ['view', 'create', 'edit', 'delete', 'manage_users'],
          createdAt: now,
          updatedAt: now
        };
        
        this.users.set(id, user);
        console.log('Initial admin user created');
      } catch (error) {
        console.error('Error creating initial admin:', error);
      }
    }
  }

  // User methods
  async createUser(userData: InsertUser): Promise<User> {
    const id = ++this.lastUserId;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const now = new Date();
    const user: User = {
      id,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'user',
      permissions: userData.permissions ? [...userData.permissions] : ['view'],
      createdAt: now,
      updatedAt: now
    };
    
    this.users.set(id, user);
    return { ...user };
  }

  async getUser(id: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      return { ...user };
    }
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    // Convert MapIterator to array to avoid downlevelIteration error
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return { ...user };
      }
    }
    return undefined;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    // Handle permissions properly
    let permissions = user.permissions;
    if (userData.permissions) {
      permissions = [...userData.permissions];
    }
    
    const updatedUser: User = {
      ...user,
      ...userData,
      permissions,
      updatedAt: new Date(),
      // If password is being updated, hash it
      password: userData.password ? await bcrypt.hash(userData.password, 10) : user.password
    };
    
    this.users.set(id, updatedUser);
    return { ...updatedUser };
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values()).map(user => ({ ...user }));
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    
    return { ...user };
  }

  // Submission methods
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const id = ++this.lastSubmissionId;
    const now = new Date();
    
    const newSubmission: Submission = {
      id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      city: submission.city || null,
      service: submission.service,
      message: submission.message,
      status: 'new',
      submittedAt: now,
      updatedAt: now
    };
    
    this.submissions.set(id, newSubmission);
    return { ...newSubmission };
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (submission) {
      return { ...submission };
    }
    return undefined;
  }

  async updateSubmission(id: number, data: UpdateSubmission): Promise<Submission | undefined> {
    const submission = this.submissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission: Submission = {
      ...submission,
      status: data.status || submission.status,
      updatedAt: new Date()
    };
    
    this.submissions.set(id, updatedSubmission);
    return { ...updatedSubmission };
  }

  async deleteSubmission(id: number): Promise<boolean> {
    return this.submissions.delete(id);
  }

  async listSubmissions(filters?: { status?: string; startDate?: Date; endDate?: Date }): Promise<Submission[]> {
    let submissions = Array.from(this.submissions.values());
    
    if (filters) {
      if (filters.status) {
        submissions = submissions.filter(s => s.status === filters.status);
      }
      
      if (filters.startDate) {
        submissions = submissions.filter(s => s.submittedAt >= filters.startDate!);
      }
      
      if (filters.endDate) {
        submissions = submissions.filter(s => s.submittedAt <= filters.endDate!);
      }
    }
    
    // Sort by newest first
    return submissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // Notes methods
  async addNote(note: InsertNote & {userId: number}): Promise<Note> {
    const id = ++this.lastNoteId;
    
    const newNote: Note = {
      id,
      submissionId: note.submissionId,
      userId: note.userId,
      content: note.content,
      createdAt: new Date()
    };
    
    this.notes.set(id, newNote);
    return { ...newNote };
  }

  async getSubmissionNotes(submissionId: number): Promise<Note[]> {
    return Array.from(this.notes.values())
      .filter(note => note.submissionId === submissionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Blog post methods
  async createBlogPost(post: InsertBlogPost & {authorId: number}): Promise<BlogPost> {
    const id = ++this.lastBlogPostId;
    const now = new Date();
    
    // Generate slug from title if not provided
    let slug = post.slug;
    if (!slug) {
      slug = post.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      // Make sure slug is unique
      let slugExists = true;
      let counter = 0;
      let uniqueSlug = slug;
      
      while (slugExists) {
        const posts = Array.from(this.blogPosts.values());
        slugExists = posts.some(existingPost => existingPost.slug === uniqueSlug);
        
        if (slugExists) {
          counter++;
          uniqueSlug = `${slug}-${counter}`;
        } else {
          slug = uniqueSlug;
        }
      }
    }
    
    const newPost: BlogPost = {
      id,
      title: post.title,
      slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || null,
      authorId: post.authorId,
      status: post.status || 'draft',
      tags: Array.isArray(post.tags) ? post.tags.map(t => String(t)) : [],
      category: post.category || null,
      publishedAt: post.status === 'published' ? now : null,
      createdAt: now,
      updatedAt: now
    };
    
    this.blogPosts.set(id, newPost);
    return { ...newPost };
  }
  
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (post) {
      return { ...post };
    }
    return undefined;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = Array.from(this.blogPosts.values());
    for (const post of posts) {
      if (post.slug === slug) {
        return { ...post };
      }
    }
    return undefined;
  }
  
  async updateBlogPost(id: number, data: UpdateBlogPost): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    // Handle tags array properly
    let tags = post.tags;
    if (data.tags) {
      tags = Array.isArray(data.tags) ? data.tags.map(t => String(t)) : post.tags;
    }
    
    // Special handling for status changes
    const now = new Date();
    let publishedAt = post.publishedAt;
    if (data.status === 'published' && post.status !== 'published') {
      publishedAt = now;
    }
    
    const updatedPost: BlogPost = {
      ...post,
      ...data,
      tags,
      publishedAt,
      updatedAt: now
    };
    
    this.blogPosts.set(id, updatedPost);
    return { ...updatedPost };
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  async listBlogPosts(filters?: { status?: string; category?: string }): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values());
    
    if (filters) {
      if (filters.status) {
        posts = posts.filter(p => p.status === filters.status);
      }
      
      if (filters.category) {
        posts = posts.filter(p => p.category === filters.category);
      }
    }
    
    // Sort by newest first
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Audit logs
  async logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void> {
    const id = ++this.lastAuditLogId;
    
    const auditLog: AuditLog = {
      id,
      userId: log.userId,
      action: log.action,
      details: log.details || null,
      ipAddress: log.ipAddress || null,
      userAgent: log.userAgent || null,
      createdAt: new Date()
    };
    
    this.auditLogs.set(id, auditLog);
  }
}

// Create and export a singleton instance
export const storage = new MemStorage();