"use client";

import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordPayload, forgotPassword } from '../api/auth.api';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
};
