"use client";

import { createInvitation } from "@/components/features/invitations/api/invitation.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import type { CreateWorkspaceInvitationPayload } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invitationQueryKeys } from "./invitation.query-keys";

export const useCreateInvitation = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkspaceInvitationPayload) =>
      createInvitation(workspaceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: invitationQueryKeys.history(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.detail(workspaceId),
      });
    },
  });
};
