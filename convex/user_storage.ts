import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .unique();
  },
});

export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
    password: v.string(),
    role: v.string(),
    permissions: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      email: args.email.toLowerCase(),
    });
    return userId;
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    userData: v.any(), // Using any for partial updates
  },
  handler: async (ctx, args) => {
    const { id, userData } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("User not found");

    await ctx.db.patch(id, {
      ...userData,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(id);
  },
});

export const listUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
