import { env } from "@/env";

export const buildApiUrl = (endpoint: string) => {
  const base = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};
