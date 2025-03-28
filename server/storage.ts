import { 
  User, InsertUser, UpdateUser,
  Submission, InsertSubmission, UpdateSubmission,
  Note, InsertNote, AuditLog
} from "@shared/schema";
import bcrypt from "bcrypt";

// Interface for our storage
export interface IStorage {
  // User methods
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  updateUserLastLogin(id: number): Promise<void>;
  listUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;
  
  // Submission methods
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmission(id: number): Promise<Submission | undefined>;
  updateSubmission(id: number, data: UpdateSubmission): Promise<Submission | undefined>;
  listSubmissions(filters?: {status?: string, startDate?: Date, endDate?: Date}): Promise<Submission[]>;
  
  // Notes methods
  addNote(note: InsertNote & {userId: number}): Promise<Note>;
  getSubmissionNotes(submissionId: number): Promise<Note[]>;
  
  // Audit logs
  logAudit(log: Omit<AuditLog, 'id' | 'createdAt'>): Promise<void>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private submissions: Map<number, Submission>;
  private notes: Map<number, Note>;
  private auditLogs: Map<number, AuditLog>;
  private lastUserId: number;
  private lastSubmissionId: number;
  private lastNoteId: number;
  private lastAuditLogId: number;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.notes = new Map();
    this.auditLogs = new Map();
    this.lastUserId = 0;
    this.lastSubmissionId = 0;
    this.lastNoteId = 0;
    this.lastAuditLogId = 0;
    
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
          phone: null,
          role: 'admin',
          permissions: ['view', 'create', 'edit', 'delete', 'manage_users'],
          isVerified: true,
          verificationToken: null,
          resetPasswordToken: null,
          resetPasswordExpires: null,
          lastLogin: null,
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
      phone: userData.phone || null,
      role: userData.role || 'customer',
      permissions: userData.permissions ? [...userData.permissions] : ['view'],
      isVerified: userData.isVerified || false,
      verificationToken: userData.verificationToken || null,
      resetPasswordToken: userData.resetPasswordToken || null,
      resetPasswordExpires: userData.resetPasswordExpires || null,
      lastLogin: null,
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

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.verificationToken === token) {
        return { ...user };
      }
    }
    return undefined;
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.resetPasswordToken === token) {
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
    
    // Update last login timestamp
    await this.updateUserLastLogin(user.id);
    
    return { ...user };
  }
  
  async updateUserLastLogin(id: number): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.lastLogin = new Date();
      this.users.set(id, user);
    }
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