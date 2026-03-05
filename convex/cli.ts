import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createAdmin = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password,
      phone: args.phone ?? null,
      website: args.website ?? null,
      role: "admin",
      permissions: ["view", "edit", "admin"],
      createdAt: now,
      updatedAt: now,
    });
    return userId;
  },
});
