import { betterAuth } from 'better-auth'
import { convexAdapter } from '@better-auth-kit/convex'
import { ConvexClient } from 'convex/browser'
import { anonymous } from 'better-auth/plugins'

const convexClient = new ConvexClient(process.env.CONVEX_URL!)

export const auth = betterAuth({
  database: convexAdapter(convexClient),
  plugins: [anonymous()],
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
