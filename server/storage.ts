import {
  User, InsertUser, UpdateUser,
  Submission, InsertSubmission, UpdateSubmission,
  Note, InsertNote,
  AuditLog,
  users, submissions, notes, auditLogs, passwordResetTokens, otpCodes
} from '@shared/schema';
import bcrypt from 'bcrypt';
import { db } from './db';
import { eq, and, desc, gte, lte, sql } from 'drizzle-orm';
import crypto from 'crypto';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

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
  createSubmission(data: InsertSubmission): Promise<Submission>;
  listSubmissions(filters?: any): Promise<Submission[]>;
  getSubmission(id: number): Promise<Submission | undefined>;
  updateSubmission(id: number, data: any): Promise<Submission | undefined>;
  deleteSubmission(id: number): Promise<boolean>;

  // Note methods
  getSubmissionNotes(submissionId: number): Promise<Note[]>;
  addNote(data: any): Promise<Note>;

  // Audit methods
  logAudit(data: any): Promise<void>;

  // Password reset methods
  createPasswordResetToken(userId: number): Promise<string>;
  validateResetToken(token: string): Promise<User | undefined>;
  markResetTokenAsUsed(token: string): Promise<void>;
  createOTP(userId: number, email: string): Promise<string>;
  validateOTP(email: string, otp: string): Promise<User | undefined>;
  markOTPAsUsed(email: string, otp: string): Promise<void>;
}

export class ConvexStorage implements IStorage {
  private client: ConvexHttpClient;

  constructor() {
    const convexUrl = process.env.VITE_CONVEX_URL || "";
    this.client = new ConvexHttpClient(convexUrl);
    this.initializeAdmin();
  }

  private async initializeAdmin() {
    try {
      const existingAdmin = await this.getUserByEmail('anuj@synergybrandarchitect.in');
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Anuj@1234', 10);
        await this.client.mutation(api.user_storage.createUser, {
          name: 'Anuj',
          email: 'anuj@synergybrandarchitect.in',
          password: hashedPassword,
          role: 'admin',
          permissions: ['view', 'create', 'edit', 'delete', 'manage_users'],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          phone: undefined,
          website: undefined
        });
        console.log('Initial admin user created in Convex');
      }
    } catch (error) {
      console.error('Error initializing admin in Convex:', error);
    }
  }

  // Helper to convert Convex user to shared schema User
  private mapUser(convexUser: any): User {
    if (!convexUser) return null as any;
    return {
      ...convexUser,
      id: convexUser._id as any, // Casting string ID to any/number to satisfy type
      createdAt: new Date(convexUser.createdAt),
      updatedAt: new Date(convexUser.updatedAt)
    };
  }

  private mapSubmission(convexSub: any): Submission {
    if (!convexSub) return null as any;
    return {
      ...convexSub,
      id: convexSub._id as any,
      submittedAt: new Date(convexSub.submittedAt),
      updatedAt: new Date(convexSub.updatedAt),
      city: convexSub.city || null
    };
  }

  private mapNote(convexNote: any): Note {
    if (!convexNote) return null as any;
    return {
      ...convexNote,
      id: convexNote._id as any,
      submissionId: convexNote.submissionId as any,
      userId: convexNote.userId as any,
      createdAt: new Date(convexNote.createdAt)
    };
  }

  async createUser(userData: InsertUser): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const convexUser = await this.client.mutation(api.user_storage.createUser, {
      ...userData,
      password: hashedPassword,
      role: userData.role || 'client',
      permissions: (userData.permissions as string[]) || ['view'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      phone: userData.phone || undefined,
      website: userData.website || undefined
    });
    return this.mapUser(convexUser);
  }

  async getUser(id: number): Promise<User | undefined> {
    const user = await this.client.query(api.user_storage.getUser, { id: id as any as Id<"users"> });
    return user ? this.mapUser(user) : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.client.query(api.user_storage.getUserByEmail, { email });
    return user ? this.mapUser(user) : undefined;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    let updatePayload = { ...userData };
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      updatePayload.password = await bcrypt.hash(userData.password, salt);
    }
    const user = await this.client.mutation(api.user_storage.updateUser, {
      id: id as any as Id<"users">,
      userData: updatePayload
    });
    return user ? this.mapUser(user) : undefined;
  }

  async listUsers(): Promise<User[]> {
    const users = await this.client.query(api.user_storage.listUsers);
    return users.map(u => this.mapUser(u));
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.client.mutation(api.user_storage.deleteUser, { id: id as any as Id<"users"> });
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async createSubmission(data: InsertSubmission): Promise<Submission> {
    const submissionId = await this.client.mutation(api.submissions.sendSubmission, {
      ...data,
      city: data.city || undefined
    });
    const submission = await this.client.query(api.submissions.getSubmission, { id: submissionId });
    return this.mapSubmission(submission);
  }

  async listSubmissions(filters: any = {}): Promise<Submission[]> {
    const submissions = await this.client.query(api.submissions.getSubmissions);
    let filtered = submissions;
    if (filters.status) {
      filtered = filtered.filter((s: any) => s.status === filters.status);
    }
    return filtered.map((s: any) => this.mapSubmission(s));
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const sub = await this.client.query(api.submissions.getSubmission, { id: id as any as Id<"submissions"> });
    return sub ? this.mapSubmission(sub) : undefined;
  }

  async updateSubmission(id: number, data: any): Promise<Submission | undefined> {
    const sub = await this.client.mutation(api.submissions.updateSubmission, {
      id: id as any as Id<"submissions">,
      data
    });
    return sub ? this.mapSubmission(sub) : undefined;
  }

  async deleteSubmission(id: number): Promise<boolean> {
    return await this.client.mutation(api.submissions.deleteSubmission, { id: id as any as Id<"submissions"> });
  }

  async getSubmissionNotes(submissionId: number): Promise<Note[]> {
    const notes = await this.client.query(api.notes_storage.getSubmissionNotes, {
      submissionId: submissionId as any as Id<"submissions">
    });
    return notes.map((n: any) => this.mapNote(n));
  }

  async addNote(data: any): Promise<Note> {
    const note = await this.client.mutation(api.notes_storage.addNote, {
      submissionId: data.submissionId as any as Id<"submissions">,
      userId: data.userId as any as Id<"users">,
      content: data.content
    });
    return this.mapNote(note);
  }

  async logAudit(data: any): Promise<void> {
    await this.client.mutation(api.audit_storage.logAudit, {
      ...data,
      userId: data.userId ? (data.userId as any as Id<"users">) : undefined
    });
  }

  async createPasswordResetToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 3600000;
    await this.client.mutation(api.reset_storage.createResetToken, {
      userId: userId as any as Id<"users">,
      token,
      expiresAt
    });
    return token;
  }

  async validateResetToken(token: string): Promise<User | undefined> {
    const record = await this.client.query(api.reset_storage.validateResetToken, { token });
    if (record) {
      return this.getUser((record as any).userId as any);
    }
    return undefined;
  }

  async markResetTokenAsUsed(token: string): Promise<void> {
    await this.client.mutation(api.reset_storage.markTokenUsed, { token });
  }

  async createOTP(userId: number, email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 600000;
    await this.client.mutation(api.reset_storage.createOTP, {
      userId: userId as any as Id<"users">,
      email,
      code,
      expiresAt
    });
    return code;
  }

  async validateOTP(email: string, otp: string): Promise<User | undefined> {
    const record = await this.client.query(api.reset_storage.validateOTP, { email, code: otp });
    if (record) {
      return this.getUser((record as any).userId as any);
    }
    return undefined;
  }

  async markOTPAsUsed(email: string, otp: string): Promise<void> {
    await this.client.mutation(api.reset_storage.markOTPUsed, { email, code: otp });
  }
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeAdmin();
  }

  private async initializeAdmin() {
    try {
      const existingAdmin = await this.getUserByEmail('anuj@synergybrandarchitect.in');
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('Anuj@1234', 10);
        await db.insert(users).values({
          name: 'Anuj',
          email: 'anuj@synergybrandarchitect.in',
          password: hashedPassword,
          role: 'admin',
          permissions: ['view', 'create', 'edit', 'delete', 'manage_users']
        });
        console.log('Initial admin user created in database');
      }
    } catch (error) {
      console.error('Error initializing admin in database:', error);
    }
  }

  async createUser(userData: InsertUser): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const [user] = await db.insert(users).values({
      ...userData,
      password: hashedPassword,
      role: userData.role || 'client'
    }).returning();
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(sql`lower(${users.email})`, email.toLowerCase()));
    return user;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    let updatePayload = { ...userData };
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      updatePayload.password = await bcrypt.hash(userData.password, salt);
    }
    const [user] = await db.update(users).set({
      ...updatePayload,
      updatedAt: new Date()
    }).where(eq(users.id, id)).returning();
    return user;
  }

  async listUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async deleteUser(id: number): Promise<boolean> {
    const [deleted] = await db.delete(users).where(eq(users.id, id)).returning();
    return !!deleted;
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async createSubmission(data: InsertSubmission): Promise<Submission> {
    const [submission] = await db.insert(submissions).values({
      ...data,
      status: 'new'
    }).returning();
    return submission;
  }

  async listSubmissions(filters: any = {}): Promise<Submission[]> {
    let query = db.select().from(submissions);
    const conditions = [];

    if (filters.status) {
      conditions.push(eq(submissions.status, filters.status));
    }
    if (filters.startDate) {
      conditions.push(gte(submissions.submittedAt, filters.startDate));
    }
    if (filters.endDate) {
      conditions.push(lte(submissions.submittedAt, filters.endDate));
    }

    if (conditions.length > 0) {
      // @ts-ignore
      query = query.where(and(...conditions));
    }

    return await query.orderBy(desc(submissions.submittedAt));
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
    return submission;
  }

  async updateSubmission(id: number, data: any): Promise<Submission | undefined> {
    const [submission] = await db.update(submissions).set({
      ...data,
      updatedAt: new Date()
    }).where(eq(submissions.id, id)).returning();
    return submission;
  }

  async deleteSubmission(id: number): Promise<boolean> {
    // Delete notes first due to foreign key constraint
    await db.delete(notes).where(eq(notes.submissionId, id));
    const [deleted] = await db.delete(submissions).where(eq(submissions.id, id)).returning();
    return !!deleted;
  }

  async getSubmissionNotes(submissionId: number): Promise<Note[]> {
    return await db.select().from(notes).where(eq(notes.submissionId, submissionId)).orderBy(desc(notes.createdAt));
  }

  async addNote(data: any): Promise<Note> {
    const [note] = await db.insert(notes).values(data).returning();
    return note;
  }

  async logAudit(data: any): Promise<void> {
    await db.insert(auditLogs).values(data);
  }

  async createPasswordResetToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour
    await db.insert(passwordResetTokens).values({
      userId,
      token,
      expiresAt
    });
    return token;
  }

  async validateResetToken(token: string): Promise<User | undefined> {
    const [record] = await db.select().from(passwordResetTokens)
      .where(and(
        eq(passwordResetTokens.token, token),
        eq(passwordResetTokens.used, false),
        gte(passwordResetTokens.expiresAt, new Date())
      ));

    if (record) {
      return this.getUser(record.userId);
    }
    return undefined;
  }

  async markResetTokenAsUsed(token: string): Promise<void> {
    await db.update(passwordResetTokens).set({ used: true }).where(eq(passwordResetTokens.token, token));
  }

  async createOTP(userId: number, email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 600000); // 10 minutes
    await db.insert(otpCodes).values({
      userId,
      email,
      code,
      expiresAt
    });
    return code;
  }

  async validateOTP(email: string, otp: string): Promise<User | undefined> {
    const [record] = await db.select().from(otpCodes)
      .where(and(
        eq(otpCodes.email, email.toLowerCase()),
        eq(otpCodes.code, otp),
        eq(otpCodes.used, false),
        gte(otpCodes.expiresAt, new Date())
      ));

    if (record) {
      return this.getUser(record.userId);
    }
    return undefined;
  }

  async markOTPAsUsed(email: string, otp: string): Promise<void> {
    await db.update(otpCodes).set({ used: true })
      .where(and(
        eq(otpCodes.email, email.toLowerCase()),
        eq(otpCodes.code, otp)
      ));
  }
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private submissions = new Map<number, Submission>();
  private notes = new Map<number, Note>();
  private resetTokens = new Map<string, any>();
  private otpCodes = new Map<string, any>();

  private lastUserId = 0;
  private lastSubmissionId = 0;
  private lastNoteId = 0;

  constructor() {
    this.createInitialAdmin();
  }

  private async createInitialAdmin() {
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
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = ++this.lastUserId;
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const now = new Date();
    const user: User = {
      ...userData,
      id,
      password: hashedPassword,
      phone: userData.phone || null,
      website: userData.website || null,
      role: userData.role || 'client',
      permissions: (userData.permissions as string[]) || ['view'],
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser: User = { ...user, ...userData, updatedAt: new Date() } as User;
    if (userData.password) {
      updatedUser.password = bcrypt.hashSync(userData.password, 10);
    }
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async createSubmission(data: InsertSubmission): Promise<Submission> {
    const id = ++this.lastSubmissionId;
    const now = new Date();
    const submission: Submission = {
      ...data,
      id,
      status: 'new',
      city: data.city || null,
      submittedAt: now,
      updatedAt: now
    };
    this.submissions.set(id, submission);
    return submission;
  }

  async listSubmissions(filters: any = {}): Promise<Submission[]> {
    let subs = Array.from(this.submissions.values());
    if (filters.status) subs = subs.filter(s => s.status === filters.status);
    return subs.sort((a, b) => b.id - a.id);
  }

  async getSubmission(id: number): Promise<Submission | undefined> {
    return this.submissions.get(id);
  }

  async updateSubmission(id: number, data: any): Promise<Submission | undefined> {
    const sub = this.submissions.get(id);
    if (!sub) return undefined;
    const updated = { ...sub, ...data, updatedAt: new Date() };
    this.submissions.set(id, updated);
    return updated;
  }

  async deleteSubmission(id: number): Promise<boolean> {
    return this.submissions.delete(id);
  }

  async getSubmissionNotes(submissionId: number): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(n => n.submissionId === submissionId);
  }

  async addNote(data: any): Promise<Note> {
    const id = ++this.lastNoteId;
    const note: Note = { ...data, id, createdAt: new Date() };
    this.notes.set(id, note);
    return note;
  }

  async logAudit(data: any): Promise<void> {
    console.log('Audit Log (Mem):', data);
  }

  async createPasswordResetToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    this.resetTokens.set(token, { userId, expiresAt: Date.now() + 3600000, used: false });
    return token;
  }

  async validateResetToken(token: string): Promise<User | undefined> {
    const record = this.resetTokens.get(token);
    if (record && !record.used && record.expiresAt > Date.now()) {
      return this.getUser(record.userId);
    }
    return undefined;
  }

  async markResetTokenAsUsed(token: string): Promise<void> {
    const record = this.resetTokens.get(token);
    if (record) record.used = true;
  }

  async createOTP(userId: number, email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpCodes.set(`${email}:${code}`, { userId, expiresAt: Date.now() + 600000, used: false });
    return code;
  }

  async validateOTP(email: string, otp: string): Promise<User | undefined> {
    const record = this.otpCodes.get(`${email}:${otp}`);
    if (record && !record.used && record.expiresAt > Date.now()) {
      return this.getUser(record.userId);
    }
    return undefined;
  }

  async markOTPAsUsed(email: string, otp: string): Promise<void> {
    const record = this.otpCodes.get(`${email}:${otp}`);
    if (record) record.used = true;
  }
}

export const storage = process.env.VITE_CONVEX_URL ? new ConvexStorage() : (db ? new DatabaseStorage() : new MemStorage());
