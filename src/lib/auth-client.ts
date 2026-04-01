import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const normalize = (url: string) => url.replace(/\/+$/, "");

const getBaseUrl = () => {
  // Browser: local development
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000/api/auth";
  }

  // Browser: production / deployed frontend
  if (typeof window !== "undefined") {
    return `${normalize(window.location.origin)}/api/auth`;
  }

  // Server / build time
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return `${normalize(appUrl)}/api/auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    credentials: "include",
  },
  plugins: [nextCookies()],
});

const getAppUrl = () => {
  if (typeof window !== "undefined") {
    return normalize(window.location.origin);
  }

  return normalize(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
};

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${getAppUrl()}/dashboard`,
  });
};
