# Next.js + Convex + BetterAuth Demo

This demo showcases a modern authentication implementation using Next.js and Convex with BetterAuth, demonstrating how to build a real-time chat application with robust authentication features.

## Key Features

- **Seamless Authentication Flow**: Supports Google OAuth, email/password, and anonymous login with automatic account linking
- **Real-time Updates**: Message list caching and instant updates using Convex with TanStack Query
- **Optimistic UI**: Implements optimistic mutations for message deletion and other actions
- **Secure Authorization**: Cookie-based auth handling via Next.js middleware
- **Modern Stack**: Built with Next.js, Convex, and BetterAuth for a production-ready foundation

## About This Demo

This project demonstrates how complex features become straightforward to implement when using BetterAuth and Convex together. The authentication system includes anonymous users that can later be converted to registered accounts, real-time message synchronization, and proper authorization handling - all while maintaining excellent performance through Next.js's static site generation capabilities.

Thanks to Convex and BetterAuth, you get:

- Automatic caching and reactivity
- Robust login/signup system with Google OAuth
- Secure session management
- Real-time data synchronization

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Next.js
- **Backend**: Convex
- **Authentication**: BetterAuth
- **Data Fetching**: TanStack Query and Convex
