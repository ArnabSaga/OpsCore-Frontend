"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";
import type { User } from "@/components/features/auth/api/auth.api";

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["auth", "current-user"],
    queryFn: async () => {
      try {
        const response = await apiFetch("/api/v1/auth/me");

        // The API might return { success: true, data: { user: ... } }
        // or { success: true, data: ... } (where data is the user)
        // or just the user object itself depending on the endpoint implementation
        const user = response?.data?.user ?? response?.user ?? response?.data ?? response;

        if (user && typeof user === "object" && "id" in user && "email" in user) {
          return user as User;
        }

        return null;
      } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
