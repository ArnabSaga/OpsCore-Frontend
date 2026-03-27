"use client";

import { cancelWorkspaceInvitation } from "@/components/features/workspace/api/workspace.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCancelWorkspaceInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => cancelWorkspaceInvitation(workspaceId, invitationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspace-invitations", workspaceId] });
      await queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });
    },
  });
};
