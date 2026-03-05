import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendSubmission = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    service: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      status: "new",
      submittedAt: Date.now(),
      updatedAt: Date.now(),
    });
    return submissionId;
  },
});

export const getSubmissions = query({
  handler: async (ctx) => {
    return await ctx.db.query("submissions").order("desc").collect();
  },
});

export const getSubmission = query({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateSubmission = mutation({
  args: {
    id: v.id("submissions"),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const { id, data } = args;
    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
    return await ctx.db.get(id);
  },
});

export const deleteSubmission = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    // Note: Manual deletion of notes might be needed if not handled by triggers
    await ctx.db.delete(args.id);
    return true;
  },
});
