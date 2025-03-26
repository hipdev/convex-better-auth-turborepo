import { query } from './_generated/server'
import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('chat').order('asc').take(50)
  }
})

export const sendMessage = mutation({
  args: {
    userId: v.id('user'),
    message: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('chat', {
      userId: args.userId,
      message: args.message,
      createdAt: Date.now()
    })
  }
})

export const deleteMessage = mutation({
  args: { messageId: v.id('chat') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId)
  }
})

// migrate anonymous chat messages know user
export const migrateAnonymousChat = mutation({
  args: {
    userId: v.id('user'),
    anonymousUserId: v.id('user')
  },
  handler: async (ctx, args) => {
    const chatMessages = await ctx.db
      .query('chat')
      .withIndex('by_userId', (q) => q.eq('userId', args.anonymousUserId))
      .collect()

    for (const message of chatMessages) {
      await ctx.db.patch(message._id, {
        userId: args.userId
      })
    }
  }
})
