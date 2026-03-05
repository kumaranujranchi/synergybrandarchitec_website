import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addNote = mutation({
  args: {
    submissionId: v.id("submissions"),
    userId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", {
      ...args,
      createdAt: Date.now(),
    });
    return await ctx.db.get(noteId);
  },
});

export const getSubmissionNotes = query({
  args: { submissionId: v.id("submissions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("submissionId"), args.submissionId))
      .order("desc")
      .collect();
  },
});
