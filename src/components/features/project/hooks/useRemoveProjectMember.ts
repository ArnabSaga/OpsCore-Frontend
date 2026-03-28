"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/components/features/project/hooks/project.query-keys";
import { taskQueryKeys } from "@/components/features/task/hooks/task.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { removeProjectMember } from "../api/project.types";

type UseRemoveProjectMemberOptions = {
  workspaceId?: string | null;
};

export const useRemoveProjectMember = ({ workspaceId }: UseRemoveProjectMemberOptions = {}) => {
  const queryClient = useQueryClient();
  const { activeWorkspaceId } = useWorkspaceContext();

  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useMutation({
    mutationFn: ({ projectId, memberId }: { projectId: string; memberId: string }) =>
      removeProjectMember(resolvedWorkspaceId as string, projectId, memberId),
    onSuccess: async (_data, variables) => {
      if (!resolvedWorkspaceId) return;

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.members(resolvedWorkspaceId, variables.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(resolvedWorkspaceId, variables.projectId),
      });

      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.tasks(resolvedWorkspaceId, variables.projectId),
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      });
    },
    onError: (error: Error) => {
      console.error("Remove project member failed:", error.message);
    },
  });
};
