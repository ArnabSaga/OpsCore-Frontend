import { env } from "@/env";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  // Use relative path in the browser to automatically match the current origin
  if (typeof window !== "undefined") {
    return "/api/auth";
  }

  // Fallback for SSR: Normalize the app URL to remove any trailing slashes
  const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${appUrl.replace(/\/+$/, "")}/api/auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),

  fetchOptions: {
    credentials: "include",
  },

  plugins: [nextCookies()],
});

const getAppUrl = () => {
  // In the browser, always use the current window origin
  if (typeof window !== "undefined") return window.location.origin;

  // Fallback for SSR
  if (env.NEXT_PUBLIC_APP_URL) return env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");

  return "http://localhost:3000";
};

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${getAppUrl()}/dashboard`,
  });
};
