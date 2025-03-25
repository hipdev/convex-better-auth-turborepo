import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://convex-better-auth.vercel.app/",
});
