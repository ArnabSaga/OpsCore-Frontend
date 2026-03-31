import { env } from "@/env";

export const buildApiUrl = (endpoint: string) => {
  const isBrowser = typeof window !== "undefined";

  const base = isBrowser ? "" : (env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${base}${path}`;
};
