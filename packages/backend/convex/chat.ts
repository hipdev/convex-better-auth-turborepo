import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

import { internal } from './_generated/api'

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('chat').order('asc').take(50)
  }
})

export const sendMessage = mutation({
  args: {
    userId: v.id('user'),
    name: v.optional(v.string()),
    message: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('chat', {
      userId: args.userId,
      name: args.name || 'Anonymous',
      message: args.message,
      createdAt: Date.now()
    })
  }
})

export const deleteMessage = mutation({
  args: { messageId: v.id('chat'), sessionToken: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.runQuery(internal.betterAuth.getSession, {
      sessionToken: args.sessionToken
    })
    console.log(session)

    if (!session) {
      throw new Error('Unauthorized')
    }

    const message = await ctx.db.get(args.messageId)
    if (!message) {
      throw new Error('Message not found')
    }

    await ctx.db.delete(args.messageId)
  }
})

// migrate anonymous chat messages know user
export const migrateAnonymousChat = mutation({
  args: {
    userId: v.id('user'),
    anonymousUserId: v.id('user'),
    name: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const chatMessages = await ctx.db
      .query('chat')
      .withIndex('by_userId', (q) => q.eq('userId', args.anonymousUserId))
      .collect()

    for (const message of chatMessages) {
      await ctx.db.patch(message._id, {
        userId: args.userId,
        name: args.name || 'Anonymous'
      })
    }
  }
})
