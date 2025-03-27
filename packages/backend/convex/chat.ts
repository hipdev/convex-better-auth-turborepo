import { query } from './_generated/server'
import { mutation } from './_generated/server'
import { v } from 'convex/values'

import { jwtVerify, createLocalJWKSet } from 'jose'

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
  args: { messageId: v.id('chat'), jwt: v.string() },
  handler: async (ctx, args) => {
    const session = await validateToken(args.jwt)
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

async function validateToken(token: string) {
  try {
    /**
     * This is the JWKS that you get from the /api/auth/
     * jwks endpoint
     */
    const storedJWKS = {
      keys: [
        {
          //...
        }
      ]
    }
    const JWKS = createLocalJWKSet({
      keys: storedJWKS?.data.keys!
    })
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'http://localhost:3000', // Should match your JWT issuer which is the BASE_URL
      audience: 'http://localhost:3000' // Should match your JWT audience which is the BASE_URL by default
    })
    return payload
  } catch (error) {
    console.error('Token validation failed:', error)
    throw error
  }
}
