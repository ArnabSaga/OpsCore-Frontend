import { env } from '@/env';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // better-auth proxy
  async rewrites() {
    const backendUrl = env.NEXT_PUBLIC_API_BASE_URL;
    if (!backendUrl) return [];

    return [
      {
        // Explicitly route /api/auth/* to the backend
        source: "/api/auth/:path*",
        destination: `${backendUrl}/api/auth/:path*`,
      },
      {
        // Route all other API requests to the backend
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
