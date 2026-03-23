"use client";

import { LoginPayload, loginUser } from "../api/auth.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
};
