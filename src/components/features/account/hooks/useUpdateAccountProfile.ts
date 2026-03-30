"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMyProfile } from "@/components/features/account/api/account.api";
import { accountQueryKeys } from "@/components/features/account/hooks/account.query-keys";
import type { UpdateAccountProfilePayload } from "@/components/features/account/types/account.types";

const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

export const useUpdateAccountProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateAccountProfilePayload) => {
      const response = await updateMyProfile(payload);
      return response.data;
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: accountQueryKeys.profile() }),
        queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY }),
      ]);
    },
  });
};
