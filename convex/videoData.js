import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateVideoData = mutation({
    args: {
        title: v.string(),
        caption: v.any(),
        topic: v.string(),
        videoStyle: v.string(),
        voice: v.string(),
        script: v.string(),
        captionsJson:  v.optional(v.string()),
        uid: v.id("users"),
        createdBy: v.string(),
        images:v.optional(v.string()),
        audioUrl:v.optional(v.string()),
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
        })
    }
});
