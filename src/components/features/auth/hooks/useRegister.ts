"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload } from "@/components/features/auth/api/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
};
