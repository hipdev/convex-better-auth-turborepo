import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  chat: defineTable({
    userId: v.id('user'),
    message: v.string(),
    createdAt: v.number(),
    name: v.optional(v.string())
  })
    .index('by_createdAt', ['createdAt'])
    .index('by_userId', ['userId']),

  user: defineTable({
    name: v.string(),
    email: v.string(),
    emailVerified: v.boolean(),
    updatedAt: v.string(),
    isAnonymous: v.optional(v.boolean()),
    image: v.optional(v.string())
  }).index('by_email', ['email'])
})
