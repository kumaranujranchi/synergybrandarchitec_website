import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logAudit = mutation({
  args: {
    userId: v.optional(v.id("users")),
    action: v.string(),
    details: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("auditLogs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
