import { anonymousClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  plugins: [anonymousClient()],

  /** the base url of the server (optional if you're using the same domain) */
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://convex-better-auth.vercel.app/'
})
