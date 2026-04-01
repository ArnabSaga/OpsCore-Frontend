import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  // If the browser host is localhost, direct auth requests to the local backend
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000/api/auth";
  }

  // Use the configured API base URL, with a generic fallback to /api/auth
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    return "/api/auth";
  }

  return `${apiBaseUrl.replace(/\/+$/, "")}/api/auth`;
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
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");

  return "http://localhost:3000";
};

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${getAppUrl()}/dashboard`,
  });
};
