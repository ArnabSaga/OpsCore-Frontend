export const buildApiUrl = (endpoint: string) => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  if (typeof window !== "undefined") {
    return path;
  }

  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
  return `${base}${path}`;
};
