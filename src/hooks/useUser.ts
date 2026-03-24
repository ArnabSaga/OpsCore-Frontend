"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";
import type { User } from "@/components/features/auth/api/auth.api";

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["auth", "current-user"],
    queryFn: async () => {
      const data = await apiFetch("/api/v1/auth/me");

      return data?.data?.user ?? data?.user ?? data?.data ?? null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
