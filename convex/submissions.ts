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
