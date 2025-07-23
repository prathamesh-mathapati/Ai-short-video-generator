import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    caption: v.any(),
    topic: v.string(),
    videoStyle: v.string(),
    voice: v.string(),
    script: v.string(),
    captionsJson: v.optional(v.any()),
    uid: v.id("users"),
    createdBy: v.string(),
    images: v.optional(v.any()),
    audioUrl: v.optional(v.string()),
    credits: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      caption: args.caption,
      topic: args.topic,
      videoStyle: args.videoStyle,
      voice: args.voice,
      script: args.script,
      captionsJson: args.captionsJson,
      uid: args.uid,
      createdBy: args.createdBy,
      images: args.images,
      audioUrl: args.audioUrl,
      status: "P",
    });

    await ctx.db.patch(args.uid, {
      credits: args.credits - 1,
    });

    return result;
  },
});
export const UpdateVideoRecord = mutation({
  args: {
    recordId: v.id("videoData"),
    audioUrl: v.string(),
    images: v.any(),
    captionsJson: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.recordId, {
      audioUrl: args.audioUrl,
      images: args.images,
      captionsJson: args.captionsJson,
      status: "C",
    });
    return result;
  },
});

export const GetVideoData = query({
  args: {
    uid: v.id("users"),
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.query("videoData").filter(q=>q.eq(q.field("uid"),args.uid)).order("desc").collect()
    return result
  }
});

export const GetVideoByID= query({
  args:{
    videoId:v.id("videoData")
  },
  handler: async (ctx,args) => {
    const result= await ctx.db.get(args?.videoId)
    return result
  }
})