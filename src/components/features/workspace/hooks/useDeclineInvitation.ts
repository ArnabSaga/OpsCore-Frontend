"use client";

import { useMutation } from "@tanstack/react-query";
import { declineInvitation } from "@/components/features/workspace/api/workspace.api";

export const useDeclineInvitation = () => {
  return useMutation({
    mutationFn: (token: string) => declineInvitation(token),
  });
};
