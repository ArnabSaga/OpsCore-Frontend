"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangePasswordPayload, changePassword } from "../api/auth.api";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
  });
};
