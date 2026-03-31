import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // better-auth proxy
  async rewrites() {
    return [
      {
        // Explicitly route /api/auth/* to the backend
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/:path*`,
      },
      {
        // Route all other API requests to the backend
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
