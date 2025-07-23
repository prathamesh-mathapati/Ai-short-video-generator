import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    pictureURL: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user exists by email
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0]?.email) {
      const userData = {
        name: args.name,
        email: args.email,
        pictureURL: args.pictureURL,
        credits: 3, // internal default credits
      };
      await ctx.db.insert("users", userData);
      return userData;
    }

    // User already exists, return existing user data
    return user[0];
  },
});

export const GetUpdateCreated=mutation({
  args:{uid:v.id("user"),credits:v.number()},
  handler:async(ctx,args)=>{
    const result=await ctx.db.patch(args.uid,{
      credits:args?.credits
    })
    return result
  }
})