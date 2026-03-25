"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/config/api-endpoints";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await apiFetch({
        endpoint: API_ENDPOINTS.auth.logout,
        method: "POST",
      });
    },
    onSuccess: async () => {
      await queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
    onError: async () => {
      await queryClient.clear();
      router.replace("/login");
      router.refresh();
    },
  });
};
