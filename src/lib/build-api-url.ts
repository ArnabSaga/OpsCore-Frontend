import { env } from "@/env";

export const buildApiUrl = (endpoint: string) => {
  const isBrowser = typeof window !== "undefined";
  
  // Use relative URLs in the browser to leverage Next.js rewrites/proxies.
  // In SSR, use the absolute backend URL.
  const base = isBrowser 
    ? "" 
    : (env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

  // Ensure path starts with a single leading slash
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  return `${base}${path}`;
};
