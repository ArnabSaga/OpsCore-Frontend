"use client";

import { API_ENDPOINTS } from "@/config/api-endpoints";
import httpStatus from "http-status";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";
import type { User } from "@/components/features/auth/api/auth.api";

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["auth", "current-user"],
    queryFn: async () => {
      try {
        const response = await apiFetch<{
          data?: { user?: User; [key: string]: unknown };
          user?: User;
          [key: string]: unknown;
        }>({
          endpoint: API_ENDPOINTS.auth.me,
        });

        const user = response?.data?.user ?? response?.user ?? response?.data ?? response;

        if (user && typeof user === "object" && "id" in user && "email" in user) {
          return user as User;
        }

        return null;
      } catch (error: unknown) {
        const apiError = error as { status?: number; message?: string };
        // Handle unauthorized or session errors silently as they are expected when logged out
        const isUnauthorized =
          apiError?.status === httpStatus.UNAUTHORIZED ||
          apiError?.message?.toLowerCase().includes("failed to get session") ||
          apiError?.message?.toLowerCase().includes("unauthorized");

        if (!isUnauthorized) {
          console.error("Error fetching current user:", apiError);
        }

        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
