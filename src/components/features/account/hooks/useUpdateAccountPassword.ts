"use client";

import { useMutation } from "@tanstack/react-query";

import { updateMyPassword } from "@/components/features/account/api/account.api";
import type { UpdateAccountPasswordPayload } from "@/components/features/account/types/account.types";

export const useUpdateAccountPassword = () => {
  return useMutation({
    mutationFn: async (payload: UpdateAccountPasswordPayload) => {
      const response = await updateMyPassword(payload);
      return response;
    },
  });
};
