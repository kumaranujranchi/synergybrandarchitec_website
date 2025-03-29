import { pgTable, serial, text, varchar, timestamp, boolean, json, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User roles enum
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'user']);

// Lead status enum
export const leadStatusEnum = pgEnum('lead_status', ['new', 'in_progress', 'pending', 'delivered', 'lost']);

// Blog post status enum
export const postStatusEnum = pgEnum('post_status', ['draft', 'published', 'archived']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default('user'),
  permissions: json("permissions").$type<string[]>().default(['view']),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact form submissions
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }),
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

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: varchar("featured_image", { length: 255 }),
  authorId: integer("author_id").references(() => users.id).notNull(),
  status: postStatusEnum("status").notNull().default('draft'),
  tags: json("tags").$type<string[]>().default([]),
  category: varchar("category", { length: 100 }),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
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

export const insertBlogPostSchema = createInsertSchema(blogPosts)
  .omit({ id: true, slug: true, authorId: true, createdAt: true, updatedAt: true, publishedAt: true })
  .extend({
    slug: z.string().optional(),
  });

export const updateBlogPostSchema = createInsertSchema(blogPosts)
  .partial()
  .omit({ id: true, authorId: true, createdAt: true, updatedAt: true });

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  city: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10),
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

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type AuditLog = typeof auditLogs.$inferSelect;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginData = z.infer<typeof loginSchema>;