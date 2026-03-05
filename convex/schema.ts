import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    password: v.string(), // Note: In Convex, usually we use Auth like Clerk
    role: v.string(), // 'admin', 'manager', 'user', 'client'
    permissions: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  submissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    service: v.string(),
    message: v.string(),
    status: v.string(), // 'new', 'in_progress', 'pending', 'delivered', 'lost'
    submittedAt: v.number(),
    updatedAt: v.number(),
  }),

  notes: defineTable({
    submissionId: v.id("submissions"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }),

  auditLogs: defineTable({
    userId: v.optional(v.id("users")),
    action: v.string(),
    details: v.string(), // Stringified JSON or map
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    createdAt: v.number(),
  }),
});
