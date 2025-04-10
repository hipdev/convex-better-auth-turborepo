import { betterAuth } from 'better-auth'
import { convexAdapter } from '@better-auth-kit/convex'
import { ConvexHttpClient } from 'convex/browser'
import { anonymous, jwt } from 'better-auth/plugins'
import { fetchMutation } from 'convex/nextjs'
import { api } from './convex/_generated/api'
import { Id } from './convex/_generated/dataModel'

const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const auth = betterAuth({
  database: convexAdapter(convexClient),
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        if (anonymousUser.user.id && newUser.user.id) {
          await fetchMutation(api.chat.migrateAnonymousChat, {
            userId: newUser.user.id as Id<'user'>,
            anonymousUserId: anonymousUser.user.id as Id<'user'>,
            name: newUser.user?.name
          })
        }
      }
    }),
    jwt()
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

  trustedOrigins: ['http://localhost:3000', 'https://convex-betterauth-turborepo.vercel.app/']
})
