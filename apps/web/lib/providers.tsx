'use client'

import { ConvexProvider, ConvexReactClient } from 'convex/react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
