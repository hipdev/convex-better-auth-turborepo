import { betterAuth } from 'better-auth'
import { convexAdapter } from '@better-auth-kit/convex'
import { ConvexClient } from 'convex/browser'
import { anonymous } from 'better-auth/plugins'
import { fetchMutation } from 'convex/nextjs'
import { api } from '@repo/backend/convex/_generated/api'
import { Id } from '@repo/backend/convex/_generated/dataModel'

const convexClient = new ConvexClient(process.env.CONVEX_URL!)

export const auth = betterAuth({
  database: convexAdapter(convexClient),
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        if (anonymousUser.user.id && newUser.user.id) {
          await fetchMutation(api.chat.migrateAnonymousChat, {
            userId: newUser.user.id as Id<'user'>,
            anonymousUserId: anonymousUser.user.id as Id<'user'>
          })
        }
      }
    })
  ],
  //... other options
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },

  trustedOrigins: ['http://localhost:3000', 'https://convex-better-auth.vercel.app/']
})
