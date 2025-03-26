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
