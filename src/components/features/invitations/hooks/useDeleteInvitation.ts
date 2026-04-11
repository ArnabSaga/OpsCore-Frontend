"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvitation } from "@/components/features/invitations/api/invitation.api";
import { invitationQueryKeys } from "./invitation.query-keys";

export const useDeleteInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => deleteInvitation(workspaceId, invitationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: invitationQueryKeys.history(workspaceId),
      });
    },
  });
};
