import { pgTable, serial, text, varchar, timestamp, boolean, json, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles enum
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'user', 'customer']);

// Lead status enum
export const leadStatusEnum = pgEnum('lead_status', ['new', 'in_progress', 'pending', 'delivered', 'lost']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  role: userRoleEnum("role").notNull().default('customer'),
  permissions: json("permissions").$type<string[]>().default(['view']),
  isVerified: boolean("is_verified").default(false),
  verificationToken: varchar("verification_token", { length: 255 }),
  resetPasswordToken: varchar("reset_password_token", { length: 255 }),
  resetPasswordExpires: timestamp("reset_password_expires"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact form submissions
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  service: varchar("service", { length: 100 }).notNull(),
  message: text("message").notNull(),
  status: leadStatusEnum("status").notNull().default('new'),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Submission notes
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").references(() => submissions.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Audit logs for security
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: varchar("action", { length: 255 }).notNull(),
  details: json("details"),
  ipAddress: varchar("ip_address", { length: 50 }),
  userAgent: varchar("user_agent", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true, updatedAt: true });

export const updateUserSchema = createInsertSchema(users)
  .partial()
  .omit({ id: true, createdAt: true, updatedAt: true });

export const insertSubmissionSchema = createInsertSchema(submissions)
  .omit({ id: true, status: true, submittedAt: true, updatedAt: true });

export const updateSubmissionSchema = createInsertSchema(submissions)
  .pick({ status: true })
  .merge(z.object({
    id: z.number()
  }));

export const insertNoteSchema = createInsertSchema(notes)
  .omit({ id: true, createdAt: true, userId: true });

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type UpdateSubmission = z.infer<typeof updateSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;

export type AuditLog = typeof auditLogs.$inferSelect;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = Omit<z.infer<typeof registerSchema>, 'confirmPassword'>;