"use client";

import { updateWorkspaceMember } from "@/components/features/workspace/api/workspace.api";
import type { UpdateWorkspaceMemberPayload } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useUpdateWorkspaceMember = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      payload,
    }: {
      memberId: string;
      payload: UpdateWorkspaceMemberPayload;
    }) => updateWorkspaceMember(workspaceId, memberId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.members(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.detail(workspaceId),
      });
    },
  });
};
