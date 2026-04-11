"use client";

import { cancelInvitation } from "@/components/features/invitations/api/invitation.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationQueryKeys } from "./invitation.query-keys";

export const useCancelInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => cancelInvitation(workspaceId, invitationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: invitationQueryKeys.history(workspaceId),
      });
    },
  });
};
