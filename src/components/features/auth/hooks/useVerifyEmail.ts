"use client";

import { useMutation } from "@tanstack/react-query";
import {
  ResendVerificationPayload,
  VerifyEmailPayload,
  resendVerificationCode,
  verifyEmailCode,
} from "../api/auth.api";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) => verifyEmailCode(payload),
  });
};

export const useResendVerificationCode = () => {
  return useMutation({
    mutationFn: (payload: ResendVerificationPayload) => resendVerificationCode(payload),
  });
};
