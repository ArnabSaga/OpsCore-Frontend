"use client";

import { createWorkspaceInvitation } from "@/components/features/workspace/api/workspace.api";
import type { CreateWorkspaceInvitationPayload } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useCreateWorkspaceInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkspaceInvitationPayload) =>
      createWorkspaceInvitation(workspaceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.invitations(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.detail(workspaceId),
      });
    },
  });
};
