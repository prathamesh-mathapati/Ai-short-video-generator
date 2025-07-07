import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        pictureURL: v.optional(v.string()),
        credits: v.number()
    }),
    videoData: defineTable({
        title: v.string(),
        caption: v.any(),
        topic: v.string(),
        videoStyle: v.string(),
        voice: v.string(),
        script: v.string(),
        captionsJson:  v.optional(v.any()),
        uid: v.id("users"),
        createdBy: v.string(),
        images: v.optional(v.any()),
        audioUrl: v.optional(v.string()),
        status:v.optional(v.string())
    })
})