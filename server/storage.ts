import { User, InsertUser, UpdateUser } from '@shared/schema';
import bcrypt from 'bcrypt';

export interface IStorage {
  // User methods
  createUser(userData: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;



  // Submission methods
  createSubmission(data: any): Promise<any>;
  listSubmissions(filters: any): Promise<any[]>;
  updateSubmission(id: number, data: any): Promise<any>;

  // Audit methods
  logAudit(data: any): Promise<void>;
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();

  private submissions = new Map<number, any>();
  
  private lastUserId = 0;

  private lastSubmissionId = 0;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    try {
      await this.createInitialAdmin();

      console.log("Storage initialized successfully");
    } catch (error) {
      console.error("Error initializing storage:", error);
    }
  }

  private async createInitialAdmin() {
    // Check if admin user already exists
    const usersArray = Array.from(this.users.values());
    const adminExists = usersArray.some(user => user.email === 'anuj@synergybrandarchitect.in');
    
    if (!adminExists) {
      try {
        const id = ++this.lastUserId;
        const hashedPassword = bcrypt.hashSync('Anuj@1234', 10);
        
        const now = new Date();
        const user: User = {
          id,
          name: 'Anuj',
          email: 'anuj@synergybrandarchitect.in',
          phone: null,
          website: null,
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
      phone: userData.phone || null,
      website: userData.website || null,
      password: hashedPassword,
      role: userData.role || 'client',
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
    if (user) {
      const updatedUser: User = {
        ...user,
        ...userData,
        id,
        permissions: userData.permissions ? [...userData.permissions] : user.permissions,
        updatedAt: new Date()
      };
      this.users.set(id, updatedUser);
      return { ...updatedUser };
    }
    return undefined;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values()).map(user => ({ ...user }));
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }









  // Submission methods
  async createSubmission(data: any): Promise<any> {
    const id = ++this.lastSubmissionId;
    const now = new Date();
    const submission = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    this.submissions.set(id, submission);
    return { ...submission };
  }

  async listSubmissions(filters: any): Promise<any[]> {
    return Array.from(this.submissions.values()).map(submission => ({ ...submission }));
  }

  async updateSubmission(id: number, data: any): Promise<any> {
    const submission = this.submissions.get(id);
    if (submission) {
      const updatedSubmission = {
        ...submission,
        ...data,
        id,
        updatedAt: new Date()
      };
      this.submissions.set(id, updatedSubmission);
      return { ...updatedSubmission };
    }
    return undefined;
  }

  // Audit methods
  async logAudit(data: any): Promise<void> {
    // For in-memory storage, we can just log to console
    // In a real implementation, this would be stored in the database
    console.log('Audit log:', data);
  }
}

export const storage = new MemStorage();