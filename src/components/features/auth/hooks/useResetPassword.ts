"use client";

import { useMutation } from "@tanstack/react-query";
import { ResetPasswordPayload, resetPassword } from "../api/auth.api";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  });
};
