import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const getServerBaseUrl = () => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") || "http://localhost:3000";

  return `${appUrl}/api/auth`;
};

const getBaseUrl = () => {
  // Browser on localhost -> hit local backend directly
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000/api/auth";
  }

  // Browser in production -> use same-origin so cookies stay on frontend domain
  if (typeof window !== "undefined") {
    return "/api/auth";
  }

  // Server/build time -> must be absolute URL
  return getServerBaseUrl();
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    credentials: "include",
  },
  plugins: [nextCookies()],
});

const getAppUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");
  }

  return "http://localhost:3000";
};

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${getAppUrl()}/dashboard`,
  });
};
