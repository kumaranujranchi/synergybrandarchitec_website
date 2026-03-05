import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createResetToken = mutation({
  args: {
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("passwordResetTokens", {
      ...args,
      used: false,
      createdAt: Date.now(),
    });
  },
});

export const validateResetToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .filter((q) => q.and(
        q.eq(q.field("used"), false),
        q.gt(q.field("expiresAt"), Date.now())
      ))
      .unique();
  },
});

export const markTokenUsed = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (record) {
      await ctx.db.patch(record._id, { used: true });
    }
  },
});

export const createOTP = mutation({
  args: {
    userId: v.id("users"),
    email: v.string(),
    code: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("otpCodes", {
      ...args,
      used: false,
      createdAt: Date.now(),
    });
  },
});

export const validateOTP = query({
  args: { email: v.string(), code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("otpCodes")
      .withIndex("by_email_code", (q) => q.eq("email", args.email.toLowerCase()).eq("code", args.code))
      .filter((q) => q.and(
        q.eq(q.field("used"), false),
        q.gt(q.field("expiresAt"), Date.now())
      ))
      .unique();
  },
});

export const markOTPUsed = mutation({
  args: { email: v.string(), code: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("otpCodes")
      .withIndex("by_email_code", (q) => q.eq("email", args.email.toLowerCase()).eq("code", args.code))
      .unique();
    if (record) {
      await ctx.db.patch(record._id, { used: true });
    }
  },
});
