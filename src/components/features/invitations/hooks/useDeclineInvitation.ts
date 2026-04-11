"use client";

import { useMutation } from "@tanstack/react-query";
import { declineInvitation } from "../api/invitation.api";

export const useDeclineInvitation = () => {
  return useMutation({
    mutationFn: (token: string) => declineInvitation(token),
  });
};
