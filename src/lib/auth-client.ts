import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`
    : "/api/auth",

  fetchOptions: {
    credentials: "include",
  },

  plugins: [nextCookies()],
});

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });
};
