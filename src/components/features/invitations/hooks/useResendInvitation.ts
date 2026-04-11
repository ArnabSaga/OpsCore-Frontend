"use client";

import { resendInvitation } from "@/components/features/invitations/api/invitation.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationQueryKeys } from "./invitation.query-keys";

export const useResendInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => resendInvitation(workspaceId, invitationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: invitationQueryKeys.history(workspaceId),
      });
    },
  });
};
