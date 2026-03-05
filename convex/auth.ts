import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mock implementation of bcrypt-like check for Convex
// In a real app, you'd use Clerk or another Auth provider
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user || user.password !== args.password) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
});

export const getCurrentUser = query({
    args: { userId: v.optional(v.id("users")) },
    handler: async (ctx, args) => {
        if (!args.userId) return null;
        return await ctx.db.get(args.userId);
    }
});
